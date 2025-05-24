import { ApiResponse, Language } from '../types';

// This is a mock API for frontend development
// In a real implementation, these would be API calls to your Python backend

const MOCK_DELAY = 1000; // Simulate network delay

export const translateText = async (
  text: string,
  fromLanguage: Language,
  toLanguage: Language
): Promise<ApiResponse> => {
  // Simulates API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!text.trim()) {
        resolve({ translatedText: '', error: 'Please enter text to translate' });
        return;
      }

      // Simple mock translations
      const mockTranslations: Record<string, Record<Language, string>> = {
        english: {
          igbo: 'Nnọọ (Mock Igbo translation)',
          yoruba: 'Ẹ nlẹ (Mock Yoruba translation)',
          hausa: 'Sannu (Mock Hausa translation)',
          english: text,
        },
        igbo: {
          english: 'Hello (Mock translation from Igbo)',
          yoruba: 'Ẹ nlẹ (Mock translation from Igbo to Yoruba)',
          hausa: 'Sannu (Mock translation from Igbo to Hausa)',
          igbo: text,
        },
        yoruba: {
          english: 'Hello (Mock translation from Yoruba)',
          igbo: 'Nnọọ (Mock translation from Yoruba to Igbo)',
          hausa: 'Sannu (Mock translation from Yoruba to Hausa)',
          yoruba: text,
        },
        hausa: {
          english: 'Hello (Mock translation from Hausa)',
          igbo: 'Nnọọ (Mock translation from Hausa to Igbo)',
          yoruba: 'Ẹ nlẹ (Mock translation from Hausa to Yoruba)',
          hausa: text,
        },
      };

      const translatedText = mockTranslations[fromLanguage][toLanguage] || 'Translation not available';
      
      resolve({
        translatedText,
        audioUrl: toLanguage !== 'english' ? '/mock-audio-url.mp3' : undefined,
      });
    }, MOCK_DELAY);
  });
};

export const textToSpeech = async (text: string, language: Language): Promise<string> => {
  // Simulates TTS API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real implementation, this would return a URL to an audio file
      resolve('/mock-audio-url.mp3');
    }, MOCK_DELAY);
  });
};

export const speechToText = async (audioBlob: Blob, language: Language): Promise<string> => {
  // Simulates STT API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockTexts: Record<Language, string> = {
        english: 'This is a mock transcription in English.',
        igbo: 'Nke a bụ mock transcription na Igbo.',
        yoruba: 'Eyi jẹ ayelujara àkọsílẹ̀ ni Yorùbá.',
        hausa: 'Wannan shine mock transcription a Hausa.',
      };
      
      resolve(mockTexts[language]);
    }, MOCK_DELAY);
  });
};