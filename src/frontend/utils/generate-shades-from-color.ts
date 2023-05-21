export function generateShades(color: string) {
  const parsedColor = parseColor(color);
  if (!parsedColor) {
    return;
  }
  const { r, g, b } = parsedColor;
  const shades = [];

  // Generate shades from white to the specified color
  for (let i = 0; i <= 8; i++) {
    const shade = {
      r: Math.floor(r + (255 - r) * (i / 8)),
      g: Math.floor(g + (255 - g) * (i / 8)),
      b: Math.floor(b + (255 - b) * (i / 8)),
    };
    shades.push(shade);
  }

  // Generate shades from the specified color to black
  for (let i = 1; i <= 8; i++) {
    const shade = {
      r: Math.floor(r * (1 - i / 8)),
      g: Math.floor(g * (1 - i / 8)),
      b: Math.floor(b * (1 - i / 8)),
    };
    shades.push(shade);
  }

  return shades;
}
export function parseColor(color: string) {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'parse-color-tag');
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d');
  if (ctx === null) {
    return;
  }
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data as unknown as number[];
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);

  return { r: r ?? 0, g: g ?? 0, b: b ?? 0, a: a ?? 1 };
}
