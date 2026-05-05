/* ============================================================
   Format Definitions — PDFtool
   Master registry for all supported file formats and conversions
   ============================================================ */

export const FORMAT_CATEGORIES = {
  PDF_TO_DOCUMENT: {
    id: 'pdf-to-document',
    label: 'PDF → Document',
    description: 'Convert PDF files to editable document formats',
    icon: 'FileText',
    color: '#C8B8A0',
  },
  DOCUMENT_TO_PDF: {
    id: 'document-to-pdf',
    label: 'Document → PDF',
    description: 'Convert documents to portable PDF format',
    icon: 'FileDown',
    color: '#C8B8A0',
  },
  PDF_TO_IMAGE: {
    id: 'pdf-to-image',
    label: 'PDF → Image',
    description: 'Export PDF pages as high-quality images',
    icon: 'Image',
    color: '#C8B8A0',
  },
  IMAGE_TO_PDF: {
    id: 'image-to-pdf',
    label: 'Image → PDF',
    description: 'Combine images into PDF documents',
    icon: 'ImagePlus',
    color: '#C8B8A0',
  },
  IMAGE_TO_IMAGE: {
    id: 'image-to-image',
    label: 'Image ↔ Image',
    description: 'Convert between image formats',
    icon: 'Repeat',
    color: '#C8B8A0',
  },
};

