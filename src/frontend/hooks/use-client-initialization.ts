import { useEffect } from 'react';
import {
  prefersDark,
  DARK_MODE_THEME_COLOR,
  LIGHT_MODE_THEME_COLOR,
  setThemeColorMetaTag,
} from '../../server/utils/mobile-theme';

function initializeClient() {
  if (prefersDark()) {
    setThemeColorMetaTag(DARK_MODE_THEME_COLOR);
  }

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      const colorToSwitchTo = e.matches
        ? DARK_MODE_THEME_COLOR
        : LIGHT_MODE_THEME_COLOR;

      setThemeColorMetaTag(colorToSwitchTo);
    });
}

export function useClientInitialization() {
  useEffect(() => {
    initializeClient();
  }, []);
}
