# 📑 Developer Manual: CCRAS Medical AI Platform

## 1. Project Overview
The CCRAS Medical AI Platform is a clinical decision support system designed for the **Central Council for Research in Ayurvedic Sciences**. It bridges modern radiological imaging with traditional AYUSH diagnostic classifications using a hybrid AI architecture.

### Key Features
- **Multi-Modal Imaging**: Support for X-ray, CT, and MRI scans.
- **Hybrid AI Engine**: Local FastAPI backend (PyTorch) for fast inference with a Gemini 3.0 fallback for complex clinical reasoning.
- **Integrated Taxonomy**: Mapping between WHO ICD-10 and institutional Ayurveda/Siddha/Unani codes.
- **KL Grading**: High-sensitivity Kellgren-Lawrence grading (0-4) for Osteoarthritis.
- **Archival Reports**: Generation of formal, institutional-grade PDF reports.

---

## 2. Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS.
- **Backend**: FastAPI (Python), PyTorch, Torchvision.
- **AI**: Google Gemini API (`@google/genai`).
- **Reporting**: jsPDF (with custom Unicode rendering for Devanagari/Arabic).
- **Styling**: Modern "Glass-morphism" and "Institutional" aesthetics.

---

## 3. Prerequisites
Before starting, ensure you have the following installed:
- **Node.js**: v18.0.0 or higher.
- **Python**: v3.9 or higher.
- **Google Gemini API Key**: Obtained from [Google AI Studio](https://aistudio.google.com/).
- **RAM**: At least 8GB (for local AI model inference).

---

## 4. Setup Instructions

### Step 1: Environment Variables
Create a `.env` file in the project root:
```env
API_KEY=your_google_gemini_api_key_here
```

### Step 2: Backend Setup (Local AI Server)
1. Navigate to the `backend/` directory.
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Initialize the models:
   ```bash
   python setup_models.py
   ```
5. Run the server:
   ```bash
   uvicorn main:app --host 127.0.0.1 --port 8000 --reload
   ```
   *The server must be active for the "Local Engine" feature to work.*

### Step 3: Frontend Setup
1. In the project root, install Node dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

---

## 5. Project Architecture & Logic

### AI Inference Flow (`geminiService.ts`)
The system utilizes a "Fail-Soft" strategy:
1. **Local Check**: The app first hits `http://127.0.0.1:8000/predict-[modality]`.
2. **Fallback**: If the local server is unreachable (Warning: *Local AI Server unreachable*), it routes the request to Google Gemini 3 Flash.
3. **Structured Reasoning**: Gemini is instructed via a strict `responseSchema` to provide a clinical reasoning paragraph and integrated AYUSH codes.

### PDF Report Engine (`pdfService.ts`)
To maintain institutional formality:
- **Unicode Support**: Devanagari (Hindi) and Arabic scripts are rendered via a hidden canvas-to-image pipeline to ensure they appear correctly in the PDF regardless of system fonts.
- **Grid Layout**: Metadata (Protocol ID, Codes) is arranged in a gray-scale formal grid.

### UI Components
- **DiseaseInfoTabs**: Uses a "Log Entry" style for clinical records with reduced font sizes (9px-12px) for a professional look.
- **UploadBox**: Implements a "Medical Scanner" animation to provide visual feedback during high-latency AI operations.

---

## 6. Troubleshooting
- **CORS Errors**: If the frontend cannot talk to the backend, verify `backend/main.py` has allowed origins for the frontend port.
- **KL Grading Inaccuracy**: Adjust the `visionPrompt` in `geminiService.ts` to provide more clinical context or "Few-Shot" examples for subtle Grade 1/2 changes.
- **PDF Generation Fail**: Ensure the logo URL is accessible or provide a local base64 fallback.

---
**Institutional Record**: v1.1.0-Clinical Production  
**Maintainer**: CCRAS IT Division