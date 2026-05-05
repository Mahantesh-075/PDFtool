import { Link } from 'react-router-dom';
import { 
  ArrowRight, FileText, Image, Layout, FileSpreadsheet, 
  Lock, Share2, Layers, Zap, ShieldCheck, 
  Search, Eye, Sun, Cpu, Terminal, Archive
} from 'lucide-react';
import './Home.css';

const Home = () => {
  const popularConversions = [
    { id: 'p1', title: 'PDF to Word', source: 'pdf', target: 'docx', icon: <FileText size={20} /> },
    { id: 'p2', title: 'PDF to PowerPoint', source: 'pdf', target: 'pptx', icon: <Layout size={20} /> },
    { id: 'p3', title: 'PDF to Excel', source: 'pdf', target: 'xlsx', icon: <FileSpreadsheet size={20} /> },
    { id: 'p4', title: 'Word to PDF', source: 'docx', target: 'pdf', icon: <FileText size={20} /> },
    { id: 'p5', title: 'PowerPoint to PDF', source: 'pptx', target: 'pdf', icon: <Layout size={20} /> },
    { id: 'p6', title: 'Excel to PDF', source: 'xlsx', target: 'pdf', icon: <FileSpreadsheet size={20} /> },
    { id: 'p7', title: 'PDF to JPG', source: 'pdf', target: 'jpg', icon: <Image size={20} /> },
    { id: 'p8', title: 'JPG to PDF', source: 'jpg', target: 'pdf', icon: <Image size={20} /> },
    { id: 'p9', title: 'HTML to PDF', source: 'html', target: 'pdf', icon: <Terminal size={20} /> },
    { id: 'p10', title: 'PDF to PDF/A', source: 'pdf', target: 'pdfa', icon: <ShieldCheck size={20} /> },
    { id: 'p11', title: 'PDF to Text', source: 'pdf', target: 'txt', icon: <FileText size={20} /> },
    { id: 'p12', title: 'PDF to PNG', source: 'pdf', target: 'png', icon: <Image size={20} /> },
    { id: 'p13', title: 'PNG to JPG', source: 'png', target: 'jpg', icon: <Image size={20} /> },
    { id: 'p14', title: 'PDF to HTML', source: 'pdf', target: 'html', icon: <Terminal size={20} /> },
    { id: 'p15', title: 'Text to PDF', source: 'txt', target: 'pdf', icon: <FileText size={20} /> },
  ];

  const powerFeatures = [
    { id: 'f1', title: 'Batch Conversion', icon: <Layers size={24} /> },
    { id: 'f2', title: 'Merge PDFs', icon: <Layers size={24} /> },
    { id: 'f3', title: 'Compress PDF', icon: <Archive size={24} /> },
    { id: 'f4', title: 'Password Protect', icon: <Lock size={24} /> },
    { id: 'f5', title: 'OCR Extraction', icon: <Search size={24} /> },
    { id: 'f6', title: 'Drag & Drop', icon: <Layout size={24} /> },
    { id: 'f7', title: 'Conversion History', icon: <Eye size={24} /> },
    { id: 'f8', title: 'Dark/Light Mode', icon: <Sun size={24} /> },
    { id: 'f9', title: 'API Access', icon: <Cpu size={24} /> },
    { id: 'f10', title: 'File Preview', icon: <FileText size={24} /> },
  ];

  return (
    <div className="home-page">
      <section className="hero-section">
        <h1 className="hero-title">Convert Any Document. <br /> Instantly.</h1>
        <p className="hero-subtitle">
          Transform PDFs, Word, Excel, PowerPoint, and Images with zero friction.
          Built for speed, engineered for precision.
        </p>
        <div className="hero-actions">
          <Link to="/convert" className="btn btn-primary hero-cta">
            Start Converting
          </Link>
          <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer" className="btn btn-outline hero-cta">
            View API Docs
          </a>
        </div>

        <div className="hero-floating-icons">
          <FileText size={24} />
          <FileSpreadsheet size={24} />
          <Layout size={24} />
          <Image size={24} />
          <Share2 size={24} />
        </div>
      </section>

      <section className="conversions-section">
        <h2 className="section-title">Popular Conversions</h2>
        <div className="conversion-grid">
          {popularConversions.map((conv) => (
            <Link to={`/convert/${conv.source}/${conv.target}`} key={conv.id} className="conversion-card">
              <div className="conversion-icons">
                <span className="icon-source">{conv.icon}</span>
                <ArrowRight size={14} className="icon-arrow" />
                <span className="icon-target">{conv.icon}</span>
              </div>
              <h3 className="conversion-card-title">{conv.title}</h3>
              <p className="conversion-card-desc">
                {conv.title.includes('to')
                  ? `Easily convert your ${conv.title.split(' to ')[0]} files into high-quality ${conv.title.split(' to ')[1]} format.`
                  : `Quickly convert your files with precision.`
                }
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="power-features-section">
        <h2 className="section-title">Power Features</h2>
        <div className="power-grid">
          {powerFeatures.map((feature) => (
            <div key={feature.id} className="power-card">
              <div className="power-icon">{feature.icon}</div>
              <h3 className="power-title">{feature.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
