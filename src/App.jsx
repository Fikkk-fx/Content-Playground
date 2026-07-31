import React, { useState } from 'react';
import PromptInput from './components/PromptInput';
import MediaDisplay from './components/MediaDisplay';
import { generateMedia } from './services/prunaApi';
import { Sparkles, AlertCircle } from 'lucide-react';
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

  // When type changes, clear previous results
  const handleTypeChange = (newType) => {
    setType(newType);
    setMediaUrl(null);
    setError(null);
  };

  return (
    <div className="app-layout">
      <header className="app-header glass-panel">
        <div className="logo">
          <Sparkles className="logo-icon" size={28} />
          <h1>Pruna<span className="accent">AI</span> Studio</h1>
        </div>
        <nav className="header-nav">
          <a href="https://docs.api.pruna.ai/" target="_blank" rel="noopener noreferrer">API Docs</a>
        </nav>
      </header>

      <main className="app-main">
        <div className="hero-section text-center animate-slide-up">
          <h2 className="hero-title">Create stunning {type}s with AI</h2>
          <p className="hero-subtitle">
            Leverage Pruna AI's high-performance generative models to turn your imagination into reality.
          </p>
        </div>

        <div className="content-grid">
          <div className="sidebar">
            <PromptInput 
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              type={type}
              setType={handleTypeChange}
            />
            
            {error && (
              <div className="error-panel glass-panel animate-fade-in">
                <AlertCircle size={20} className="error-icon" />
                <p>{error}</p>
              </div>
            )}
          </div>

          <div className="main-display">
            <MediaDisplay 
              mediaUrl={mediaUrl}
              type={type}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>Powered by <a href="https://pruna.ai" target="_blank" rel="noopener noreferrer">Pruna AI</a></p>
      </footer>
    </div>
  );
}

export default App;
