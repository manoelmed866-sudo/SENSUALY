// Remove o fundo sólido (pêssego) das logos e gera PNG com transparência real.
// Uso: node scripts/remover-fundo-logo.mjs <entrada.png> <saida.png>
import sharp from 'sharp';

const [, , entrada, saida] = process.argv;
if (!entrada || !saida) {
  console.error('Uso: node remover-fundo-logo.mjs <entrada.png> <saida.png>');
  process.exit(1);
}

const img = sharp(entrada);
const { width, height } = await img.metadata();
const { data, info } = await img.raw().ensureAlpha().toBuffer({ resolveWithObject: true });

// Amostra o canto superior-esquerdo como referência da cor de fundo.
const bgR = data[0], bgG = data[1], bgB = data[2];
const limite = 28; // distância de cor tolerada como "fundo"

for (let i = 0; i < data.length; i += 4) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const dist = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);
  if (dist < limite) {
    data[i + 3] = 0; // transparente
  } else if (dist < limite * 2.2) {
    // borda suave: transição gradual em vez de corte seco (evita serrilhado)
    const t = (dist - limite) / (limite * 1.2);
    data[i + 3] = Math.round(255 * Math.min(1, Math.max(0, t)));
  }
}

await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png()
  .toFile(saida);

console.log(`OK: ${saida} (fundo removido, cor base ${bgR},${bgG},${bgB})`);
