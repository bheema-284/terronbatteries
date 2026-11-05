import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';
import { Network } from '@capacitor/network';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const isNativePlatform = () => Capacitor.isNativePlatform();
export const getPlatform = () => Capacitor.getPlatform(); // 'android', 'ios', or 'web'

// Get device information (model, OS, battery info if available)
export async function getNativeDeviceInfo() {
  try {
    const info = await Device.getInfo();
    let battery = null;
    try {
      battery = await Device.getBatteryInfo();
    } catch {
      // Battery info not supported on some web browsers
    }
    return {
      platform: getPlatform(),
      isNative: isNativePlatform(),
      model: info.model || 'Browser / Desktop',
      operatingSystem: info.operatingSystem || (navigator.userAgent.includes('Win') ? 'Windows' : 'Web'),
      osVersion: info.osVersion || '',
      manufacturer: info.manufacturer || 'General Device',
      batteryLevel: battery?.batteryLevel != null ? Math.round(battery.batteryLevel * 100) : null,
      isCharging: battery?.isCharging ?? null
    };
  } catch (error) {
    console.warn('Capacitor Device.getInfo error:', error);
    return {
      platform: 'web',
      isNative: false,
      model: navigator.userAgent.includes('Mobile') ? 'Mobile Web' : 'Desktop Browser',
      operatingSystem: 'Web',
      osVersion: '',
      manufacturer: 'Web Client',
      batteryLevel: null,
      isCharging: null
    };
  }
}

// Get network status
export async function getNetworkStatus() {
  try {
    const status = await Network.getStatus();
    return {
      connected: status.connected,
      connectionType: status.connectionType
    };
  } catch (err) {
    console.warn('Capacitor Network.getStatus fallback:', err);
    return {
      connected: navigator.onLine,
      connectionType: 'unknown'
    };
  }
}

// Trigger haptic vibration feedback
export async function triggerHaptic(style = ImpactStyle.Light) {
  try {
    if (isNativePlatform()) {
      await Haptics.impact({ style });
    } else if (navigator.vibrate) {
      navigator.vibrate(40);
    }
  } catch (err) {
    console.debug('Haptics not available:', err);
  }
}

// Configure Mobile Status Bar
export async function setupStatusBar() {
  if (isNativePlatform()) {
    try {
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: '#022c22' });
    } catch (e) {
      console.warn('StatusBar configuration not supported on current platform', e);
    }
  }
}

