from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import convert, health, features
import os

# Ensure storage directories exist
os.makedirs("temp_uploads", exist_ok=True)
os.makedirs("converted_files", exist_ok=True)

app = FastAPI(title="PDFtool API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api/v1", tags=["Health"])
app.include_router(convert.router, prefix="/api/v1", tags=["Conversion"])
app.include_router(features.router, prefix="/api/v1", tags=["Power Features"])

@app.get("/")
async def root():
    return {"message": "PDFtool API is running. Visit /docs for documentation."}
