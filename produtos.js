// Catálogo centralizado: ids, nomes, preços e categorias.
// Mantém compatibilidade com addCarrinho(id) já existente nos HTMLs.

window.produtos = [
  // Pizzas salgadas
  { id: 1, nome: "Calabresa Especial", preco: 54.90, categoria: "salgadas", img: "img/produtos/pizza-calabresa.png" },
  { id: 2, nome: "Frango com Catupiry", preco: 58.90, categoria: "salgadas", img: "img/produtos/pizza-frango.png" },
  { id: 3, nome: "Quatro Queijos", preco: 56.00, categoria: "salgadas", img: "img/produtos/pzz 4 queijos.png" },
  { id: 19, nome: "X-Tudo Mega", preco: 40.00, categoria: "saladas", img: "img/produtos/pzz-x-tudo.jpeg" },
  { id: 4, nome: "Portuguesa Premium", preco: 60.50, categoria: "salgadas", img: "img/produtos/pizza-portuguesa.png" },
  { id: 5, nome: "Pizza Oliveira", preco: 62.00, categoria: "salgadas", img: "img/produtos/pizza oliveira azeitona negra.jpeg" },
  { id: 6, nome: "Margherita Especial", preco: 58.50, categoria: "salgadas", img: "img/produtos/pzz-margherita2.jpeg" },
  { id: 7, nome: "Margherita Tradicional", preco: 52.00, categoria: "salgadas", img: "img/produtos/pzz-margherita-tradicional.jpeg" },

  // Pizzas doces
  { id: 8, nome: "Nutella", preco: 62.00, categoria: "doces", img: "img/produtos/pizza-nutella.png" },
  { id: 9, nome: "Morango e Duplo Chocolate", preco: 64.00, categoria: "doces", img: "img/produtos/pzz-doce-morango-duplo-chocolate.jpeg" },
  { id: 10, nome: "M&M's Chocolate", preco: 61.00, categoria: "doces", img: "img/produtos/pzz-doce-m&m.jpeg" },
  { id: 11, nome: "Banana e Canela", preco: 55.00, categoria: "doces", img: "img/produtos/pzz-doce-banana-eoutros.jpeg" },
  { id: 12, nome: "Romeu e Julieta", preco: 55.00, categoria: "doces", img: "img/produtos/pizza romeu e julieta sem fundo.png" },

  // Bebidas
  { id: 13, nome: "Coca-Cola 2 Litros", preco: 12.00, categoria: "bebidas", img: "img/produtos/coca cola 2L.jpeg" },
  { id: 14, nome: "Guaraná 2 Litros", preco: 11.00, categoria: "bebidas", img: "img/produtos/refri guarana antartica 2L.jpeg" },
  
  { id: 16, nome: "Água Mineral (500ml)", preco: 4.50, categoria: "bebidas", img: "img/produtos/agua H2O 500ml.jpeg" },

  // Lanches
  { id: 17, nome: "X-Burger Del Gatito", preco: 25.00, categoria: "lanches", img: "img/produtos/hamber1.png" },
  { id: 18, nome: "X-Salada Duplo", preco: 35.00, categoria: "lanches", img: "img/produtos/hamber3.png" },
  
  { id: 20, nome: "Cheese Bacon", preco: 30.00, categoria: "lanches", img: "img/produtos/hamber4.png" },
  { id: 21, nome: "Frango Grelhado", preco: 28.00, categoria: "lanches", img: "img/produtos/hamber5.png" },

  // Açaí
  { id: 22, nome: "Açaí na Tigela (300ml)", preco: 18.00, categoria: "acai", img: "img/produtos/açaí tigela 300ml.jpeg" },
  { id: 23, nome: "Açaí 700ml (Completo)", preco: 28.00, categoria: "acai", img: "img/produtos/açaí no copo 700ml.jpeg" },
  { id: 24, nome: "Mix de Frutas", preco: 22.00, categoria: "acai", img: "img/produtos/mix de frutas.jpeg" },
  { id: 25, nome: "Barca de Açaí", preco: 45.00, categoria: "acai", img: "img/produtos/barca duo.jpeg" },
  { id: 26, nome: "Açaí Tropical", preco: 23.00, categoria: "acai", img: "img/produtos/açaí tropical no copo 700ml.jpeg" },
  { id: 27, nome: "Açaí com Leite de Morango", preco: 25.00, categoria: "acai", img: "img/produtos/açaí com leite de morango e frutas no copo 500ml.jpeg" },
  { id: 28, nome: "Açaí Doce de Leite e Chocolate", preco: 26.50, categoria: "acai", img: "img/produtos/açaí doce de leite e chocolate no copo 700ml.jpeg" },
  { id: 29, nome: "Açaí Mousse de Limão", preco: 24.00, categoria: "acai", img: "img/produtos/açaí musse de limão leite em pó e uvas no copo 700ml.jpeg" },
  { id: 30, nome: "smoothie tropical", preco: 45.00, categoria: "acai", img: "img/produtos/smoothie tropical.jpeg" },

];

// Utilitário: obter produto por id
window.getProdutoById = function(id) {
  return produtos.find(p => p.id === Number(id));
};
