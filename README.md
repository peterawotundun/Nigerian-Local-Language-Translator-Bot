# Nigerian Local Language Translator Bot

A web application that translates between English and Nigerian languages (Igbo, Yoruba, and Hausa), with text-to-speech and speech-to-text capabilities.

## Features

- Bidirectional text translation between English and Nigerian languages
- Text-to-speech functionality
- Speech-to-text capabilities
- Translation history
- Responsive web interface

## Frontend Implementation

The frontend is built with:
- React + TypeScript
- Tailwind CSS for styling
- Lucide React for icons

## Backend Implementation (Required)

To make this application fully functional, you'll need to implement a Python backend with:
- FastAPI or Flask
- Translation model integration (e.g., Facebook/NLLB-200, Masakhane models)
- Text-to-speech integration (e.g., Google TTS, Coqui TTS)
- Speech-to-text integration (e.g., OpenAI Whisper, Vosk)

### Backend Setup (Recommended)

1. Create a new directory for the backend:
```
mkdir backend
cd backend
```

2. Set up a Python virtual environment:
```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install FastAPI and other dependencies:
```
pip install fastapi uvicorn python-multipart transformers torch sentencepiece soundfile librosa
pip install google-cloud-texttospeech  # For Google TTS
pip install openai  # For Whisper API
```

4. Create API endpoints:
- `/translate` - For text translation
- `/tts` - For text-to-speech
- `/stt` - For speech-to-text

## Development

1. Run the frontend:
```
npm run dev
```

2. Run the backend (once implemented):
```
cd backend
uvicorn main:app --reload
```

## Deployment Options

- Frontend: Netlify, Vercel
- Backend: Heroku, Railway, or Hugging Face Spaces
- Optional: Telegram or WhatsApp Bot Integration

## Note

The current frontend implementation uses mock API responses for demonstration purposes. Connect it to your Python backend for full functionality.