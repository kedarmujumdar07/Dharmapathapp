export type FestivalCategory = 'major_festival' | 'monthly_vrat' | 'lunar_marker' | 'jayanti';

export interface FestivalItem {
  id: string;
  name: string; // Common English / Hindi name
  iastName: string; // IAST transliteration
  sanskritName: string;
  category: FestivalCategory;
  tithiId?: number; // Target Tithi ID (1-30) for rule calculation
  tithiName?: string;
  paksha?: 'Shukla' | 'Krishna';
  sauMasaSign?: string; // Solar month constraint if applicable
  description: string;
  icon?: string;
  image?: string;
  regionalVariant?: string; // e.g. "North India", "South India", "Pan-India"
  fixedDate2026?: string; // Standard fixed reference date for 2026 if lunar calculated
}
