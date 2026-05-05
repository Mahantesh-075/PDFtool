# ============================================================
# PDFtool — Complete Project Summary
# Generated: May 5, 2026
# ============================================================

## 1. Project Overview

**PDFtool** is a full-stack, web-based document conversion application
that enables users to convert files between 15+ format pathways
through a premium dark-themed UI. The project is split into a Python
FastAPI backend (conversion engine) and a React/Vite frontend
(user interface).

- **Status**: Production-ready (all conversion pathways verified)
- **License**: MIT
- **Architecture**: Decoupled frontend + backend (REST API)


## 2. Architecture

```
┌──────────────────────────────────────────────────────┐
│                    FRONTEND (React)                  │
│                                                      │
│  ┌─────────┐  ┌───────────┐  ┌──────────┐          │
│  │  Home   │  │ Converter │  │ Features │          │
│  │  Page   │  │   Page    │  │   Page   │          │
│  └────┬────┘  └─────┬─────┘  └──────────┘          │
│       │             │                                │
│       │      ┌──────┴──────┐                        │
│       │      │  UploadZone │  (Drag & Drop)         │
│       │      └──────┬──────┘                        │
│       │             │                                │
│  ┌────┴─────────────┴────────────────────┐          │
│  │           api.js (Axios)              │          │
│  │  convertFile | batchConvert | merge   │          │
│  │  compress | protect | ocr | download  │          │
│  └───────────────────┬───────────────────┘          │
└──────────────────────┼───────────────────────────────┘
                       │ HTTP (port 5173 → proxy → 8000)
┌──────────────────────┼───────────────────────────────┐
│                 BACKEND (FastAPI)                     │
│                      │                                │
│  ┌───────────────────┴───────────────────┐           │
│  │            main.py (CORS + Routers)   │           │
│  └───┬──────────────┬──────────────┬─────┘           │
│      │              │              │                  │
│ ┌────┴────┐  ┌──────┴─────┐  ┌────┴─────┐           │
│ │health.py│  │ convert.py │  │features.py│           │
│ │ GET /   │  │ POST /conv │  │POST /merge│           │
│ │ health  │  │ POST /batch│  │POST /comp │           │
│ └─────────┘  │ GET /dl    │  │POST /prot │           │
│              └──────┬─────┘  │POST /ocr  │           │
│                     │        └────┬──────┘           │
│              ┌──────┴─────┐      │                   │
│              │converter.py├──────┘                   │
│              │ 15 pathways│                           │
│              └──────┬─────┘                           │
│                     │                                 │
│  ┌──────────────────┴──────────────────────┐         │
│  │          External Libraries             │         │
│  │  PyMuPDF | pdf2docx | python-docx      │         │
│  │  python-pptx | openpyxl | pandas       │         │
│  │  Pillow | ReportLab                    │         │
│  └─────────────────────────────────────────┘         │
│                                                       │
│  temp_uploads/  ←→  converted_files/                 │
│  (auto-cleanup after 1 hour via cleanup.py)          │
└───────────────────────────────────────────────────────┘
```


## 3. Conversion Pathways (15 Total)

### Document Conversions
| #  | Source | Target | Library Used           | Status  |
|----|--------|--------|------------------------|---------|
| 1  | PDF    | DOCX   | pdf2docx               | ✅ Pass |
| 2  | PDF    | XLSX   | PyMuPDF + pandas       | ✅ Pass |
| 3  | PDF    | PPTX   | PyMuPDF + python-pptx  | ✅ Pass |
| 4  | PDF    | TXT    | PyMuPDF                | ✅ Pass |
| 5  | PDF    | HTML   | PyMuPDF                | ✅ Pass |
| 6  | DOCX   | PDF    | python-docx + reportlab| ✅ Pass |
| 7  | XLSX   | PDF    | pandas + reportlab     | ✅ Pass |
| 8  | PPTX   | PDF    | python-pptx + reportlab| ✅ Pass |
| 9  | TXT    | PDF    | reportlab              | ✅ Pass |

### Image Conversions
| #  | Source | Target | Library Used    | Status  |
|----|--------|--------|-----------------|---------|
| 10 | PDF    | JPG    | PyMuPDF         | ✅ Pass |
| 11 | PDF    | PNG    | PyMuPDF         | ✅ Pass |
| 12 | PDF    | SVG    | PyMuPDF         | ✅ Pass |
| 13 | JPG    | PDF    | PyMuPDF         | ✅ Pass |
| 14 | PNG    | PDF    | PyMuPDF         | ✅ Pass |
| 15 | IMG↔IMG| varies | Pillow          | ✅ Pass |

### Power Features
| Feature          | Endpoint       | Library  | Status  |
|------------------|----------------|----------|---------|
| Merge PDFs       | POST /merge    | PyMuPDF  | ✅ Pass |
| Compress PDF     | POST /compress | PyMuPDF  | ✅ Pass |
| Password Protect | POST /protect  | PyMuPDF  | ✅ Pass |
| OCR Extraction   | POST /ocr      | PyMuPDF  | ✅ Pass |


## 4. Frontend Pages

| Page      | Route                    | Components Used            |
|-----------|--------------------------|----------------------------|
| Home      | `/`                      | Hero, ConversionGrid, PowerGrid |
| Converter | `/convert`               | Tabs, UploadZone, Queue Table   |
| Converter | `/convert/:source/:target`| Same as above (URL-parameterized)|
| Features  | `/features`              | FeatureGrid, CTA Section        |


## 5. API Endpoints

| Method | Endpoint               | Body                          | Response                    |
|--------|------------------------|-------------------------------|-----------------------------|
| GET    | /api/v1/health         | —                             | `{status, message}`         |
| POST   | /api/v1/convert        | file, target_format           | `{success, file_id, url}`   |
| POST   | /api/v1/convert/batch  | files[], target_format        | `{results: [...]}`          |
| GET    | /api/v1/download/{id}  | —                             | Binary file stream          |
| POST   | /api/v1/merge          | files[]                       | `{success, file_id, url}`   |
| POST   | /api/v1/compress       | file                          | `{success, file_id, url}`   |
| POST   | /api/v1/protect        | file, password                | `{success, file_id, url}`   |
| POST   | /api/v1/ocr            | file                          | `{success, file_id, url}`   |


## 6. Dependencies

### Backend (Python)
| Package         | Purpose                              |
|-----------------|--------------------------------------|
| fastapi         | Web framework                        |
| uvicorn         | ASGI server                          |
| python-multipart| File upload parsing                  |
| PyMuPDF (fitz)  | PDF rendering, extraction, merging   |
| pdf2docx        | High-fidelity PDF → DOCX conversion  |
| python-docx     | DOCX reading/writing                 |
| python-pptx     | PPTX reading/writing                 |
| openpyxl        | XLSX reading/writing                 |
| pandas          | Data manipulation for XLSX export    |
| Pillow          | Image format conversion              |
| reportlab       | PDF generation from text/data        |

### Frontend (Node.js)
| Package          | Purpose                              |
|------------------|--------------------------------------|
| react            | UI framework                         |
| react-router-dom | Client-side routing                  |
| axios            | HTTP client for API calls            |
| react-dropzone   | Drag & drop file upload              |
| framer-motion    | Animations                           |
| lucide-react     | Icon library                         |
| vite             | Build tool & dev server              |


## 7. Design System

| Token             | Value                                          |
|-------------------|------------------------------------------------|
| Background        | `#000000` (pure black)                         |
| Surface           | `#0a0a0a` → `#111111` (dark grey cards)        |
| Text Primary      | `#ffffff`                                      |
| Text Secondary    | `#888888`                                      |
| Accent            | `#3b82f6` (blue)                               |
| Font              | Inter (400–800 weights)                        |
| Border Radius     | 4px – 16px – 9999px (pill)                     |
| Animations        | fadeIn, fadeInUp, spin, scaleIn, bounceIn       |


## 8. File Handling & Security

- **Max Upload**: 50 MB per file
- **Temp Storage**: Files stored in `temp_uploads/` during processing
- **Output Storage**: Converted files in `converted_files/`
- **Auto Cleanup**: Background task deletes files older than 1 hour
- **Validation**: Empty file rejection, extension verification
- **Error Handling**: Safe try/except with traceback logging


## 9. How to Run

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Access
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs


## 10. Files Created During Development

| File                          | Purpose                           |
|-------------------------------|-----------------------------------|
| README.md                     | Project documentation             |
| LICENSE                       | MIT license                       |
| .gitignore                    | Git exclusion rules               |
| .gitattributes                | Line ending & binary detection    |
| .editorconfig                 | Editor style consistency          |
| .env.example                  | Environment variable template     |
| PROJECT_SUMMARY.md            | This file                         |
