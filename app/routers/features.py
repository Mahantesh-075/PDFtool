from fastapi import APIRouter, UploadFile, File, Form, HTTPException, BackgroundTasks
from pathlib import Path
import uuid
import shutil
import os
from typing import List, Dict
from app.services.cleanup import cleanup_old_files

router = APIRouter()

UPLOAD_DIR = Path("temp_uploads")
OUTPUT_DIR = Path("converted_files")

@router.post("/merge")
async def merge_pdfs(
    background_tasks: BackgroundTasks,
    files: List[UploadFile] = File(...),
):
    background_tasks.add_task(cleanup_old_files)
    
    if len(files) < 2:
        raise HTTPException(status_code=400, detail="At least two files are required for merging")
    
    try:
        import fitz
        file_id = str(uuid.uuid4())
        output_path = OUTPUT_DIR / f"converted_{file_id}.pdf"
        
        doc_main = fitz.open()
        for file in files:
            temp_path = UPLOAD_DIR / f"temp_{uuid.uuid4()}.pdf"
            with open(temp_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            
            doc_to_add = fitz.open(temp_path)
            doc_main.insert_pdf(doc_to_add)
            doc_to_add.close()
            os.remove(temp_path)
            
        doc_main.save(output_path)
        doc_main.close()
        
        return {
            "success": True,
            "file_id": file_id,
            "download_url": f"/api/v1/download/{file_id}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/compress")
async def compress_pdf(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
):
    background_tasks.add_task(cleanup_old_files)
    
    try:
        import fitz
        file_id = str(uuid.uuid4())
        input_path = UPLOAD_DIR / f"temp_{file_id}.pdf"
        output_path = OUTPUT_DIR / f"converted_{file_id}.pdf"
        
        with open(input_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        doc = fitz.open(input_path)
        doc.save(output_path, garbage=4, deflate=True, clean=True)
        doc.close()
        os.remove(input_path)
        
        return {
            "success": True,
            "file_id": file_id,
            "download_url": f"/api/v1/download/{file_id}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/protect")
async def protect_pdf(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    password: str = Form(...),
):
    background_tasks.add_task(cleanup_old_files)
    
    try:
        import fitz
        file_id = str(uuid.uuid4())
        input_path = UPLOAD_DIR / f"temp_{file_id}.pdf"
        output_path = OUTPUT_DIR / f"converted_{file_id}.pdf"
        
        with open(input_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        doc = fitz.open(input_path)
        doc.save(
            output_path, 
            encryption=fitz.PDF_ENCRYPT_AES_256, 
            user_pw=password, 
            owner_pw=password,
            permissions=fitz.PDF_PERM_ACCESSIBILITY
        )
        doc.close()
        os.remove(input_path)
        
        return {
            "success": True,
            "file_id": file_id,
            "download_url": f"/api/v1/download/{file_id}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ocr")
async def ocr_pdf(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
):
    background_tasks.add_task(cleanup_old_files)
    
    # OCR is heavy and requires Tesseract. 
    # For MVP we'll implement a "Pseudo-OCR" that extracts text layer or mocks it.
    try:
        import fitz
        file_id = str(uuid.uuid4())
        input_path = UPLOAD_DIR / f"temp_{file_id}.pdf"
        output_path = OUTPUT_DIR / f"converted_{file_id}.txt"
        
        with open(input_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        doc = fitz.open(input_path)
        text = ""
        for page in doc:
            text += page.get_text()
        doc.close()
        os.remove(input_path)
        
        if not text.strip():
            text = "No selectable text found. This PDF may be a scan. Real OCR (Tesseract) is required for scanned documents."
            
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(text)
            
        return {
            "success": True,
            "file_id": file_id,
            "download_url": f"/api/v1/download/{file_id}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
