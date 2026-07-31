import React from 'react';
import { Settings2 } from 'lucide-react';
import './MediaDisplay.css';

export default function MediaDisplay({ mediaUrl, type, isGenerating }) {
  return (
    <div className="output-card pruna-surface-subtle">
      <div className="output-header">
        <div className="output-header-left">
          <span className="output-title">Output</span>
          <button className="settings-btn" title="Settings">
            <Settings2 size={14} />
          </button>
        </div>
        <span className="status-badge">
          {isGenerating ? 'Generating...' : (mediaUrl ? 'Completed' : 'Awaiting prompt...')}
        </span>
      </div>
      
      <div className="output-body">
        <div className="output-canvas">
          {!mediaUrl && !isGenerating && (
            <div className="placeholder-content">
              <div className="placeholder-box animate-pulse"></div>
            </div>
          )}
          
          {isGenerating && (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <span>Processing Request</span>
            </div>
          )}
          
          {mediaUrl && !isGenerating && (
            <div className="media-wrapper">
              {type === 'image' ? (
                <img src={mediaUrl} alt="Generated output" className="result-media" />
              ) : (
                <video src={mediaUrl} controls autoPlay loop className="result-media" />
              )}
              
              <div className="media-overlay-actions">
                <a href={mediaUrl} target="_blank" rel="noopener noreferrer" className="pruna-btn-secondary text-xs">
                  Open Original
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
