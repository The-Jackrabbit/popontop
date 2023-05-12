/* eslint-disable @typescript-eslint/no-unused-vars */
export const THEME_COLOR_META_TAG = 'light-mode-meta-tag';
export const DARK_MODE_META_TAG = 'dark-mode-meta-tag';
export const LIGHT_MODE_THEME_COLOR = '#F8FAFC';
export const LIGHT_MODE_SCREENSHOT_THEME_COLOR = 'white';
export const DARK_MODE_THEME_COLOR = '#171717';
export const DARK_MODE_SCREENSHOT_THEME_COLOR = 'black';

export const prefersDark = () => {
  const prefersDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  return prefersDark;
};

export const getThemeColorMetaTag = () => {
  const themeColorMetaTag = document.getElementById(THEME_COLOR_META_TAG);

  if (themeColorMetaTag === null) {
    throw new Error('theme color meta tag not found');
  }

  return { themeColorMetaTag };
};

export const setThemeColorMetaTag = (color: string) => {
  const { themeColorMetaTag } = getThemeColorMetaTag();

  themeColorMetaTag.setAttribute('content', color);
};

export const startScreenshotMode = (backgroundColor: string) => {
  setThemeColorMetaTag(backgroundColor);
  // const { darkModeThemeMetaTag, themeColorMetaTag } = getThemeColorMetaTag();
  // darkModeThemeMetaTag.setAttribute(
  //   'content',
  //   DARK_MODE_SCREENSHOT_THEME_COLOR
  // );
  // themeColorMetaTag.setAttribute('content', LIGHT_MODE_SCREENSHOT_THEME_COLOR);
};

export const resetThemeColorMetaTag = () => {
  if (prefersDark()) {
    setThemeColorMetaTag(DARK_MODE_THEME_COLOR);
  } else {
    setThemeColorMetaTag(LIGHT_MODE_THEME_COLOR);
  }
  // const { darkModeThemeMetaTag, themeColorMetaTag } = getThemeColorMetaTag();
  // darkModeThemeMetaTag.setAttribute('content', DARK_MODE_THEME_COLOR);
  // themeColorMetaTag.setAttribute('content', LIGHT_MODE_THEME_COLOR);
};
