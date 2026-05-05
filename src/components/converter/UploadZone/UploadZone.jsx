/* ============================================================
   FileDropzone Component — PDFtool
   ============================================================ */

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File, X, Plus } from 'lucide-react';
import { formatFileSize, getFileExtension } from '../../../utils/helpers';
import { MAX_FILE_SIZE } from '../../../utils/formats';
import './UploadZone.css';

export default function UploadZone({
  files = [],
  onFilesChange,
  accept,
  multiple = false,
  maxFiles = 10,
}) {
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const errors = rejectedFiles.map(
          (r) => `${r.file.name}: ${r.errors.map((e) => e.message).join(', ')}`
        );
        alert(`Upload error:\n${errors.join('\n')}`);
        return;
      }

      if (multiple) {
        const combined = [...files, ...acceptedFiles].slice(0, maxFiles);
        onFilesChange(combined);
      } else {
        onFilesChange(acceptedFiles.slice(0, 1));
      }
    },
    [files, onFilesChange, multiple, maxFiles]
  );

  const removeFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    onFilesChange(updated);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
    maxSize: MAX_FILE_SIZE,
    maxFiles: multiple ? maxFiles : 1,
  });

  const hasFiles = files.length > 0;

  return (
    <div>
      {!hasFiles ? (
        /* ── Empty state ── */
        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? 'dropzone--active' : ''}`}
        >
          <input {...getInputProps()} />
          <div className="dropzone__icon">
            <UploadCloud size={28} />
          </div>
          <p className="dropzone__title">
            {isDragActive ? 'Drop your files here' : 'Drag & drop your file here'}
          </p>
          <p className="dropzone__subtitle">
            or <span className="dropzone__browse">browse</span> from your computer
            <br />
            Max {formatFileSize(MAX_FILE_SIZE)} per file
          </p>
        </div>
      ) : (
        /* ── Files preview ── */
        <div className="dropzone dropzone--has-file">
          <div className="dropzone__files-list">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="dropzone__file">
                <div className="dropzone__file-icon">
                  <File size={20} />
                </div>
                <div className="dropzone__file-info">
                  <div className="dropzone__file-name">{file.name}</div>
                  <div className="dropzone__file-meta">
                    {getFileExtension(file.name).toUpperCase()} · {formatFileSize(file.size)}
                  </div>
                </div>
                <button
                  className="dropzone__file-remove"
                  onClick={() => removeFile(index)}
                  title="Remove file"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          {multiple && files.length < maxFiles && (
            <button
              {...getRootProps()}
              className="dropzone__add-more"
            >
              <input {...getInputProps()} />
              <Plus size={16} />
              Add more files ({files.length}/{maxFiles})
            </button>
          )}
        </div>
      )}
    </div>
  );
}
