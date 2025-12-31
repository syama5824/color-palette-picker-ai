import { FC } from 'react';
import { ColorBlockProps } from '../types';

const ColorBlock: FC<ColorBlockProps> = ({ 
  hexCode, 
  index, 
  onCopy, 
  showCopyFeedback 
}) => {
  const handleClick = () => {
    onCopy(hexCode, index);
  };

  return (
    <div
      className="relative bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 
                 hover:scale-105 transition-transform duration-200 cursor-pointer 
                 shadow-lg hover:shadow-xl h-32 flex flex-col justify-end p-4"
      style={{ backgroundColor: hexCode }}
      onClick={handleClick}
    >
      <div className="bg-black/50 backdrop-blur-sm rounded px-2 py-1 text-white text-sm font-mono">
        {hexCode}
      </div>
      
      {showCopyFeedback && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
            Copied!
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorBlock;