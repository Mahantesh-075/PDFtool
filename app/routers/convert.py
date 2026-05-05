from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
from pathlib import Path
import uuid
import shutil
import os
from pydantic import BaseModel
from typing import Dict, List
from app.services.converter import convert_file

router = APIRouter()

UPLOAD_DIR = Path("temp_uploads")
OUTPUT_DIR = Path("converted_files")

class ConversionResponse(BaseModel):
    success: bool
    file_id: str
    download_url: str
    metadata: Dict

@router.post("/convert", response_model=ConversionResponse)
async def convert_document(
    file: UploadFile = File(...),
    target_format: str = Form(...),
):
    try:
        file_id = str(uuid.uuid4())
        filename = file.filename
        source_format = filename.split('.')[-1].lower() if '.' in filename else ''
        
        if not source_format:
            raise HTTPException(status_code=400, detail="File has no extension")
            
        input_path = UPLOAD_DIR / f"{file_id}.{source_format}"
        with open(input_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Validate file size
        if os.path.getsize(input_path) == 0:
            os.remove(input_path)
            raise HTTPException(status_code=400, detail="Uploaded file is empty")

        output_filename = f"converted_{file_id}.{target_format}"
        output_path = OUTPUT_DIR / output_filename
        
        result = await convert_file(
            str(input_path), 
            str(output_path), 
            source_format, 
            target_format
        )
        
        if not result.get('success'):
            raise HTTPException(status_code=500, detail=f"Conversion failed: {result.get('error')}")

        original_size = os.path.getsize(input_path)
        converted_size = os.path.getsize(output_path)
        
        return ConversionResponse(
            success=True,
            file_id=file_id,
            download_url=f"/api/v1/download/{file_id}",
            metadata={
                "original_name": filename,
                "original_format": source_format,
                "original_size": original_size,
                "converted_name": f"{filename.split('.')[0]}.{target_format}",
                "converted_format": target_format,
                "converted_size": converted_size
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/convert/batch")
async def batch_convert_documents(
    files: List[UploadFile] = File(...),
    target_format: str = Form(...),
):
    results = []
    for file in files:
        try:
            file_id = str(uuid.uuid4())
            filename = file.filename
            source_format = filename.split('.')[-1].lower() if '.' in filename else ''
            
            if not source_format:
                results.append({"filename": filename, "success": False, "error": "No extension"})
                continue
                
            input_path = UPLOAD_DIR / f"{file_id}.{source_format}"
            with open(input_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
                
            # Validate file size
            if os.path.getsize(input_path) == 0:
                os.remove(input_path)
                results.append({"filename": filename, "success": False, "error": "Uploaded file is empty"})
                continue

            output_filename = f"converted_{file_id}.{target_format}"
            output_path = OUTPUT_DIR / output_filename
            
            convert_res = await convert_file(
                str(input_path), 
                str(output_path), 
                source_format, 
                target_format
            )
            
            if convert_res.get('success'):
                results.append({
                    "filename": filename,
                    "success": True,
                    "file_id": file_id,
                    "download_url": f"/api/v1/download/{file_id}"
                })
            else:
                results.append({"filename": filename, "success": False, "error": convert_res.get('error')})
        except Exception as e:
            results.append({"filename": filename, "success": False, "error": str(e)})
            
    return {"results": results}

@router.get("/download/{file_id}")
async def download_file(file_id: str):
    for file_path in OUTPUT_DIR.glob(f"converted_{file_id}.*"):
        return FileResponse(
            path=file_path,
            filename=file_path.name.replace(f"converted_{file_id}", "pdftool_converted"),
            media_type="application/octet-stream"
        )
    raise HTTPException(status_code=404, detail="File not found or expired")
