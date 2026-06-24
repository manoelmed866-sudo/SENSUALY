// Corta o espaço transparente em excesso ao redor da arte real da logo,
// deixando uma margem pequena e uniforme. Uso:
// node cortar-logo.mjs <entrada.png> <saida.png> [margemPercentual=6]
import sharp from 'sharp';

const [, , entrada, saida, margemArg] = process.argv;
const margemPct = Number(margemArg ?? 6) / 100;

const img = sharp(entrada);
const { data, info } = await img.raw().ensureAlpha().toBuffer({ resolveWithObject: true });

let minX = info.width, minY = info.height, maxX = 0, maxY = 0;
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const a = data[(y * info.width + x) * 4 + 3];
    if (a > 40) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const contentW = maxX - minX;
const contentH = maxY - minY;
const margemX = Math.round(contentW * margemPct);
const margemY = Math.round(contentH * margemPct);

const left = Math.max(0, minX - margemX);
const top = Math.max(0, minY - margemY);
const width = Math.min(info.width - left, contentW + margemX * 2);
const height = Math.min(info.height - top, contentH + margemY * 2);

await sharp(entrada).extract({ left, top, width, height }).png().toFile(saida);

console.log(`OK: ${saida} — recorte ${width}x${height} (de ${info.width}x${info.height})`);
