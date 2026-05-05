import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle, Download, RefreshCw, 
  FileText, Layout, FileSpreadsheet, Image as ImageIcon, 
  Terminal, ShieldCheck, Archive, Zap, MoreHorizontal,
  X, AlertCircle
} from 'lucide-react';
import UploadZone from '../../components/converter/UploadZone/UploadZone';
import { convertFile, batchConvert, mergePDFs, triggerDownload, downloadFile as downloadFileService } from '../../services/api';
import { saveToHistory, generateId } from '../../utils/helpers';
import './Converter.css';

const Converter = () => {
  const { source, target } = useParams();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('single');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [sourceFormat, setSourceFormat] = useState(source || 'pdf');
  const [targetFormat, setTargetFormat] = useState(target || 'docx');
  const [isProcessing, setIsProcessing] = useState(false);
  const [queue, setQueue] = useState([]);

  // Sync state with URL params
  useEffect(() => {
    if (source) setSourceFormat(source);
    if (target) setTargetFormat(target);
  }, [source, target]);

  /* Only backend-supported conversion pathways */
  const conversionOptions = [
    { id: 'c1', title: 'PDF to Word', source: 'pdf', target: 'docx', icon: <FileText size={24} />, desc: 'Easily convert your PDF files into easy to edit DOC and DOCX documents. The converted WORD document is almost 100% accurate.' },
    { id: 'c2', title: 'PDF to PowerPoint', source: 'pdf', target: 'pptx', icon: <Layout size={24} />, desc: 'Turn your PDF files into easy to edit PPT and PPTX slideshows.' },
    { id: 'c3', title: 'PDF to Excel', source: 'pdf', target: 'xlsx', icon: <FileSpreadsheet size={24} />, desc: 'Pull data straight from PDFs into Excel spreadsheets in a few short seconds.' },
    { id: 'c4', title: 'Word to PDF', source: 'docx', target: 'pdf', icon: <FileText size={24} />, desc: 'Make DOC and DOCX files easy to read by converting them to PDF.' },
    { id: 'c5', title: 'PowerPoint to PDF', source: 'pptx', target: 'pdf', icon: <Layout size={24} />, desc: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.' },
    { id: 'c6', title: 'Excel to PDF', source: 'xlsx', target: 'pdf', icon: <FileSpreadsheet size={24} />, desc: 'Make EXCEL spreadsheets easy to read by converting them to PDF.' },
    { id: 'c7', title: 'PDF to JPG', source: 'pdf', target: 'jpg', icon: <ImageIcon size={24} />, desc: 'Convert each PDF page into a JPG or extract all images contained in a PDF.' },
    { id: 'c8', title: 'JPG to PDF', source: 'jpg', target: 'pdf', icon: <ImageIcon size={24} />, desc: 'Convert JPG images to PDF in seconds. Easily adjust orientation and margins.' },
    { id: 'c9', title: 'PDF to Text', source: 'pdf', target: 'txt', icon: <Terminal size={24} />, desc: 'Extract all text content from PDF documents into a plain text file.' },
    { id: 'c10', title: 'PDF to HTML', source: 'pdf', target: 'html', icon: <Terminal size={24} />, desc: 'Convert webpages in PDF to HTML format for easy web publishing.' },
    { id: 'c11', title: 'PDF to PNG', source: 'pdf', target: 'png', icon: <ImageIcon size={24} />, desc: 'Convert PDF pages to high-quality PNG images with transparent backgrounds.' },
    { id: 'c12', title: 'PNG to JPG', source: 'png', target: 'jpg', icon: <ImageIcon size={24} />, desc: 'Convert PNG images to compressed JPG format for smaller file sizes.' },
    { id: 'c13', title: 'Text to PDF', source: 'txt', target: 'pdf', icon: <FileText size={24} />, desc: 'Convert plain text files into professionally formatted PDF documents.' },
    { id: 'c14', title: 'PNG to PDF', source: 'png', target: 'pdf', icon: <ImageIcon size={24} />, desc: 'Convert PNG images into portable PDF documents.' },
    { id: 'c15', title: 'JPG to PNG', source: 'jpg', target: 'png', icon: <ImageIcon size={24} />, desc: 'Convert JPG images to lossless PNG format.' },
  ];

  const handleOptionClick = (option) => {
    setSourceFormat(option.source);
    setTargetFormat(option.target);
    navigate(`/convert/${option.source}/${option.target}`);
  };

  const startConversion = async () => {
    if (selectedFiles.length === 0) return;
    
    setIsProcessing(true);
    const newItems = selectedFiles.map(file => ({
      id: generateId(),
      name: file.name,
      source: sourceFormat.toUpperCase(),
      target: targetFormat.toUpperCase(),
      status: 'converting',
      timestamp: new Date().toISOString()
    }));
    
    setQueue(prev => [...newItems, ...prev]);

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const queueItem = newItems[i];

      try {
        let result;
        if (activeTab === 'merge') {
          result = await mergePDFs(selectedFiles);
          updateQueueStatus(queueItem.id, 'complete', result.file_id, result.download_url);
          break;
        } else if (activeTab === 'batch') {
          result = await batchConvert(selectedFiles, targetFormat);
          if (result.results) {
            result.results.forEach((res, idx) => {
              if (idx < newItems.length) {
                updateQueueStatus(
                  newItems[idx].id,
                  res.success ? 'complete' : 'failed',
                  res.file_id || null,
                  res.download_url || null,
                  res.error || null
                );
              }
            });
          }
          break;
        } else {
          result = await convertFile(file, sourceFormat, targetFormat);
          updateQueueStatus(queueItem.id, 'complete', result.file_id, result.download_url);
        }
      } catch (error) {
        updateQueueStatus(queueItem.id, 'failed', null, null, error.message);
      }
    }

    setIsProcessing(false);
    setSelectedFiles([]);
  };

  const updateQueueStatus = (id, status, fileId = null, downloadUrl = null, error = null) => {
    setQueue(prev => prev.map(item => 
      item.id === id ? { ...item, status, fileId, downloadUrl, error } : item
    ));
    
    if (status === 'complete') {
      saveToHistory({ id, status, fileId, downloadUrl });
    }
  };

  const handleDownload = async (item) => {
    if (item.fileId) {
      try {
        const response = await downloadFileService(item.fileId);
        triggerDownload(response.data, `pdftool_${item.name.split('.')[0]}.${item.target.toLowerCase()}`);
      } catch (err) {
        alert('Download failed: ' + err.message);
      }
    }
  };

  return (
    <div className="converter-page">
      <div className="converter-tabs">
        <button 
          className={`tab-btn ${activeTab === 'single' ? 'active' : ''}`}
          onClick={() => setActiveTab('single')}
        >
          Single File
        </button>
        <button 
          className={`tab-btn ${activeTab === 'batch' ? 'active' : ''}`}
          onClick={() => setActiveTab('batch')}
        >
          Batch Convert
        </button>
        <button 
          className={`tab-btn ${activeTab === 'merge' ? 'active' : ''}`}
          onClick={() => setActiveTab('merge')}
        >
          Merge PDFs
        </button>
      </div>

      <div className="converter-workspace">
        <div className="workspace-header">
          <h1 className="workspace-title">
            {activeTab === 'merge' ? 'Merge Multiple PDFs' : `Convert ${sourceFormat.toUpperCase()} to ${targetFormat.toUpperCase()}`}
          </h1>
          <p className="workspace-subtitle">
            Upload your files and we'll handle the rest.
          </p>
        </div>

        <UploadZone 
          files={selectedFiles}
          onFilesChange={setSelectedFiles}
          multiple={activeTab !== 'single'}
          maxFiles={activeTab === 'batch' ? 10 : 20}
        />

        {selectedFiles.length > 0 && (
          <div className="workspace-actions">
            <button 
              className="btn btn-primary btn-lg" 
              onClick={startConversion}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <RefreshCw size={18} className="animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <Zap size={18} /> {activeTab === 'merge' ? 'Merge Files' : 'Start Conversion'}
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="conversion-options-grid">
        {conversionOptions.map(option => (
          <div 
            key={option.id} 
            className={`option-card ${sourceFormat === option.source && targetFormat === option.target ? 'active' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            <div className="option-icon">{option.icon}</div>
            <div className="option-content">
              <h3 className="option-title">{option.title}</h3>
              <p className="option-desc">{option.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="queue-section">
        <h2 className="queue-title">Conversion Queue</h2>
        <div className="queue-table-container">
          <table className="queue-table">
            <thead>
              <tr>
                <th>FILE NAME</th>
                <th>SOURCE</th>
                <th>TARGET</th>
                <th>STATUS</th>
                <th className="text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {queue.length === 0 ? (
                <tr>
                  <td colSpan="5" className="queue-empty">
                    No active conversions. Upload a file to get started.
                  </td>
                </tr>
              ) : (
                queue.map(item => (
                  <tr key={item.id}>
                    <td className="file-name">{item.name}</td>
                    <td className="format-cell">{item.source}</td>
                    <td className="format-cell">{item.target}</td>
                    <td>
                      <span className={`status-badge ${item.status}`}>
                        {item.status === 'converting' && (
                          <>
                            <RefreshCw size={12} className="animate-spin" /> Converting...
                          </>
                        )}
                        {item.status === 'complete' && <><CheckCircle size={12} /> Complete</>}
                        {item.status === 'failed' && <><AlertCircle size={12} /> Failed</>}
                      </span>
                    </td>
                    <td className="text-right">
                      {item.status === 'complete' ? (
                        <button className="btn-download" onClick={() => handleDownload(item)}>
                          <Download size={14} /> Download
                        </button>
                      ) : (
                        item.status === 'failed' ? (
                          <span className="error-hint" title={item.error || 'Conversion failed'}>
                            <AlertCircle size={14} />
                          </span>
                        ) : (
                          <MoreHorizontal size={14} className="action-more" />
                        )
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="footer-logo-center">
        <div className="pdf-tool-logo">
          <span className="logo-pdf">PDF</span>
          <span className="logo-diamond"></span>
          <span className="logo-tool">tool</span>
        </div>
      </div>
    </div>
  );
};

export default Converter;
