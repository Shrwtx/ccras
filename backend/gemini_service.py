import os
import json

# Clinical Database with Severity Levels
clinicalDatabase = [
    {
        "srNo": 1,
        "nameEnglish": "Normal",
        "severity": "Normal",
        "institutionalEntry": {
            "code": 512,
            "nameDevnagari": "स्वस्थ",
            "nameTerm": "Swastha",
            "description": "A state of physiological and psychological equilibrium with no clinical pathology."
        },
        "ayurveda": {
            "term": "Swastha",
            "description": "Equilibrium of Doshas, Agni, Dhatus, and Malas with a pleasant state of mind and senses."
        },
        "siddha": {
            "code": "S1",
            "term": "Udarpini",
            "word": "நோயற்ற நிலை",
            "translation": "Healthy State"
        },
        "unani": {
            "code": "U1",
            "word": "Sehat",
            "arabicTerm": "صحة",
            "translation": "Health",
            "description": "Perfect health with no disease"
        },
        "who_icd10": {
            "chapter": "Z",
            "block": "Z00-Z13",
            "code": "Z00.0",
            "word": "Encounter for general adult medical examination"
        },
        "who_icd11": {
            "entityId": "MG48",
            "code": "MG48",
            "term": "Healthy Person",
            "description": "No disease detected"
        }
    },
    {
        "srNo": 2,
        "nameEnglish": "Mild Osteoarthritis",
        "severity": "Mild",
        "institutionalEntry": {
            "code": 517,
            "nameDevnagari": "सौम्य संधिगत वात",
            "nameTerm": "Saum Sandhigata Vata",
            "description": "Early degenerative joint disease with minimal cartilage loss and slight joint space narrowing. Patient may experience mild discomfort during activity."
        },
        "ayurveda": {
            "term": "Saum Sandhigata Vata",
            "description": "Early Vata aggravation in joints with minimal structural changes. Characterized by slight stiffness and occasional pain."
        },
        "siddha": {
            "code": "S6M",
            "term": "Kuzhaindha Azhal Keel Vayu",
            "word": "குழைந்த அழல் கீழ் வாயு",
            "translation": "Mild Osteoarthritis"
        },
        "unani": {
            "code": "U6M",
            "word": "Waja-ul-Mafasil Khafeef",
            "arabicTerm": "وجع المفاصل خفيف",
            "translation": "Mild Joint Pain",
            "description": "Mild pain affecting the joints with minimal swelling."
        },
        "who_icd10": {
            "chapter": "XIII",
            "block": "M15-M19",
            "code": "M17.11",
            "word": "Primary osteoarthritis, right knee - Mild"
        },
        "who_icd11": {
            "entityId": "FA01.1",
            "code": "FA01.1",
            "term": "Osteoarthritis of knee, mild",
            "description": "Mild degenerative disorder of the knee joint."
        }
    },
    {
        "srNo": 3,
        "nameEnglish": "Moderate Osteoarthritis",
        "severity": "Moderate",
        "institutionalEntry": {
            "code": 517,
            "nameDevnagari": "मध्यम संधिगत वात",
            "nameTerm": "Madhyam Sandhigata Vata",
            "description": "Moderate degenerative joint disease with significant cartilage loss and visible joint space narrowing. Patient experiences regular pain and reduced mobility."
        },
        "ayurveda": {
            "term": "Madhyam Sandhigata Vata",
            "description": "Moderate Vata aggravation with noticeable structural changes. Pain, swelling, and stiffness are present."
        },
        "siddha": {
            "code": "S6MOD",
            "term": "Vettiya Azhal Keel Vayu",
            "word": "வெட்டிய அழல் கீழ் வாயு",
            "translation": "Moderate Osteoarthritis"
        },
        "unani": {
            "code": "U6MOD",
            "word": "Waja-ul-Mafasil Mutawassit",
            "arabicTerm": "وجع المفاصل متوسط",
            "translation": "Moderate Joint Pain",
            "description": "Moderate pain affecting the joints with visible swelling."
        },
        "who_icd10": {
            "chapter": "XIII",
            "block": "M15-M19",
            "code": "M17.12",
            "word": "Primary osteoarthritis, right knee - Moderate"
        },
        "who_icd11": {
            "entityId": "FA01.2",
            "code": "FA01.2",
            "term": "Osteoarthritis of knee, moderate",
            "description": "Moderate degenerative disorder of the knee joint with significant changes."
        }
    },
    {
        "srNo": 4,
        "nameEnglish": "Severe Osteoarthritis",
        "severity": "Severe",
        "institutionalEntry": {
            "code": 517,
            "nameDevnagari": "गंभीर संधिगत वात",
            "nameTerm": "Gambhir Sandhigata Vata",
            "description": "Severe degenerative joint disease with extensive cartilage loss, bone-on-bone contact, and significant joint space loss. Patient experiences severe pain, significant mobility loss, and may require surgical intervention."
        },
        "ayurveda": {
            "term": "Gambhir Sandhigata Vata",
            "description": "Severe Vata aggravation with extensive structural damage. Marked pain, swelling, deformity, and severe functional impairment."
        },
        "siddha": {
            "code": "S6S",
            "term": "Seviya Azhal Keel Vayu",
            "word": "சேவிய அழல் கீழ் வாயு",
            "translation": "Severe Osteoarthritis"
        },
        "unani": {
            "code": "U6S",
            "word": "Waja-ul-Mafasil Shadeed",
            "arabicTerm": "وجع المفاصل شديد",
            "translation": "Severe Joint Pain",
            "description": "Severe pain affecting the joints with significant swelling and functional impairment."
        },
        "who_icd10": {
            "chapter": "XIII",
            "block": "M15-M19",
            "code": "M17.13",
            "word": "Primary osteoarthritis, right knee - Severe"
        },
        "who_icd11": {
            "entityId": "FA01.3",
            "code": "FA01.3",
            "term": "Osteoarthritis of knee, severe",
            "description": "Severe degenerative disorder of the knee joint with extensive structural changes."
        }
    },
    {
        "srNo": 5,
        "nameEnglish": "Tuberculosis",
        "severity": "Active",
        "institutionalEntry": {
            "code": 513,
            "nameDevnagari": "राजयक्ष्मा",
            "nameTerm": "Rajayakshma",
            "description": "A chronic infectious disease leading to tissue wasting and respiratory failure."
        },
        "ayurveda": {
            "term": "Rajayakshma",
            "description": "Depletion of Dhatus leading to Kasa (cough) and Jvara (fever)."
        },
        "siddha": {
            "code": "S2",
            "term": "Kshaya Rogam",
            "word": "க்ஷய ரோகம்",
            "translation": "Wasting Disease"
        },
        "unani": {
            "code": "U2",
            "word": "Sil-o-Diq",
            "arabicTerm": "سل و دق",
            "translation": "Phthisis",
            "description": "Chronic lung disease with tissue wasting"
        },
        "who_icd10": {
            "chapter": "I",
            "block": "A15-A19",
            "code": "A15.0",
            "word": "Tuberculosis of lung"
        },
        "who_icd11": {
            "entityId": "135359752",
            "code": "1B10.Z",
            "term": "Tuberculosis of the respiratory system, unspecified",
            "description": "An infectious disease caused by the Mycobacterium tuberculosis complex"
        }
    },
    {
        "srNo": 6,
        "nameEnglish": "Brain Tumor",
        "severity": "Malignant",
        "institutionalEntry": {
            "code": 518,
            "nameDevnagari": "मस्तिष्क ट्यूमर",
            "nameTerm": "Mastishka Granthi",
            "description": "An abnormal growth of cells in the brain, detectable through MRI imaging."
        },
        "ayurveda": {
            "term": "Mastishka Granthi",
            "description": "Morbid growth in the brain region due to Kapha and Medovaha Srotas obstruction."
        },
        "siddha": {
            "code": "S7",
            "term": "Uyir Natpu",
            "word": "உயிர் நட்பு",
            "translation": "Brain Malignancy"
        },
        "unani": {
            "code": "U7",
            "word": "Sarataan-e-Dimagh",
            "arabicTerm": "سرطان الدماغ",
            "translation": "Brain Cancer",
            "description": "Malignant growth in brain tissue"
        },
        "who_icd10": {
            "chapter": "II",
            "block": "C00-D49",
            "code": "C71.9",
            "word": "Brain, unspecified"
        },
        "who_icd11": {
            "entityId": "8A60.Z",
            "code": "8A60.Z",
            "term": "Malignant neoplasm of brain",
            "description": "Cancerous growth in brain"
        }
    }
]

