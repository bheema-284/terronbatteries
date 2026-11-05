// Mobile utilities using standard Web Mobile APIs (no Capacitor dependency)

export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
};

// Tactile feedback for mobile touch events
export const triggerHaptic = (duration = 35) => {
  try {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(duration);
    }
  } catch (err) {
    // Ignore if not supported
  }
};

// Web Share API for mobile devices
export const shareScooter = async (title, text, url = window.location.href) => {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return true;
    } catch {
      return false;
    }
  }
  return false;
};

