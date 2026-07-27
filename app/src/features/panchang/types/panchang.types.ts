export interface LocationInput {
  latitude: number;
  longitude: number;
  timezoneOffsetMinutes?: number; // Minutes relative to UTC (e.g. +330 for IST)
  name?: string;
}

export type Paksha = 'Shukla' | 'Krishna';

export interface TithiInfo {
  id: number; // 1 to 30
  name: string; // e.g. "Pratipada", "Dwitiya", ..., "Purnima", "Amavasya"
  paksha: Paksha;
  indexInPaksha: number; // 1 to 15
  endTimestamp?: string; // ISO time of transition or "Spans full day"
}

export interface NakshatraInfo {
  id: number; // 1 to 27 (Ashwini to Revati)
  name: string;
  ruler: string; // Planetary ruler
  pada: number; // 1 to 4
  endTimestamp?: string;
}

export interface YogaInfo {
  id: number; // 1 to 27 (Vishkambha to Vaidhriti)
  name: string;
  endTimestamp?: string;
}

export interface KaranaInfo {
  id: number; // 1 to 60 (or mapped to 11 names: Bava, Balava, Kaulava, Taitila, Gara, Vanija, Vishti, Shakuni, Chatushpada, Naga, Kintughna)
  name: string;
  type: 'Movable' | 'Fixed';
  endTimestamp?: string;
}

export interface SamvatsaraInfo {
  id: number; // 1 to 60 in the 60-year Jupiter cycle
  name: string; // e.g. "Krodhi", "Visvavasu", "Paridhavi"
  vikramSamvat: number; // e.g. 2082
  sakaSamvat: number; // e.g. 1948
}

export interface RituInfo {
  id: number; // 1 to 6
  name: string; // Vasanta, Grishma, Varsha, Sharad, Hemanta, Shishira
  englishName: string;
}

export interface SauMasaInfo {
  id: number; // 1 to 12 (Mesha to Meena)
  name: string;
  zodiacSign: string;
}

export interface SolarTimes {
  sunrise: string; // e.g. "06:12:00"
  sunset: string; // e.g. "18:45:00"
  solarNoon: string;
  dayLengthMinutes: number;
}

export type ChoghadiyaNature = 'Amrit' | 'Shubh' | 'Labh' | 'Char' | 'Rog' | 'Kaal' | 'Udveg';
export type ChoghadiyaQuality = 'Good' | 'Neutral' | 'Bad';

export interface ChoghadiyaSlot {
  name: ChoghadiyaNature;
  quality: ChoghadiyaQuality;
  start: string;
  end: string;
  isNight: boolean;
}

export interface MuhuratTimes {
  rahuKalam: { start: string; end: string };
  yamagandam: { start: string; end: string };
  gulikaKalam: { start: string; end: string };
  abhijit: { start: string; end: string };
  durmuhurtham: Array<{ start: string; end: string }>;
  choghadiya: ChoghadiyaSlot[];
}

export interface DailyPanchang {
  date: string; // YYYY-MM-DD
  location: LocationInput;
  solarTimes: SolarTimes;
  tithi: TithiInfo;
  nakshatra: NakshatraInfo;
  yoga: YogaInfo;
  karana: KaranaInfo;
  samvatsara: SamvatsaraInfo;
  ritu: RituInfo;
  sauMasa: SauMasaInfo;
  muhurat: MuhuratTimes;
}
