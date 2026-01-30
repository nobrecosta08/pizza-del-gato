// Render do resumo do pedido, remoção, total e envio via WhatsApp (simples).
// Mantém compatibilidade com ids já presentes: #lista-itens-carrinho, #carrinho-total-preco, #limpar-carrinho, #form-pedido.

(function () {
  const listaEl = document.getElementById("lista-itens-carrinho");
  const totalEl = document.getElementById("carrinho-total-preco");
  const btnLimpar = document.getElementById("limpar-carrinho");
  const form = document.getElementById("form-pedido");

  function render() {
    const carrinho = window.getCarrinho ? window.getCarrinho() : [];
    if (!listaEl || !totalEl) return;

    listaEl.innerHTML = "";
    let total = 0;

    carrinho.forEach((item, index) => {
      total += item.preco * (item.qnt || 1);
      const row = document.createElement("div");
      row.className = "item-carrinho";
      row.style.display = "flex";
      row.style.justifyContent = "space-between";
      row.style.alignItems = "center";
      row.style.padding = "8px 0";
      row.style.borderBottom = "1px solid #333";

      row.innerHTML = `
        <div>
          <strong>${item.nome}</strong><br>
          <small>R$ ${item.preco.toFixed(2).replace(".", ",")}</small>
        </div>
        <div>
          <button class="btn secondary" data-remover="${index}">Remover</button>
        </div>
      `;

      listaEl.appendChild(row);
    });

    totalEl.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
    // Atualiza contador do topo
    if (window.atualizarContador) window.atualizarContador();
  }

  // Delegação para remover
  if (listaEl) {
    listaEl.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-remover]");
      if (!btn) return;
      const idx = parseInt(btn.getAttribute("data-remover"), 10);
      window.removerItemCarrinho?.(idx);
      render();
    });
  }

  // Limpar
  if (btnLimpar) {
    btnLimpar.addEventListener("click", () => {
      window.limparCarrinho?.();
      render();
    });
  }

  // Envio simples via WhatsApp (gera mensagem)
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const carrinho = window.getCarrinho ? window.getCarrinho() : [];
      if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
      }
      const nome = form.nome.value.trim();
      const telefone = form.telefone.value.trim();
      const cep = form.cep.value.trim();
      const pagamento = form.querySelector('input[name="pagamento"]:checked')?.value || "Pix";

      const total = carrinho.reduce((acc, item) => acc + item.preco * (item.qnt || 1), 0);

      const itensMsg = carrinho.map(i => `• ${i.nome} — R$ ${i.preco.toFixed(2)}`).join("%0A");
      const mensagem =
        `Pedido Del Gatito:%0A${itensMsg}%0A%0ATotal: R$ ${total.toFixed(2)}%0A%0A` +
        `Nome: ${encodeURIComponent(nome)}%0ATelefone: ${encodeURIComponent(telefone)}%0ACEP: ${encodeURIComponent(cep)}%0A` +
        `Pagamento: ${encodeURIComponent(pagamento)}`;

      // Ajuste número destino aqui:
      const destino = "5511999999999"; // DDI+DDD+Número (exemplo)
      const url = `https://wa.me/${destino}?text=${mensagem}`;

      window.open(url, "_blank");
    });
  }

  document.addEventListener("DOMContentLoaded", render);
})();
