export type ScriptureCategory = 'gita' | 'stotra' | 'mantra' | 'purana' | 'ramayana' | 'mahabharata';
export type ScriptureDeity = 'shiva' | 'vishnu' | 'devi' | 'ganesha' | 'rama' | 'krishna' | 'hanuman' | 'surya';
export type VedaType = 'rig' | 'yajur' | 'sama' | 'atharva';

export interface TranslationItem {
  author: string;
  language: 'en' | 'hi';
  text: string;
}

export type Translation = TranslationItem;

export interface ShlokaItem {
  id: string;
  category: ScriptureCategory;
  deity?: ScriptureDeity | null;
  veda?: VedaType | null;
  title: {
    sanskrit: string;
    iast: string;
    english: string;
  };
  sanskrit_text: string;
  iast_transliteration: string;
  translations: TranslationItem[];
  chapter?: number;
  verse?: number;
  audio_url?: string;
  source: string;
  cover_image?: string;
}
