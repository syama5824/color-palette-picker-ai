interface PaletteExportData {
  palette: {
    colors: string[];
    timestamp: string;
  };
  metadata: {
    generator: string;
    version: string;
  };
}

export function exportPalette(colors: string[]): void {
  const exportData: PaletteExportData = {
    palette: {
      colors,
      timestamp: new Date().toISOString(),
    },
    metadata: {
      generator: 'Color Palette Picker',
      version: '1.0.0',
    },
  };

  const jsonString = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const filename = `palette-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}