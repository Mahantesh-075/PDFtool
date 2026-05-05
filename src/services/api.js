/* ============================================================
   API Service — PDFtool
   Handles all communication with the FastAPI backend
   ============================================================ */

import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_BASE}/api/v1`,
  timeout: 300000, // 5 min timeout for large conversions
});

/* ── Response interceptor for error normalization ── */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    let message = 'An unexpected error occurred';
    
    // Handle Blob errors (common in download endpoints)
    if (error.response?.data instanceof Blob && error.response.data.type === 'application/json') {
      try {
        const text = await error.response.data.text();
        const data = JSON.parse(text);
        message = data.detail || data.message || message;
      } catch (e) {
        console.error('Error parsing blob error', e);
      }
    } else {
      message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        message;
    }

    return Promise.reject({
      status: error.response?.status || 500,
      message,
      original: error,
    });
  }
);

/* ── Single file conversion ── */
export const convertFile = async (file, sourceFormat, targetFormat, options = {}) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('source_format', sourceFormat);
  formData.append('target_format', targetFormat);

  if (options.quality) formData.append('quality', options.quality);
  if (options.ocr) formData.append('ocr', 'true');
  if (options.password) formData.append('password', options.password);
  if (options.dpi) formData.append('dpi', options.dpi);
  if (options.pages) formData.append('pages', options.pages);

  const response = await api.post('/convert', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: options.onUploadProgress,
  });

  return response.data;
};

/* ── Batch conversion ── */
export const batchConvert = async (files, targetFormat, options = {}) => {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));
  formData.append('target_format', targetFormat);

  if (options.quality) formData.append('quality', options.quality);
  if (options.ocr) formData.append('ocr', 'true');

  const response = await api.post('/convert/batch', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: options.onUploadProgress,
  });

  return response.data;
};

/* ── Merge PDFs ── */
export const mergePDFs = async (files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));

  const response = await api.post('/merge', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

/* ── Compress PDF ── */
export const compressPDF = async (file, quality = 'medium') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('quality', quality);

  const response = await api.post('/compress', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

/* ── Password Protect ── */
export const protectPDF = async (file, password) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('password', password);

  const response = await api.post('/protect', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

/* ── OCR ── */
export const ocrExtract = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/ocr', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

/* ── Download converted file ── */
export const downloadFile = async (taskId) => {
  const response = await api.get(`/download/${taskId}`, {
    responseType: 'blob',
  });
  return response;
};

/* ── Download helper ── */
export const triggerDownload = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

/* ── Get conversion status ── */
export const getConversionStatus = async (taskId) => {
  const response = await api.get(`/status/${taskId}`);
  return response.data;
};

/* ── Health check ── */
export const healthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;
