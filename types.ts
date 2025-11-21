export enum SlideType {
  WELCOME = 'WELCOME', // New intro
  COVER = 'COVER',
  SECTION_HEADER = 'SECTION_HEADER',
  CONTENT_TEXT = 'CONTENT_TEXT', 
  CONTENT_LIST = 'CONTENT_LIST',
  PALETTE = 'PALETTE',
  TYPOGRAPHY = 'TYPOGRAPHY',
  GRID_SYSTEM = 'GRID_SYSTEM',
  ENDING = 'ENDING', // New outro
}

export interface SlideData {
  id: string;
  sectionNumber?: string;
  type: SlideType;
  title: string;
  subtitle?: string;
  content?: string | string[];
  details?: { label: string; value: string }[];
  theme: 'dark' | 'light';
}

export enum ImageResolution {
  RES_1K = '1K',
  RES_2K = '2K',
  RES_4K = '4K',
}

export type AccentColor = '#D4FF00' | '#FF4D00' | '#0066FF' | '#BD00FF';
export type FontTheme = 'manrope' | 'outfit' | 'ubuntu' | 'oswald';

export const ACCENT_COLORS: { label: string; value: AccentColor }[] = [
  { label: 'Acid Lime', value: '#D4FF00' },
  { label: 'Hyper Orange', value: '#FF4D00' },
  { label: 'Electric Blue', value: '#0066FF' },
  { label: 'Cyber Purple', value: '#BD00FF' },
];

export const BRAND_COLORS = {
  primaryBlack: '#000000',
  warmWhite: '#F7F5F2',
  softBlack: '#121212',
};