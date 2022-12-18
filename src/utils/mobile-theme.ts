/* eslint-disable @typescript-eslint/no-unused-vars */
export const LIGHT_MODE_META_TAG = 'light-mode-meta-tag';
export const DARK_MODE_META_TAG = 'dark-mode-meta-tag';
export const LIGHT_MODE_THEME_COLOR = '#F8FAFC';
export const LIGHT_MODE_SCREENSHOT_THEME_COLOR = 'white';
export const DARK_MODE_THEME_COLOR = '#171717';
export const DARK_MODE_SCREENSHOT_THEME_COLOR = 'black';

export const getThemeMetaTags = () => {
  const darkModeThemeMetaTag = document.getElementById(DARK_MODE_META_TAG);
  const lightModeThemeMetaTag = document.getElementById(LIGHT_MODE_META_TAG);

  if (darkModeThemeMetaTag === null) {
    throw new Error('dark mode meta tag not found');
  }
  if (lightModeThemeMetaTag === null) {
    // throw new Error('light mode meta tag not found');
  }

  return { darkModeThemeMetaTag, lightModeThemeMetaTag };
};

export const startScreenshotMode = () => {
  const { darkModeThemeMetaTag, lightModeThemeMetaTag } = getThemeMetaTags();

  darkModeThemeMetaTag.setAttribute(
    'content',
    DARK_MODE_SCREENSHOT_THEME_COLOR
  );
  // lightModeThemeMetaTag.setAttribute('content', LIGHT_MODE_SCREENSHOT_THEME_COLOR);
};

export const endScreenshotMode = () => {
  const { darkModeThemeMetaTag, lightModeThemeMetaTag } = getThemeMetaTags();

  darkModeThemeMetaTag.setAttribute('content', DARK_MODE_THEME_COLOR);
  // lightModeThemeMetaTag.setAttribute('content', LIGHT_MODE_THEME_COLOR);
};
