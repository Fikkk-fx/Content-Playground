import React from 'react';
import { Download, ExternalLink } from 'lucide-react';
import './MediaDisplay.css';

export default function MediaDisplay({ mediaUrl, type, isGenerating }) {
  if (!mediaUrl && !isGenerating) {
    return (
      <div className="media-placeholder glass-panel animate-fade-in">
        <p>Your generated {type} will appear here.</p>
      </div>
    );
  }

  return (
    <div className="media-container glass-panel animate-slide-up">
      {isGenerating ? (
        <div className="generating-skeleton">
          <div className="skeleton-pulse"></div>
          <p className="skeleton-text">AI is creating your {type}...</p>
        </div>
      ) : (
        <div className="media-content">
          {type === 'image' ? (
            <img src={mediaUrl} alt="Generated" className="generated-media" />
          ) : (
            <video src={mediaUrl} controls autoPlay loop className="generated-media" />
          )}
          
          <div className="media-actions">
            <a 
              href={mediaUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-button"
            >
              <ExternalLink size={16} /> Open
            </a>
            <a 
              href={mediaUrl} 
              download={`pruna-${type}-${Date.now()}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button primary"
            >
              <Download size={16} /> Download
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
