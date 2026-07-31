export const PRUNA_API_KEY = import.meta.env.VITE_PRUNA_API_KEY;
const API_URL = 'https://api.pruna.ai/v1/predictions';

export async function generateMedia(prompt, type = 'image') {
  if (!PRUNA_API_KEY) {
    throw new Error('API Key is missing. Please check your .env file.');
  }

  // Using p-image-ideogram for images, p-video for videos
  const modelId = type === 'image' ? 'p-image-ideogram' : 'p-video';
  
  const payload = {
    model: modelId,
    prompt: prompt
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': PRUNA_API_KEY,
        'Try-Sync': 'true' // Request synchronous generation for faster response
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    
    // In synchronous mode, output should be in 'data' or similar field. 
    // Handling standard Pruna response structures.
    if (data.status === 'succeeded' || data.data) {
      const output = data.output || data.data;
      if (Array.isArray(output) && output.length > 0) {
        return output[0].url || output[0];
      }
      if (typeof output === 'string') {
        return output;
      }
      if (output && output.url) {
        return output.url;
      }
    }
    
    // If it's a polling job (async)
    if (data.id && data.status === 'starting' || data.status === 'processing') {
      return await pollJobStatus(data.id);
    }
    
    throw new Error('Unexpected response format from Pruna API.');

  } catch (error) {
    console.error('Error generating media:', error);
    throw error;
  }
}

async function pollJobStatus(jobId, maxRetries = 30) {
  const pollUrl = `${API_URL}/${jobId}`;
  
  for (let i = 0; i < maxRetries; i++) {
    await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2s
    
    const response = await fetch(pollUrl, {
      method: 'GET',
      headers: {
        'apikey': PRUNA_API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error(`Polling failed: ${response.status}`);
    }
    
    const data = await response.json();
    if (data.status === 'succeeded') {
      const output = data.output || data.data;
      if (Array.isArray(output) && output.length > 0) {
        return output[0].url || output[0];
      }
      return typeof output === 'string' ? output : (output?.url || null);
    } else if (data.status === 'failed') {
      throw new Error('Generation failed on the server.');
    }
    // else keep polling
  }
  
  throw new Error('Polling timed out.');
}