export const FORMATS = {
  pdf:  { id: 'pdf',  label: 'PDF',  ext: '.pdf',  mime: 'application/pdf',      icon: 'FileText',  color: '#FF4444' },
  docx: { id: 'docx', label: 'DOCX', ext: '.docx', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', icon: 'FileText', color: '#2B7CD3' },
  doc:  { id: 'doc',  label: 'DOC',  ext: '.doc',  mime: 'application/msword',   icon: 'FileText',  color: '#2B7CD3' },
  xlsx: { id: 'xlsx', label: 'XLSX', ext: '.xlsx', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', icon: 'Table', color: '#217346' },
  xls:  { id: 'xls',  label: 'XLS',  ext: '.xls',  mime: 'application/vnd.ms-excel', icon: 'Table',  color: '#217346' },
  pptx: { id: 'pptx', label: 'PPTX', ext: '.pptx', mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', icon: 'Presentation', color: '#D04423' },
  ppt:  { id: 'ppt',  label: 'PPT',  ext: '.ppt',  mime: 'application/vnd.ms-powerpoint', icon: 'Presentation', color: '#D04423' },
  txt:  { id: 'txt',  label: 'TXT',  ext: '.txt',  mime: 'text/plain',           icon: 'FileText',  color: '#A0A0A0' },
  csv:  { id: 'csv',  label: 'CSV',  ext: '.csv',  mime: 'text/csv',             icon: 'Table',     color: '#217346' },
  jpg:  { id: 'jpg',  label: 'JPG',  ext: '.jpg',  mime: 'image/jpeg',           icon: 'Image',     color: '#F0A030' },
  jpeg: { id: 'jpeg', label: 'JPEG', ext: '.jpeg', mime: 'image/jpeg',           icon: 'Image',     color: '#F0A030' },
  png:  { id: 'png',  label: 'PNG',  ext: '.png',  mime: 'image/png',            icon: 'Image',     color: '#5B9BD5' },
  svg:  { id: 'svg',  label: 'SVG',  ext: '.svg',  mime: 'image/svg+xml',        icon: 'Image',     color: '#FFB13B' },
  webp: { id: 'webp', label: 'WebP', ext: '.webp', mime: 'image/webp',           icon: 'Image',     color: '#4285F4' },
  bmp:  { id: 'bmp',  label: 'BMP',  ext: '.bmp',  mime: 'image/bmp',            icon: 'Image',     color: '#808080' },
  gif:  { id: 'gif',  label: 'GIF',  ext: '.gif',  mime: 'image/gif',            icon: 'Image',     color: '#9B59B6' },
  tiff: { id: 'tiff', label: 'TIFF', ext: '.tiff', mime: 'image/tiff',           icon: 'Image',     color: '#34495E' },
  html: { id: 'html', label: 'HTML', ext: '.html', mime: 'text/html',            icon: 'Code',      color: '#E34F26' },
};

/* ── 20 Conversion Pathways ── */
export const CONVERSION_PATHWAYS = [
  // PDF → Document (5)
  { source: 'pdf', target: 'docx', category: 'PDF_TO_DOCUMENT', popular: true },
  { source: 'pdf', target: 'txt',  category: 'PDF_TO_DOCUMENT', popular: false },
  { source: 'pdf', target: 'xlsx', category: 'PDF_TO_DOCUMENT', popular: true },
  { source: 'pdf', target: 'pptx', category: 'PDF_TO_DOCUMENT', popular: false },
  { source: 'pdf', target: 'html', category: 'PDF_TO_DOCUMENT', popular: false },

  // Document → PDF (5)
  { source: 'docx', target: 'pdf', category: 'DOCUMENT_TO_PDF', popular: true },
  { source: 'doc',  target: 'pdf', category: 'DOCUMENT_TO_PDF', popular: false },
  { source: 'xlsx', target: 'pdf', category: 'DOCUMENT_TO_PDF', popular: true },
  { source: 'pptx', target: 'pdf', category: 'DOCUMENT_TO_PDF', popular: true },
  { source: 'txt',  target: 'pdf', category: 'DOCUMENT_TO_PDF', popular: false },

  // PDF → Image (3)
  { source: 'pdf', target: 'jpg', category: 'PDF_TO_IMAGE', popular: true },
  { source: 'pdf', target: 'png', category: 'PDF_TO_IMAGE', popular: true },
  { source: 'pdf', target: 'svg', category: 'PDF_TO_IMAGE', popular: false },

  // Image → PDF (2)
  { source: 'jpg',  target: 'pdf', category: 'IMAGE_TO_PDF', popular: true },
  { source: 'png',  target: 'pdf', category: 'IMAGE_TO_PDF', popular: true },

  // Image ↔ Image (5)
  { source: 'jpg',  target: 'png',  category: 'IMAGE_TO_IMAGE', popular: true },
  { source: 'png',  target: 'jpg',  category: 'IMAGE_TO_IMAGE', popular: true },
  { source: 'png',  target: 'webp', category: 'IMAGE_TO_IMAGE', popular: false },
  { source: 'jpg',  target: 'webp', category: 'IMAGE_TO_IMAGE', popular: false },
  { source: 'webp', target: 'png',  category: 'IMAGE_TO_IMAGE', popular: false },
];

/* ── Group pathways by category ── */
export const getPathwaysByCategory = (categoryId) => {
  return CONVERSION_PATHWAYS.filter(p => p.category === categoryId);
};

/* ── Get available target formats for a source ── */
export const getTargetFormats = (sourceId) => {
  return CONVERSION_PATHWAYS
    .filter(p => p.source === sourceId)
    .map(p => FORMATS[p.target]);
};

/* ── Get available source formats for a target ── */
export const getSourceFormats = (targetId) => {
  return CONVERSION_PATHWAYS
    .filter(p => p.target === targetId)
    .map(p => FORMATS[p.source]);
};

/* ── Validate a conversion pathway exists ── */
export const isValidPathway = (source, target) => {
  return CONVERSION_PATHWAYS.some(p => p.source === source && p.target === target);
};

/* ── Accepted input MIME types (for upload validation) ── */
export const getAcceptedMimes = () => {
  const sources = [...new Set(CONVERSION_PATHWAYS.map(p => p.source))];
  const mimes = {};
  sources.forEach(s => {
    const fmt = FORMATS[s];
    if (fmt) mimes[fmt.mime] = [fmt.ext];
  });
  return mimes;
};

/* ── Max file size (50MB) ── */
export const MAX_FILE_SIZE = 50 * 1024 * 1024;
export const MAX_BATCH_FILES = 10;

/* ── Enhanced Features ── */
export const POWER_FEATURES = [
  {
    id: 'batch',
    label: 'Batch Conversion',
    description: 'Convert multiple files at once with queue management',
    badge: 'Pro',
    icon: 'Layers',
  },
  {
    id: 'merge',
    label: 'Merge PDFs',
    description: 'Combine multiple PDF files into a single document',
    badge: 'Popular',
    icon: 'Combine',
  },
  {
    id: 'compress',
    label: 'Compress PDF',
    description: 'Reduce file size while preserving quality',
    badge: 'Essential',
    icon: 'Minimize2',
  },
  {
    id: 'password',
    label: 'Password Protect',
    description: 'Add encryption and password protection to PDFs',
    badge: 'Security',
    icon: 'Lock',
  },
  {
    id: 'ocr',
    label: 'OCR Extraction',
    description: 'Extract text from scanned documents using AI',
    badge: 'AI-Powered',
    icon: 'ScanText',
  },
  {
    id: 'dragdrop',
    label: 'Drag & Drop',
    description: 'Simply drag files onto the converter workspace',
    badge: 'UX',
    icon: 'MousePointerClick',
  },
  {
    id: 'history',
    label: 'Conversion History',
    description: 'Track and re-download recent conversions',
    badge: 'New',
    icon: 'History',
  },
  {
    id: 'theme',
    label: 'Dark / Light Mode',
    description: 'Switch between dark and light themes',
    badge: 'Comfort',
    icon: 'Sun',
  },
  {
    id: 'api',
    label: 'API Access',
    description: 'RESTful API for programmatic conversions',
    badge: 'Developer',
    icon: 'Code',
  },
  {
    id: 'preview',
    label: 'File Preview',
    description: 'Preview files before and after conversion',
    badge: 'Quality',
    icon: 'Eye',
  },
];
