import { FC, useState } from 'react';

interface ThemeInputProps {
  onThemeGenerate: (theme: string) => void;
  isGenerating: boolean;
}

const EXAMPLE_THEMES = [
  'sunset', 'ocean', 'forest', 'cyberpunk', 'vintage', 
  'coffee cafe', 'minimalist', 'tropical', 'autumn', 'neon'
];

const ThemeInput: FC<ThemeInputProps> = ({ onThemeGenerate, isGenerating }) => {
  const [theme, setTheme] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (theme.trim() && !isGenerating) {
      onThemeGenerate(theme.trim());
    }
  };

  const handleExampleClick = (exampleTheme: string) => {
    setTheme(exampleTheme);
    onThemeGenerate(exampleTheme);
  };

  return (
    <div className="w-full max-w-2xl space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Enter a theme (e.g., sunset, cyberpunk, coffee cafe...)"
          className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 
                     rounded-lg text-white placeholder-white/70 focus:outline-none 
                     focus:ring-2 focus:ring-white/50 focus:border-white/50"
          maxLength={100}
          disabled={isGenerating}
        />
        <button
          type="submit"
          disabled={!theme.trim() || isGenerating}
          className="px-6 py-3 bg-white/30 hover:bg-white/40 backdrop-blur-sm 
                     border border-white/40 text-white font-medium rounded-lg
                     transition-all duration-200 hover:scale-105 
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'AI Generating...' : 'Generate AI Palette'}
        </button>
      </form>
      
      <div className="text-center">
        <p className="text-white/80 text-sm mb-2">Try these examples:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {EXAMPLE_THEMES.map((exampleTheme) => (
            <button
              key={exampleTheme}
              onClick={() => handleExampleClick(exampleTheme)}
              disabled={isGenerating}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm 
                         border border-white/20 text-white/90 text-sm rounded-full
                         transition-all duration-200 hover:scale-105
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {exampleTheme}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeInput;