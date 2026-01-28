# 📘 User Manual: CCRAS Medical AI Platform

## 1. Introduction
Welcome to the **CCRAS Medical AI Diagnostic Platform**. This clinical decision support system is designed to assist medical professionals in the rapid analysis of radiological scans (X-ray, CT, MRI) while integrating traditional AYUSH (Ayurveda, Siddha, Unani) diagnostic classifications.

## 2. Platform Navigation
The portal is divided into four primary sections accessible via the sidebar:
- **Dashboard**: The central hub for initiating new diagnostic analyses.
- **Saved Reports**: A searchable archive of all clinical reports generated during your current session.
- **My Profile**: Clinician identity management (e.g., Dr. Sehrawat).
- **Settings**: Interface adjustments including Dark Mode and Font Scaling.

## 3. Diagnostic Workflow
To perform a clinical analysis, follow these steps:

### Step 1: Modality Selection
On the **Dashboard**, select the appropriate diagnostic modality:
- **X-ray**: Optimized for skeletal and pulmonary (Pneumonia/TB) analysis.
- **Brain & Body CT**: Used for 3D organ and vascular assessment.
- **Neuro/Spine MRI**: Specialized for soft-tissue and nerve pathologies.

### Step 2: Image Upload
Click the **"Select Imaging File"** button. 
- Supported formats: `.jpg`, `.png`, `.dicom` (converted).
- Ensure the scan is clear and centered for maximum AI precision.

### Step 3: Neural Analysis
Once the preview is visible, click **"Initiate AI Run"**. The system will:
1. Extract radiological features.
2. Calculate an **Integrity Confidence Score**.
3. Generate a **Diagnostic Impression**.

## 4. Understanding Results

### AI Confidence Score
A percentage indicating the model's certainty. Scores above **85%** are considered highly reliable for clinical archiving.

### Osteoarthritis (KL Grading)
For knee/joint X-rays, the AI automatically applies the **Kellgren-Lawrence Scale**:
- **Grade 0**: Normal joint.
- **Grade 1-2**: Subtle or minimal changes (early detection).
- **Grade 3-4**: Moderate to severe degeneration.

### Integrated AYUSH Tabs
The result screen includes specialized tabs for **Ayurveda, Siddha, and Unani**. These tabs map the radiological finding to traditional medicinal codes (e.g., *Sandhigata Vata* for Osteoarthritis).

## 5. Report Management

### Clinical Archive Generation
Click **"Download Clinical Archive"** to generate a formal PDF. This report includes:
- Institutional Header (CCRAS/Ministry of Ayush).
- Unique **Protocol ID** and Timestamp.
- AI Heatmap (Visual Evidence).
- Integrated WHO ICD-10 and Ayurveda Codes.

### History Retrieval
Navigate to **"Saved Reports"** to review previous analyses. Reports are stored in the local browser cache for the duration of your session.

## 6. Accessibility Features
- **Font Scaling**: Use the `A-` and `A+` buttons in the top header to adjust readability.
- **Dark Mode**: Toggle in the header or Settings for low-light environments (night shifts).
- **Skip to Content**: Standard accessibility link for keyboard-based navigation.

---
**Institutional Support**: For technical assistance, contact the CCRAS IT Support Desk via the sidebar link.