const API_BASE_URL = 'http://localhost:3001/api';

export interface ThemePaletteResponse {
  success: boolean;
  colors: string[];
  theme: string;
  error?: string;
  fallback?: boolean;
}

export async function generateThemePalette(theme: string): Promise<ThemePaletteResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-theme-palette`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ theme }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export async function checkAPIHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
}