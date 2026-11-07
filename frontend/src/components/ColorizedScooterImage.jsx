/**
 * ColorizedScooterImage — Canvas-based real-time scooter body recoloring
 *
 * Works like SVG fill change: detects the scooter body pixels by hue range
 * and replaces only those pixels' hue with the target color, preserving
 * all shadows, highlights, and textures. The rider, clothes, and background
 * are completely untouched.
 */
import { useEffect, useRef, useCallback } from 'react';

// ── Colour helpers ──────────────────────────────────────────────────────────

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l * 100];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  switch (max) {
    case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
    case g: h = ((b - r) / d + 2) / 6; break;
    case b: h = ((r - g) / d + 4) / 6; break;
    default: h = 0;
  }
  return [h * 360, s * 100, l * 100];
}

function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ];
}

function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return rgbToHsl(r, g, b);
}

function hueDiff(a, b) {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

function clamp(v, lo = 0, hi = 255) {
  return Math.min(hi, Math.max(lo, v));
}

// ── Main component ───────────────────────────────────────────────────────────

/**
 * @param {string}  src            - Image URL (same-origin)
 * @param {string}  baseColorHex   - Dominant body colour of the base image (e.g. "#047857")
 * @param {string}  targetColorHex - Colour the user selected (e.g. "#dc2626")
 * @param {string}  alt
 * @param {string}  className
 * @param {object}  style
 */
export default function ColorizedScooterImage({
  src,
  baseColorHex,
  targetColorHex,
  alt = '',
  className = '',
  style = {},
}) {
  const canvasRef  = useRef(null);
  const nativeImgRef = useRef(null); // stores the original pixel data
  const srcRef = useRef(null);

  // ── Draw colorized pixels onto canvas ────────────────────────────────────
  const paint = useCallback((imageData, ctx, canvasWidth, canvasHeight) => {
    const [baseH, , baseL]   = hexToHsl(baseColorHex);
    const [targetH, targetS, targetL] = hexToHsl(targetColorHex);

    const isBaseBlack  = baseL < 25;   // e.g. Sports — base body is very dark
    const isTargetBlack = targetH < 1 && targetS < 5; // black target
    const isTargetGrey  = targetS < 15 && !isTargetBlack;  // grey target

    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const [pixH, pixS, pixL] = rgbToHsl(r, g, b);

      let matched = false;

      if (isBaseBlack) {
        // Black scooter: match dark, low-saturation body panels
        // Avoid matching pure black (0,0,0) which could be text/outlines
        matched = pixL < 38 && pixS < 30 && pixL > 2;
      } else {
        // Coloured scooter: match pixels whose hue is close to base colour hue
        // and have enough saturation to be a painted surface (not grey/white)
        matched = pixS > 18 && hueDiff(pixH, baseH) < 55;
      }

      if (!matched) continue;

      let newR, newG, newB;

      if (isTargetBlack) {
        // → Black: very dark version preserving slight texture
        newR = clamp(Math.round(r * 0.12));
        newG = clamp(Math.round(g * 0.12));
        newB = clamp(Math.round(b * 0.12));
      } else if (isTargetGrey) {
        // → Grey: desaturate to luminance-based grey then scale brightness
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        const grey = clamp(Math.round(lum * 0.68));
        newR = grey + 2; newG = grey + 2; newB = grey + 5; // slight cool tint
      } else if (isBaseBlack) {
        // Black base → coloured target: tint dark pixels with target colour
        // Use pixel lightness as shading factor
        const shadeFactor = pixL / 38; // 0..1
        const [tr, tg, tb] = hslToRgb(targetH, Math.max(targetS, 65), clamp(targetL * shadeFactor * 1.5, 0, 90));
        newR = clamp(tr); newG = clamp(tg); newB = clamp(tb);
      } else {
        // Coloured base → different colour: replace hue, keep saturation & lightness
        const keepS = Math.max(pixS, targetS * 0.75);
        const [tr, tg, tb] = hslToRgb(targetH, keepS, pixL);
        newR = clamp(tr); newG = clamp(tg); newB = clamp(tb);
      }

      data[i] = newR;
      data[i + 1] = newG;
      data[i + 2] = newB;
      // Alpha unchanged
    }

    ctx.putImageData(imageData, 0, 0);
  }, [baseColorHex, targetColorHex]);

  // ── Load image, cache original ImageData, then paint ────────────────────
  const loadAndPaint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.onload = () => {
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);

      // Cache original pixel data so re-colorisations start from clean state
      nativeImgRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Apply colour if it differs from base
      if (targetColorHex && targetColorHex !== baseColorHex) {
        const copy = new ImageData(
          new Uint8ClampedArray(nativeImgRef.current.data),
          canvas.width,
          canvas.height
        );
        paint(copy, ctx, canvas.width, canvas.height);
      }
    };
    img.src = src;
    srcRef.current = src;
  }, [src, baseColorHex, targetColorHex, paint]);

  // Re-paint when only targetColor changes (image already loaded)
  const repaint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !nativeImgRef.current) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (!targetColorHex || targetColorHex === baseColorHex) {
      // Restore original
      ctx.putImageData(nativeImgRef.current, 0, 0);
      return;
    }

    const copy = new ImageData(
      new Uint8ClampedArray(nativeImgRef.current.data),
      canvas.width,
      canvas.height
    );
    paint(copy, ctx, canvas.width, canvas.height);
  }, [baseColorHex, targetColorHex, paint]);

  // Load fresh when src changes
  useEffect(() => {
    nativeImgRef.current = null;
    loadAndPaint();
  }, [src]); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-paint when colour changes (src already loaded)
  useEffect(() => {
    if (nativeImgRef.current) {
      repaint();
    } else {
      loadAndPaint();
    }
  }, [targetColorHex]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={canvasRef}
      aria-label={alt}
      className={className}
      style={{ display: 'block', ...style }}
    />
  );
}
