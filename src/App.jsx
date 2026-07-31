import React, { useState } from 'react';
import PromptInput from './components/PromptInput';
import MediaDisplay from './components/MediaDisplay';
import { generateMedia } from './services/prunaApi';
import { Sparkles, ChevronDown } from 'lucide-react';
import './App.css';

function App() {
  const [type, setType] = useState('image'); // 'image' or 'video'
  const [isGenerating, setIsGenerating] = useState(false);
  const [mediaUrl, setMediaUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async (prompt, selectedType) => {
    setIsGenerating(true);
    setError(null);
    setMediaUrl(null);

    try {
      const url = await generateMedia(prompt, selectedType);
      setMediaUrl(url);
    } catch (err) {
      setError(err.message || 'An error occurred while generating media.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setMediaUrl(null);
    setError(null);
  };

  return (
    <div className="app-container">
      <aside className="app-sidebar">
        <div className="sidebar-header">
          <Sparkles size={24} className="text-white" />
          <div className="brand-info">
            <span className="brand-subtitle">Pruna</span>
            <span className="brand-title">Playground</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section-title">
            Performance Models <ChevronDown size={14} className="text-zinc-500" />
          </div>
          <ul className="nav-list">
            <li>
              <button 
                className={`sidebar-nav-link w-full text-left border-0 ${type === 'image' ? 'active' : ''}`}
                onClick={() => handleTypeChange('image')}
              >
                P-Image
              </button>
            </li>
            <li><span className="sidebar-nav-link text-zinc-500 cursor-not-allowed">P-Image-Ideogram</span></li>
            <li><span className="sidebar-nav-link text-zinc-500 cursor-not-allowed">P-Image-Edit</span></li>
            <li><span className="sidebar-nav-link text-zinc-500 cursor-not-allowed">P-Image-Upscale</span></li>
            <li>
              <button 
                className={`sidebar-nav-link w-full text-left border-0 ${type === 'video' ? 'active' : ''}`}
                onClick={() => handleTypeChange('video')}
              >
                P-Video
              </button>
            </li>
            <li><span className="sidebar-nav-link text-zinc-500 cursor-not-allowed">P-Video-Avatar</span></li>
          </ul>
        </nav>
      </aside>

      <main className="app-main">
        <div className="main-container">
          
          <div className="header-card pruna-surface-subtle">
            <div className="badge">
              text-to-{type}
            </div>
            <div>
              <h1 className="model-title">P-{type === 'image' ? 'Image' : 'Video'}</h1>
              <p className="model-desc">
                Pruna performance model for ultra-fast {type} generation with optimal speed, price, and quality.
              </p>
            </div>
            
            <div className="metrics-grid">
              <div className="metric-col">
                <span className="metric-label">Inference</span>
                <span className="metric-val text-white">from {type === 'image' ? '0.4s' : '2.5s'}</span>
                <span className="metric-sub">Up to {type === 'image' ? '1.3s' : '5s'} on High</span>
              </div>
              <div className="metric-col">
                <span className="metric-label">Per Run</span>
                <span className="metric-val" style={{color: 'var(--pruna-green)'}}>from $0.003</span>
                <span className="metric-sub">Varies by mode</span>
              </div>
              <div className="metric-col">
                <span className="metric-label">Output</span>
                <span className="metric-val text-zinc-200">{type === 'image' ? '1K-2K' : '720p-1080p'}</span>
              </div>
            </div>

            <ul className="feature-list">
              <li><span className="feature-check">✓</span> <span>Ultra fast inference speeds tailored for production.</span></li>
              <li><span className="feature-check">✓</span> <span>Structured parameters for layout and style control.</span></li>
              <li><span className="feature-check">✓</span> <span>Prompt upsampling and various aspect ratios supported.</span></li>
            </ul>

            <div className="header-actions">
              <a href="https://docs.api.pruna.ai" target="_blank" rel="noopener noreferrer" className="pruna-btn-secondary">Learn more</a>
              <a href="https://dashboard.pruna.ai" target="_blank" rel="noopener noreferrer" className="pruna-btn-primary">Sign up</a>
            </div>
          </div>

          <div className="editor-grid">
            <div className="editor-left">
              <PromptInput 
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                type={type}
              />
              {error && (
                <div style={{color: '#ef4444', marginTop: '1rem', fontSize: '0.875rem', padding: '0.5rem', border: '1px solid #ef4444', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)'}}>
                  {error}
                </div>
              )}
            </div>
            <div className="editor-right">
              <MediaDisplay 
                mediaUrl={mediaUrl}
                type={type}
                isGenerating={isGenerating}
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
