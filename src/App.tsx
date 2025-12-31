import { useState, useEffect } from 'react';
import PaletteDisplay from './components/PaletteDisplay';
import ExportButton from './components/ExportButton';
import ThemeInput from './components/ThemeInput';
import { generateHarmoniousPalette, generateDefaultPalette } from './utils/colorGenerator';
import { copyToClipboard } from './utils/clipboardManager';
import { generateThemePalette, checkAPIHealth } from './services/apiService';

function App() {
  const [currentPalette, setCurrentPalette] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<{ colorIndex: number; visible: boolean } | null>(null);
  const [apiAvailable, setApiAvailable] = useState(false);
  const [lastTheme, setLastTheme] = useState<string | null>(null);

  // Initialize with default palette and check API health
  useEffect(() => {
    setCurrentPalette(generateDefaultPalette());
    checkAPIHealth().then(setApiAvailable);
  }, []);

  const handleGeneratePalette = () => {
    setIsGenerating(true);
    setLastTheme(null);
    setTimeout(() => {
      setCurrentPalette(generateHarmoniousPalette());
      setIsGenerating(false);
    }, 300);
  };

  const handleThemeGenerate = async (theme: string) => {
    if (!apiAvailable) {
      // Fallback to random generation if API is not available
      handleGeneratePalette();
      return;
    }

    setIsGenerating(true);
    setLastTheme(theme);
    
    try {
      const response = await generateThemePalette(theme);
      setCurrentPalette(response.colors);
      
      if (response.fallback) {
        console.warn('AI generation failed, using fallback colors');
      }
    } catch (error) {
      console.error('Theme generation failed:', error);
      // Fallback to random generation
      setCurrentPalette(generateHarmoniousPalette());
    } finally {
      setIsGenerating(false);
    }
  };

  const handleColorCopy = async (hexCode: string, index: number) => {
    const success = await copyToClipboard(hexCode);
    
    if (success) {
      setCopyFeedback({ colorIndex: index, visible: true });
      setTimeout(() => {
        setCopyFeedback(null);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 
                    flex flex-col items-center justify-center p-8">
      <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/30 
                      shadow-2xl p-8 max-w-5xl w-full">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Color Palette Picker
        </h1>
        <p className="text-white/80 text-center mb-8">
          {apiAvailable ? 'Generate palettes with AI themes or random colors' : 'Random color generation (AI unavailable)'}
          {lastTheme && <span className="block text-sm mt-1">Current theme: "{lastTheme}"</span>}
        </p>
        
        <div className="flex flex-col items-center space-y-8">
          {apiAvailable && (
            <ThemeInput 
              onThemeGenerate={handleThemeGenerate}
              isGenerating={isGenerating}
            />
          )}
          
          <PaletteDisplay
            colors={currentPalette}
            onColorCopy={handleColorCopy}
            copyFeedback={copyFeedback}
          />
          
          <div className="flex gap-4">
            <button
              onClick={handleGeneratePalette}
              disabled={isGenerating}
              className="bg-white/30 hover:bg-white/40 backdrop-blur-sm border border-white/40
                         text-white font-semibold py-3 px-8 rounded-lg
                         transition-all duration-200 hover:scale-105 disabled:opacity-50"
            >
              {isGenerating ? 'Generating...' : 'Generate Random Palette'}
            </button>
            
            <ExportButton colors={currentPalette} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;