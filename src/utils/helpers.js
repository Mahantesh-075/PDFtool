/* ============================================================
   Utility helpers — PDFtool
   ============================================================ */

/* ── Format file size ── */
export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
};

/* ── Format duration ── */
export const formatDuration = (ms) => {
  if (ms < 1000) return `${ms}ms`;
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes}m ${remaining}s`;
};

/* ── Get file extension ── */
export const getFileExtension = (filename) => {
  return filename?.split('.').pop()?.toLowerCase() || '';
};

/* ── Generate unique ID ── */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/* ── Debounce ── */
export const debounce = (fn, ms = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};

/* ── Truncate filename ── */
export const truncateFilename = (name, maxLength = 30) => {
  if (!name || name.length <= maxLength) return name;
  const ext = getFileExtension(name);
  const base = name.slice(0, name.lastIndexOf('.'));
  const truncated = base.slice(0, maxLength - ext.length - 4);
  return `${truncated}...${ext}`;
};

/* ── Get timestamp string ── */
export const getTimestamp = () => {
  return new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/* ── Conversion history (localStorage) ── */
const HISTORY_KEY = 'pdftool_history';
const MAX_HISTORY = 50;

export const saveToHistory = (entry) => {
  const history = getHistory();
  history.unshift({
    ...entry,
    id: generateId(),
    timestamp: new Date().toISOString(),
  });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
};

export const getHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
};

export const clearHistory = () => {
  localStorage.setItem(HISTORY_KEY, '[]');
};

/* ── Theme persistence ── */
const THEME_KEY = 'pdftool_theme';

export const getStoredTheme = () => {
  return localStorage.getItem(THEME_KEY) || 'dark';
};

export const setStoredTheme = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
};
