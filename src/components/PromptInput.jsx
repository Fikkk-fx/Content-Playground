import React, { useState } from 'react';
import { Send, Image as ImageIcon, Video, Loader2 } from 'lucide-react';
import './PromptInput.css';

export default function PromptInput({ onGenerate, isGenerating, type, setType }) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt, type);
    }
  };

  return (
    <div className="prompt-container glass-panel animate-slide-up">
      <div className="type-toggle">
        <button 
          className={`toggle-btn ${type === 'image' ? 'active' : ''}`}
          onClick={() => setType('image')}
          disabled={isGenerating}
        >
          <ImageIcon size={18} /> Image
        </button>
        <button 
          className={`toggle-btn ${type === 'video' ? 'active' : ''}`}
          onClick={() => setType('video')}
          disabled={isGenerating}
        >
          <Video size={18} /> Video
        </button>
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={`Describe the ${type} you want to generate...`}
          className="prompt-textarea"
          rows={3}
          disabled={isGenerating}
        />
        <div className="form-footer">
          <p className="model-info">
            Using model: <span className="highlight">p-{type}</span>
          </p>
          <button 
            type="submit" 
            className="glass-button primary generate-btn"
            disabled={!prompt.trim() || isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 size={18} className="spinner" />
                Generating...
              </>
            ) : (
              <>
                <Send size={18} />
                Generate {type === 'image' ? 'Image' : 'Video'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
