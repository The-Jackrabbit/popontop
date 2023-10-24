import { Chart } from '@prisma/client';
import { WritableChartSettings } from '../../types/Charts';
import escapeHtml from 'escape-html';
import { Album } from '../../types/Albums';

export const lastFmImageOrigin = 'https://lastfm.freetls.fastly.net/i/u/174s/';

export const formatUrl = (url: string) => {
  if (url.length < 43) {
    return '';
  }

  if (url.substring(0, 43) !== lastFmImageOrigin) {
    return '';
  }

  return url;
};

export const formatColor = (url: string) => {
  if (url.length > 16) {
    return '';
  }

  if (url.substring(0, 1) === '#' && url.length > 7) {
    return '';
  }

  return url;
};

export const buildSettingsForChart = (settings: WritableChartSettings) => {
  return {
    background_color: sanitizeColorInput(settings.background_color),
    border_color: sanitizeColorInput(settings.border_color),
    border_size: sanitizeToNumber(settings.border_size),
    number_of_albums: sanitizeToNumber(settings.number_of_albums),
    show_albums: sanitizeToBoolean(settings.show_albums),
    show_title: sanitizeToBoolean(settings.show_title),
    text_color: sanitizeColorInput(settings.text_color),
    title_background_color: sanitizeColorInput(settings.title_background_color),
  };
};

export const buildDataForChart = (
  chart: Chart,
  settings: WritableChartSettings
) => {
  return {
    ...buildSettingsForChart(settings),
    chart_id: chart.uuid,
  };
};

export const buildDataForAlbums = (albums: Album[], chartUuid?: string) => {
  return albums.map((album: Album) => ({
    name: sanitizeToString(album.name),
    artist: sanitizeToString(album.artist),
    album_art_url: formatUrl(album.imageUrl),
    chart_id: sanitizeToString(chartUuid),
  }));
};

const sanitizeColorInput = (input: string | null) => {
  if (input === null) {
    return '';
  }

  const colorNames = ['red', 'green']; // Complete this array with all standard CSS color names
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i;
  const rgbColorRegex = /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/;
  const rgbaColorRegex =
    /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0(\.\d+)?|1(\.0+)?)\s*\)$/;

  if (
    colorNames.includes(input) ||
    hexColorRegex.test(input) ||
    rgbColorRegex.test(input) ||
    rgbaColorRegex.test(input)
  ) {
    return escapeHtml(input);
  }

  return ''; // Default color if input is invalid
};

function sanitizeToBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    // Common string representations of true/false
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
  }

  if (typeof value === 'number') {
    // Common number representations of true/false
    if (value === 1) return true;
    if (value === 0) return false;
  }

  // If the value doesn't match any known patterns, return a default value.
  // Depending on your use case, you might want to throw an error instead.
  return false;
}

function sanitizeToNumber(value: unknown): number {
  const numberValue = Number(value);

  if (!isNaN(numberValue)) {
    return numberValue;
  }

  // If the value doesn't match any known patterns, return a default value.
  // Depending on your use case, you might want to throw an error instead.
  return 0;
}

export function sanitizeToString(value: any): string {
  if (typeof value === 'string') {
    return escapeHtml(value);
  }

  // If the value is not already a string, attempt to convert it
  if (value !== null && value !== undefined) {
    return escapeHtml(String(value));
  }

  // If the value is null or undefined, return a default string.
  // Depending on your use case, you might want to return a different default string or throw an error.
  return '';
}
