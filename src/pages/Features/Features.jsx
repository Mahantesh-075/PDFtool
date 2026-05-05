import { Link } from 'react-router-dom';
import { 
  FileText, Layout, FileSpreadsheet, Image as ImageIcon, 
  Terminal, ShieldCheck, Archive, Zap,
} from 'lucide-react';
import './Features.css';

const Features = () => {
  const allFeatures = [
    { id: 'c1', title: 'PDF to Word', icon: <FileText size={24} />, desc: 'Easily convert your PDF files into easy to edit DOC and DOCX documents. The converted WORD document is almost 100% accurate.' },
    { id: 'c2', title: 'PDF to PowerPoint', icon: <Layout size={24} />, desc: 'Turn your PDF files into easy to edit PPT and PPTX slideshows.' },
    { id: 'c3', title: 'PDF to Excel', icon: <FileSpreadsheet size={24} />, desc: 'Pull data straight from PDFs into Excel spreadsheets in a few short seconds.' },
    { id: 'c4', title: 'Word to PDF', icon: <FileText size={24} />, desc: 'Make DOC and DOCX files easy to read by converting them to PDF.' },
    { id: 'c5', title: 'PowerPoint to PDF', icon: <Layout size={24} />, desc: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.' },
    { id: 'c6', title: 'Excel to PDF', icon: <FileSpreadsheet size={24} />, desc: 'Make EXCEL spreadsheets easy to read by converting them to PDF.' },
    { id: 'c7', title: 'PDF to JPG', icon: <ImageIcon size={24} />, desc: 'Convert each PDF page into a JPG or extract all images contained in a PDF.' },
    { id: 'c8', title: 'JPG to PDF', icon: <ImageIcon size={24} />, desc: 'Convert JPG images to PDF in seconds. Easily adjust orientation and margins.' },
    { id: 'c9', title: 'PDF to Text', icon: <Terminal size={24} />, desc: 'Extract all text content from PDF documents into a plain text file.' },
    { id: 'c10', title: 'PDF to HTML', icon: <Terminal size={24} />, desc: 'Convert PDF documents to HTML format for easy web publishing and sharing.' },
    { id: 'c11', title: 'PDF to PNG', icon: <ImageIcon size={24} />, desc: 'Convert PDF pages to high-quality PNG images with transparent backgrounds.' },
    { id: 'c12', title: 'PNG to JPG', icon: <ImageIcon size={24} />, desc: 'Convert PNG images to compressed JPG format for smaller file sizes.' },
    { id: 'c13', title: 'Text to PDF', icon: <FileText size={24} />, desc: 'Convert plain text files into professionally formatted PDF documents.' },
    { id: 'c14', title: 'PDF Compression', icon: <Archive size={24} />, desc: 'Reduce the file size of your PDFs without losing quality for easier sharing and storage.' },
    { id: 'c15', title: 'PNG to PDF', icon: <ImageIcon size={24} />, desc: 'Convert PNG images into portable PDF documents quickly and easily.' },
  ];

  return (
    <div className="features-page">
      <div className="features-header">
        <h1 className="features-title">Power Features</h1>
        <p className="features-subtitle">
          Everything you need for professional document management
        </p>
      </div>

      <div className="features-grid">
        {allFeatures.map((feature) => (
          <div key={feature.id} className="feature-card">
            <div className="feature-icon">
              {feature.icon}
            </div>
            <h2 className="feature-card-title">{feature.title}</h2>
            <p className="feature-card-desc">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="features-cta">
        <h2 className="cta-title">Ready to supercharge your workflow?</h2>
        <Link to="/convert" className="btn btn-primary cta-btn">
          Start Converting for Free
        </Link>
        <p className="cta-note">No signup required</p>
      </div>
    </div>
  );
};

export default Features;
