/* eslint-disable @typescript-eslint/no-explicit-any */
import toHex from 'colornames';
import colorNameToHex from '@uiw/react-color-name';
import convert from 'color-convert';

/**
 * Converts a product color name into a hex code.
 * - Uses the last word (e.g., "Bright Pink" → "pink")
 * - Supports custom mappings
 * - Falls back to external libs
 * - Returns a default color if unknown
 */
const customColorMap: Record<string, string> = {
  pink: '#FFC0CB',
  black: '#000000',
  white: '#FFFFFF',
  yellow: '#FFFACD',
  orange: '#F8BB3D',
  azure: '#63C5DA',
  green: '#A0BBAE',
  gray: '#6D6E71',
  grey: '#A7A9AC',
};

export const getColorHex = (name: string, fallback: string = '#CCCCCC'): string => {
  if (!name) return fallback;

  // Normalize and get the last word (e.g., "Bright Pink" → "pink")
  const parts = name.trim().toLowerCase().split(/\s+/);
  const normalized = parts[parts.length - 1];

  // Check custom map first
  if (customColorMap[normalized]) {
    return customColorMap[normalized];
  }

  return (
    toHex(normalized) ||
    colorNameToHex(normalized as any) ||
    (() => {
      try {
        const hex = convert.keyword.hex(normalized);
        return hex ? `#${hex}` : undefined;
      } catch {
        return undefined;
      }
    })() ||
    fallback
  );
};
