from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
import random
import os
import shutil
from model_factory import orchestrator

app = FastAPI(title="CCRAS Institutional AI Node")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files for uploads
if not os.path.exists("static"):
    os.makedirs("static")
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.post("/predict-xray/chest")
async def predict_chest(file: UploadFile = File(...)):
    """Expert Node for Thoracic/Chest Analysis."""
    try:
        result = orchestrator.run_inference(file, "Chest X-ray")
        image_url = await save_upload_file(file)
        return format_response(result, image_url)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict-xray/knee")
async def predict_knee(file: UploadFile = File(...)):
    """Expert Node for Knee Osteoarthritis grading."""
    try:
        result = orchestrator.run_inference(file, "Knee X-ray")
        image_url = await save_upload_file(file)
        return format_response(result, image_url)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict-mri")
async def predict_mri(file: UploadFile = File(...)):
    result = orchestrator.run_inference(file, "MRI")
    image_url = await save_upload_file(file)
    return format_response(result, image_url)

@app.post("/predict-ct")
async def predict_ct(file: UploadFile = File(...)):
    result = orchestrator.run_inference(file, "CT")
    image_url = await save_upload_file(file)
    return format_response(result, image_url)

def format_response(result, image_url):
    """Standardizes the inference result for the CCRAS UI."""
    return {
        "id": f"CCRAS-L-{random.randint(10000, 99999)}",
        "prediction": result["prediction"],
        "confidence": result["confidence"],
        "icdCode": result["icd"],
        "radiologicalObservation": (
            f"Routing: {result['stage1_router']} -> Expert: {result['architecture']}. "
            f"Anatomy: {result['detected_anatomy']}. "
            f"Observations suggest features consistent with {result['prediction']}."
        ),
        "modelArchitecture": result["architecture"],
        "detectedAnatomy": result["detected_anatomy"],
        "original_url": image_url,
        "all_results": [
            {"label": result["prediction"], "confidence": result["confidence"]},
            {"label": "Healthy/Normal", "confidence": round(1.0 - result["confidence"], 4)}
        ],
        "info": {
            "AYURVEDA CLASSIFICATION": {
                "type": "table",
                "columns": ["Sr No.", "Code", "Clinical Term", "Research Mapping"],
                "rows": [["1", "AY-INT-01", result["ayur"], f"Hierarchical classification via {result['architecture']}."]]
            },
            "INSTITUTIONAL LOG": {
                "type": "text",
                "content": f"Inference complete on CCRAS Local Node. Weights loaded: {result['weights']}."
            }
        }
    }

async def save_upload_file(file: UploadFile) -> str:
    """Save uploaded file to static directory and return URL."""
    file_ext = os.path.splitext(file.filename)[1]
    unique_filename = f"{random.randint(100000, 999999)}{file_ext}"
    file_path = os.path.join("static", unique_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return f"/static/{unique_filename}"

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "version": "1.0.0"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)