def get_clinical_entry(diagnosis: str):
    """Find diagnosis in clinical database"""
    for entry in clinicalDatabase:
        if diagnosis.lower() == entry["nameEnglish"].lower():
            return entry
    return None

def get_icd_codes_from_gemini(diagnosis: str, scan_type: str):
    """Return ICD codes from hardcoded database"""
    entry = get_clinical_entry(diagnosis)
    
    if entry:
        icd10 = entry.get("who_icd10", {})
        return {
            "icd_code": icd10.get("code", "R50.9"),
            "description": icd10.get("word", diagnosis),
            "confidence": 0.95,
            "severity": entry.get("severity", "Unknown"),
            "source": "clinical-database"
        }
    
    return {
        "icd_code": "R50.9",
        "description": "Unable to classify",
        "confidence": 0.0,
        "severity": "Unknown",
        "source": "fallback"
    }

def get_ayurveda_mapping_from_gemini(diagnosis: str, icd_code: str):
    """Return AYUSH classification from hardcoded database"""
    entry = get_clinical_entry(diagnosis)
    
    if entry:
        return {
            "ayurveda_code": entry["ayurveda"].get("term", ""),
            "ayurveda_description": entry["ayurveda"].get("description", ""),
            "severity": entry.get("severity", "Unknown"),
            "siddha": entry.get("siddha", {}),
            "unani": entry.get("unani", {}),
            "who_icd10": entry.get("who_icd10", {}),
            "who_icd11": entry.get("who_icd11", {}),
            "full_entry": entry
        }
    
    return {
        "ayurveda_code": "Unknown",
        "ayurveda_description": "Unable to classify",
        "severity": "Unknown",
        "siddha": {},
        "unani": {},
        "who_icd10": {},
        "who_icd11": {},
        "full_entry": {}
    }