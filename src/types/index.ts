export interface ColorPalette {
  id: string;
  colors: string[];
  createdAt: Date;
}

export interface ColorBlockProps {
  hexCode: string;
  index: number;
  onCopy: (hexCode: string, index: number) => void;
  showCopyFeedback: boolean;
}

export interface PaletteDisplayProps {
  colors: string[];
  onColorCopy: (hexCode: string, index: number) => void;
  copyFeedback: { colorIndex: number; visible: boolean } | null;
}