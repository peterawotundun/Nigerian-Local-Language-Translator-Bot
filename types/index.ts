export interface TranslationResult {
  originalText: string;
  translatedText: string;
  fromLanguage: Language;
  toLanguage: Language;
  timestamp: Date;
}

export type Language = 'english' | 'igbo' | 'yoruba' | 'hausa';

export interface TranslationHistory {
  id: string;
  originalText: string;
  translatedText: string;
  fromLanguage: Language;
  toLanguage: Language;
  timestamp: Date;
}

export interface AudioState {
  isPlaying: boolean;
  audioUrl: string | null;
}

export interface ApiResponse {
  translatedText: string;
  audioUrl?: string;
  error?: string;
}