import React, { useState } from 'react';
import './PromptInput.css';

export default function PromptInput({ onGenerate, isGenerating, type }) {
  const [prompt, setPrompt] = useState('');
  const [upsample, setUpsample] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt, type);
    }
  };

  return (
    <div className="prompt-editor-card pruna-surface-card">
      <form onSubmit={handleSubmit} className="editor-form">
        
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={`Describe the ${type} you want to generate...`}
          className="editor-textarea"
          disabled={isGenerating}
        />
        
        <div className="editor-settings pruna-surface-subtle">
          <div className="setting-group">
            <label className="setting-label">Thinking</label>
            <div className="select-wrapper">
              <select className="editor-select" defaultValue="medium" disabled={isGenerating}>
                <option value="very_low">Very low</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              className="editor-checkbox" 
              checked={upsample}
              onChange={(e) => setUpsample(e.target.checked)}
              disabled={isGenerating}
            />
            Prompt upsampling
          </label>
        </div>

        <div className="editor-footer pruna-surface-subtle">
          <button type="button" className="pruna-btn-secondary footer-btn" disabled={isGenerating}>
            Advanced
          </button>
          <button 
            type="submit" 
            className="pruna-btn-primary footer-btn"
            disabled={!prompt.trim() || isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </form>
    </div>
  );
}
