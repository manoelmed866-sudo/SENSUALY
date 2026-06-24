// Dados centrais da marca. Edite aqui e o site todo atualiza.

export const BRAND = {
  nome: 'Sensually',
  tagline: 'Moda que combina com você',
  descricao:
    'Roupas, acessórios, fitness e presentes. Na loja física e por encomenda.',
};

// WhatsApp de venda (só números, com DDI 55).
export const WHATSAPP = {
  numero: '5593991529279',
  // Mensagem que já vem preenchida quando o cliente abre o WhatsApp.
  mensagem: 'Oi! Vim pelo site da Sensually e quero saber mais 💛',
};

export function whatsappLink(msg = WHATSAPP.mensagem) {
  return `https://wa.me/${WHATSAPP.numero}?text=${encodeURIComponent(msg)}`;
}

// Perfis no Instagram (as 3 frentes da marca).
export const INSTAGRAM = {
  principal: { handle: '@oficialsensually', url: 'https://instagram.com/oficialsensually' },
  presentes: { handle: '@sensually_presentes', url: 'https://instagram.com/sensually_presentes' },
  sport: { handle: '@sensuallysport', url: 'https://instagram.com/sensuallysport' },
};

// Vitrine de produtos da home (estilo "lançamentos / queridinhos" de e-commerce).
// PLACEHOLDER: troque foto, nome e preços pelos produtos reais.
// 1. Coloque a foto em site/astro-site/public/produtos/ (ex: vestido-01.jpg)
// 2. Troque o campo `foto` abaixo pelo caminho dela (ex: '/produtos/vestido-01.jpg')
// 3. Ajuste nome, preco, precoDe (preço cheio, se houver desconto) e ultimaPeca
export type Produto = {
  nome: string;
  foto: string;
  preco: number;
  precoDe?: number;
  ultimaPeca?: boolean;
};

export const PRODUTOS: Produto[] = [
  { nome: 'Vestido Midi Denim', foto: '/produtos/_placeholder.svg', preco: 189.9, precoDe: 229.9 },
  { nome: 'Conjunto Fitness Performance', foto: '/produtos/_placeholder.svg', preco: 149.9 },
  { nome: 'Bolsa Tote Couro', foto: '/produtos/_placeholder.svg', preco: 219.9, precoDe: 259.9, ultimaPeca: true },
  { nome: 'Calça Wide Leg', foto: '/produtos/_placeholder.svg', preco: 169.9 },
  { nome: 'Óculos de Sol Redondo', foto: '/produtos/_placeholder.svg', preco: 89.9, precoDe: 119.9 },
  { nome: 'Blusa Cropped Canelada', foto: '/produtos/_placeholder.svg', preco: 79.9 },
];

export function descontoPercentual(p: Produto) {
  if (!p.precoDe) return null;
  return Math.round(((p.precoDe - p.preco) / p.precoDe) * 100);
}

export function formatoReais(valor: number) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// As 3 frentes mostradas na home.
export const FRENTES = [
  {
    nome: 'Sensually',
    etiqueta: 'Principal',
    texto: 'Roupas, vestidos, denim e acessórios pro dia a dia com estilo.',
    instagram: INSTAGRAM.principal,
  },
  {
    nome: 'Presentes',
    etiqueta: 'Para presentear',
    texto: 'Perfumes, relógios, óculos, bolsas e a peça certa pra cada ocasião.',
    instagram: INSTAGRAM.presentes,
  },
  {
    nome: 'Sport',
    etiqueta: 'Fitness',
    texto: 'Moda academia e fitness pra treinar com conforto e atitude.',
    instagram: INSTAGRAM.sport,
  },
];
