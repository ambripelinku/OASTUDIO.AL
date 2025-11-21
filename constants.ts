import { SlideData, SlideType } from './types';

export const SLIDES: SlideData[] = [
  // --- COVER ---
  {
    id: 'cover',
    type: SlideType.COVER,
    title: 'OASTUDIO',
    subtitle: 'Brand Guidelines V2.0',
    theme: 'dark',
  },
  
  // --- SECTION 1: FOUNDATIONS ---
  {
    id: '1.0',
    sectionNumber: '01',
    type: SlideType.SECTION_HEADER,
    title: 'Brand Foundations',
    subtitle: 'Core Identity & Principles',
    theme: 'dark',
  },
  {
    id: '1.1',
    sectionNumber: '1.1',
    type: SlideType.CONTENT_TEXT,
    title: 'Mission',
    content: 'To design modern residential spaces with clarity, precision, and functional purpose — creating homes that elevate contemporary living.',
    theme: 'light',
  },
  {
    id: '1.2',
    sectionNumber: '1.2',
    type: SlideType.CONTENT_LIST,
    title: 'Vision',
    subtitle: 'What future are we building toward?',
    content: [
      'Aspirational',
      'Future-oriented',
      'Calm, confident',
      'Premium',
      'Architectural',
    ],
    theme: 'light',
  },
  {
    id: '1.3',
    sectionNumber: '1.3',
    type: SlideType.CONTENT_LIST,
    title: 'Core Values',
    subtitle: 'Short, architectural, actionable.',
    details: [
      { label: 'A', value: 'Clarity' },
      { label: 'B', value: 'Precision' },
      { label: 'C', value: 'Functionality' },
      { label: 'F', value: 'Responsibility' },
      { label: 'I', value: 'Design Leadership' },
    ],
    theme: 'light',
  },

  // --- SECTION 2: BRAND STORY ---
  {
    id: '2.0',
    sectionNumber: '02',
    type: SlideType.SECTION_HEADER,
    title: 'Brand Story',
    subtitle: 'Emotional + Strategic Narrative',
    theme: 'dark',
  },
  {
    id: '2.2',
    sectionNumber: '2.2',
    type: SlideType.CONTENT_TEXT,
    title: 'Design Philosophy',
    content: 'Beauty emerges from function. We design with purpose, creating warm, minimal, modern interiors where proportion, light, and materials work together.',
    theme: 'light',
  },

  // --- SECTION 3: VOICE ---
  {
    id: '3.0',
    sectionNumber: '03',
    type: SlideType.SECTION_HEADER,
    title: 'Voice & Tone',
    subtitle: 'Architectural-Tech Minimalism',
    theme: 'dark',
  },
  {
    id: '4.6',
    sectionNumber: '3.5',
    type: SlideType.CONTENT_LIST,
    title: 'Signature Phrases',
    content: [
      'Defined by clarity. Designed with intent.',
      'Where function shapes modern minimalism.',
      'Controlled process. Refined detail.',
      'Clean lines. Intelligent space.',
    ],
    theme: 'light',
  },

  // --- SECTION 5: LOGO ---
  {
    id: '5.0',
    sectionNumber: '04',
    type: SlideType.SECTION_HEADER,
    title: 'Logo System',
    subtitle: 'The "Origin" Symbol',
    theme: 'dark',
  },
  {
    id: '5.1',
    sectionNumber: '4.1',
    type: SlideType.CONTENT_LIST,
    title: 'Symbol Semantics',
    content: [
      'Represents A and O simultaneously',
      'The dot reinforces the "A" form',
      'Dot symbolizes origin / beginning',
      'Rounded, monoline, modern geometry',
    ],
    theme: 'light',
  },

  // --- SECTION 6: COLOR ---
  {
    id: '6.0',
    sectionNumber: '05',
    type: SlideType.SECTION_HEADER,
    title: 'Color System',
    subtitle: 'Dark, Dramatic, Cinematic',
    theme: 'dark',
  },
  {
    id: '6.1',
    sectionNumber: '5.1',
    type: SlideType.PALETTE,
    title: 'Primary Palette',
    theme: 'light',
  },

  // --- SECTION 7: TYPOGRAPHY ---
  {
    id: '7.0',
    sectionNumber: '06',
    type: SlideType.SECTION_HEADER,
    title: 'Typography',
    subtitle: 'Manrope & Inter',
    theme: 'dark',
  },
  {
    id: '7.3',
    sectionNumber: '6.1',
    type: SlideType.TYPOGRAPHY,
    title: 'Hierarchy',
    theme: 'light',
  },

  // --- SECTION 8: IMAGERY ---
  {
    id: '8.0',
    sectionNumber: '07',
    type: SlideType.SECTION_HEADER,
    title: 'Imagery',
    subtitle: 'Architectural Calm',
    theme: 'dark',
  },
  {
    id: '8.2',
    sectionNumber: '7.1',
    type: SlideType.CONTENT_LIST,
    title: 'Render Principles',
    content: [
      'Lighting: Natural, warm (3000K)',
      'Materials: Matte, natural textures',
      'Composition: Perfect symmetry',
      'Mood: Slow, Calm, Premium',
    ],
    theme: 'light',
  },

  // --- ENDING ---
  {
    id: 'end',
    type: SlideType.ENDING,
    title: 'Thank You',
    subtitle: 'office@oastudio.al',
    theme: 'dark',
  }
];