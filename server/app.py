from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image
import io
from model.xray_model import generate_report
from fastapi.middleware.cors import CORSMiddleware




app = FastAPI(title="🩻 Chest X-ray Report Generator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "✅ Chest X-ray Report Generator API is running"}

@app.post("/generate_report/")
async def generate_xray_report(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

        report = generate_report(image)

        return JSONResponse(content={"generated_report": report})

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
