import { FC } from 'react';
import { exportPalette } from '../utils/paletteExporter';

interface ExportButtonProps {
  colors: string[];
}

const ExportButton: FC<ExportButtonProps> = ({ colors }) => {
  const handleExport = () => {
    exportPalette(colors);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30
                 text-white font-medium py-2 px-6 rounded-lg
                 transition-all duration-200 hover:scale-105"
    >
      Export JSON
    </button>
  );
};

export default ExportButton;