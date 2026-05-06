<p align="center">
  <h1 align="center">PDF<span style="color:#888">tool</span> ◆</h1>
  <p align="center"><strong>Universal Document Converter — Fast, Free & Open Source</strong></p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10+-blue?logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/FastAPI-0.115+-009688?logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/React-19+-61DAFB?logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Vite-8+-646CFF?logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
</p>

---

## ✨ What is PDFtool?

**PDFtool** is a full-stack, web-based document conversion suite that transforms files between **15+ format pathways** — PDF, Word, Excel, PowerPoint, Images, HTML, and Text — all from a sleek, premium dark-themed interface. No signup. No limits. No watermarks.

<p align="center">
  <img src="C:\Users\LENOVO\Downloads\stitch_pdftool_document_conversion_suite (1)\stitch_pdftool_document_conversion_suite\pdftool_landing_page_expanded" alt="PDFtool Home" width="800">
</p>

---

## 🚀 Features

### Core Conversions (15 Pathways)

| From → To | Formats |
|-----------|---------|
| **PDF → Document** | DOCX, XLSX, PPTX, TXT, HTML |
| **Document → PDF** | DOCX → PDF, XLSX → PDF, PPTX → PDF, TXT → PDF |
| **PDF → Image** | JPG, PNG, SVG |
| **Image → PDF** | JPG → PDF, PNG → PDF |
| **Image ↔ Image** | PNG ↔ JPG, PNG/JPG → WebP |

### Power Features

| Feature | Description |
|---------|-------------|
| 📦 **Batch Conversion** | Convert up to 10 files at once with queue management |
| 🔗 **Merge PDFs** | Combine multiple PDFs into a single document |
| 🗜️ **Compress PDF** | Reduce file size while preserving quality |
| 🔐 **Password Protect** | AES-256 encryption for PDF security |
| 🔍 **OCR Extraction** | Extract text from PDFs (text-layer based) |
| 📁 **Drag & Drop** | Simply drag files onto the converter workspace |
| 📜 **Conversion History** | Track and re-download recent conversions (localStorage) |
| 🌙 **Dark Mode UI** | Premium monochrome aesthetic with smooth animations |
| 📡 **REST API** | Full Swagger/OpenAPI docs at `/docs` |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite 8, React Router 7, Framer Motion, Lucide Icons |
| **Backend** | Python 3.10+, FastAPI, Uvicorn |
| **Conversion** | PyMuPDF (fitz), pdf2docx, python-docx, python-pptx, openpyxl, Pillow, ReportLab |
| **Styling** | Vanilla CSS with custom design system tokens |
| **API Client** | Axios with interceptors for error normalization |

---

## 📦 Project Structure

```
pdftool/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI entry point + CORS + router mounting
│   │   ├── routers/
│   │   │   ├── convert.py       # Single & batch conversion endpoints
│   │   │   ├── features.py      # Merge, compress, protect, OCR endpoints
│   │   │   └── health.py        # Health check endpoint
│   │   └── services/
│   │       ├── converter.py     # Core conversion engine (15 pathways)
│   │       └── cleanup.py       # TTL-based temp file cleanup
│   ├── requirements.txt
│   ├── temp_uploads/            # Temporary upload storage (auto-created)
│   └── converted_files/         # Conversion output storage (auto-created)
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx              # Root component with routing
│   │   ├── main.jsx             # Entry point
│   │   ├── pages/
│   │   │   ├── Home/            # Landing page with conversion grid
│   │   │   ├── Converter/       # Upload workspace + queue table
│   │   │   └── Features/        # Feature showcase page
│   │   ├── components/
│   │   │   ├── layout/          # Navbar, Footer
│   │   │   └── converter/       # UploadZone (drag & drop)
│   │   ├── services/
│   │   │   └── api.js           # Axios API client
│   │   ├── utils/
│   │   │   ├── formats.js       # Format registry & pathway validation
│   │   │   └── helpers.js       # Utility functions & localStorage
│   │   └── styles/
│   │       ├── variables.css    # Design system tokens
│   │       ├── index.css        # Global styles & components
│   │       └── animations.css   # Keyframe animations
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
├── .gitattributes
├── LICENSE
└── README.md
```

---

## ⚡ Quick Start

### Prerequisites

- **Python** 3.10+ → [python.org](https://python.org)
- **Node.js** 18+ → [nodejs.org](https://nodejs.org)
- **Git** → [git-scm.com](https://git-scm.com)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/pdftool.git
cd pdftool
```

### 2. Start the Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn app.main:app --reload --port 8000
```

The API is now live at **http://localhost:8000** (Swagger docs at `/docs`).

### 3. Start the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app is now live at **http://localhost:5173**.

---

## 🔌 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/health` | Health check |
| `POST` | `/api/v1/convert` | Single file conversion |
| `POST` | `/api/v1/convert/batch` | Batch file conversion |
| `GET` | `/api/v1/download/{file_id}` | Download converted file |
| `POST` | `/api/v1/merge` | Merge multiple PDFs |
| `POST` | `/api/v1/compress` | Compress a PDF |
| `POST` | `/api/v1/protect` | Password-protect a PDF |
| `POST` | `/api/v1/ocr` | Extract text from PDF |

### Example: Convert PDF to DOCX

```bash
curl -X POST http://localhost:8000/api/v1/convert \
  -F "file=@document.pdf" \
  -F "target_format=docx"
```

**Response:**
```json
{
  "success": true,
  "file_id": "abc-123",
  "download_url": "/api/v1/download/abc-123",
  "metadata": {
    "original_name": "document.pdf",
    "converted_format": "docx",
    "converted_size": 35521
  }
}
```

---

## 🎨 Design System

PDFtool uses a **Premium Monochrome** design language:

- **Background**: Pure black `#000000` with subtle grid overlay
- **Surface**: Dark cards `#0a0a0a` — `#111111` with glass borders
- **Typography**: Inter font family, weights 400–800
- **Accent**: Blue `#3b82f6` for interactive elements
- **Status Colors**: Green (success), Orange (processing), Red (failed)
- **Animations**: Smooth fade-ins, hover lifts, spin loaders

---

## 🛠️ Development

```bash
# Run backend with auto-reload
cd backend && uvicorn app.main:app --reload

# Run frontend with HMR
cd frontend && npm run dev

# Build frontend for production
cd frontend && npm run build

# Compile-check all Python files
python -m py_compile backend/app/services/converter.py
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<p align="center">
  <strong>PDF</strong><span style="color:#888">tool</span> ◆ — Built with ❤️ for developers and creators
</p>
