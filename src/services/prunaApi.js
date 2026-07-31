export const PRUNA_API_KEY = import.meta.env.VITE_PRUNA_API_KEY;
const API_URL = 'https://api.pruna.ai/v1/predictions';

export async function generateMedia(prompt, type = 'image') {
  const model = type === 'video' ? 'p-video' : 'p-image';
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': PRUNA_API_KEY,
        'Model': model,
        'Try-Sync': 'true'
      },
      body: JSON.stringify({
        input: {
          prompt: prompt,
          // Add default parameters if needed
          ...(type === 'image' && { aspect_ratio: '16:9' })
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Pruna API usually returns output array or object
    // Assuming data.output contains the URL based on Replicate-like responses
    if (data.output && Array.isArray(data.output) && data.output.length > 0) {
      return data.output[0];
    } else if (data.output && typeof data.output === 'string') {
      return data.output;
    }
    
    console.log('API Response:', data);
    throw new Error('Unexpected response format from Pruna API');
    
  } catch (error) {
    console.error('Error generating media:', error);
    throw error;
  }
}
