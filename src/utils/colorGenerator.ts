// HSL to Hex conversion
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// Generate analogous colors (adjacent on color wheel)
function generateAnalogousPalette(baseHue: number): string[] {
  const colors = [];
  for (let i = 0; i < 5; i++) {
    const hue = (baseHue + i * 30) % 360;
    const saturation = 60 + Math.random() * 20; // 60-80%
    const lightness = 50 + Math.random() * 30; // 50-80%
    colors.push(hslToHex(hue, saturation, lightness));
  }
  return colors;
}

// Generate complementary palette
function generateComplementaryPalette(baseHue: number): string[] {
  const complementHue = (baseHue + 180) % 360;
  const colors = [];
  
  // Base color variations
  for (let i = 0; i < 3; i++) {
    const hue = baseHue + i * 15;
    const saturation = 50 + Math.random() * 30;
    const lightness = 40 + Math.random() * 40;
    colors.push(hslToHex(hue, saturation, lightness));
  }
  
  // Complement variations
  for (let i = 0; i < 2; i++) {
    const hue = complementHue + i * 15;
    const saturation = 50 + Math.random() * 30;
    const lightness = 40 + Math.random() * 40;
    colors.push(hslToHex(hue, saturation, lightness));
  }
  
  return colors;
}

// Main palette generator
export function generateHarmoniousPalette(): string[] {
  const baseHue = Math.random() * 360;
  const harmonyType = Math.random() > 0.5 ? 'analogous' : 'complementary';
  
  if (harmonyType === 'analogous') {
    return generateAnalogousPalette(baseHue);
  } else {
    return generateComplementaryPalette(baseHue);
  }
}

// Default nature-friendly palette
export function generateDefaultPalette(): string[] {
  return [
    '#8FBC8F', // Dark Sea Green
    '#98D8C8', // Mint
    '#F7DC6F', // Light Yellow
    '#F8C471', // Peach
    '#BB8FCE'  // Light Purple
  ];
}