/* eslint-disable @typescript-eslint/no-explicit-any */
import toHex from 'colornames';
import colorNameToHex from '@uiw/react-color-name';
import convert from 'color-convert';

/**
 * Converts a product color name into a hex code.
 * - Supports standard and extended color names
 * - Uses multiple fallbacks
 * - Returns a default color if unknown
 */
const customColorMap: Record<string, string> = {
  'bright light yellow': '#FFFACD',
  'bright light orange': '#F8BB3D',
  'medium azure': '#63C5DA',
  'sand green': '#A0BBAE',
  'dark bluish gray': '#6D6E71',
  'light bluish gray': '#A7A9AC',
};

export const getColorHex = (name: string, fallback: string = '#CCCCCC'): string => {
  if (!name) return fallback;

  const normalized = name.trim().toLowerCase();

  return (
    customColorMap[normalized] ||
    toHex(normalized) ||
    colorNameToHex(normalized as any) ||
    (() => {
      try {
        const hex = convert.keyword.hex(normalized.replace(/\s+/g, ''));
        return hex ? `#${hex}` : undefined;
      } catch {
        return undefined;
      }
    })() ||
    fallback
  );
};
