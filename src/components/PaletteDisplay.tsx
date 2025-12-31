import { FC } from 'react';
import ColorBlock from './ColorBlock';
import { PaletteDisplayProps } from '../types';

const PaletteDisplay: FC<PaletteDisplayProps> = ({ 
  colors, 
  onColorCopy, 
  copyFeedback 
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-4xl">
      {colors.map((color, index) => (
        <ColorBlock
          key={`${color}-${index}`}
          hexCode={color}
          index={index}
          onCopy={onColorCopy}
          showCopyFeedback={copyFeedback?.colorIndex === index && copyFeedback.visible}
        />
      ))}
    </div>
  );
};

export default PaletteDisplay;