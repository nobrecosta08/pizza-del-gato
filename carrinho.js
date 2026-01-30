// Carrinho persistente (localStorage) + contador global.
// Mantém compatibilidade com addCarrinho(id) usado nos botões.

(function () {
  const STORAGE_KEY = "carrinho-del-gatito";

  // Estado
  let carrinho = [];

  // Carregar do storage
  function carregarCarrinho() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      carrinho = data ? JSON.parse(data) : [];
    } catch (e) {
      carrinho = [];
    }
  }

  // Salvar
  function salvarCarrinho() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrinho));
  }

  // Atualizar contador (se existir no DOM)
  function atualizarContador() {
    const el = document.getElementById("cart-count");
    if (el) el.textContent = carrinho.length;
  }

  // Adicionar item por id
  window.addCarrinho = function (id) {
    const produto = window.getProdutoById ? window.getProdutoById(id) : null;
    if (!produto) {
      console.warn("Produto não encontrado para id:", id);
      return;
    }
    carrinho.push({ id: produto.id, nome: produto.nome, preco: produto.preco, qnt: 1 });
    salvarCarrinho();
    atualizarContador();
    // Feedback simples sem bloquear fluxo
    try {
      if (window?.navigator?.vibrate) navigator.vibrate(50);
    } catch {}
  };

  // Remover por índice
  window.removerItemCarrinho = function (index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    atualizarContador();
  };

  // Limpar tudo
  window.limparCarrinho = function () {
    carrinho = [];
    salvarCarrinho();
    atualizarContador();
  };

  // Obter cópia do carrinho
  window.getCarrinho = function () {
    return [...carrinho];
  };

  // Inicialização
  document.addEventListener("DOMContentLoaded", () => {
    carregarCarrinho();
    atualizarContador();
  });
})();
