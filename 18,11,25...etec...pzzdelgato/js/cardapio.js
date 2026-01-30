// Busca e filtros do cardõpio, sem conflitar com HTML atual.
// Usa #busca-cardapio e botões de .category-tabs[data-categoria].
  
(function () {
  const grid = document.getElementById("cardapio-grid");
  const buscaInput = document.getElementById("busca-cardapio");
  const tabsContainer = document.getElementById("filtros-cardapio");

  // Corrigir texto com acentuação quebrada na UI (apenas se presente)
  if (tabsContainer) {
    const btnTodas = tabsContainer.querySelector('[data-categoria="todas"]');
    if (btnTodas) btnTodas.textContent = "Todas as Op��es";
  }

  // Se grid n�o � din�mico (j� renderizado em HTML), aplicamos filtros por texto (h3)
  function filtrarLista({ texto = "", categoria = "todas" } = {}) {
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll(".card-produto"));

    cards.forEach(card => {
      const nome = (card.querySelector("h3")?.textContent || "").toLowerCase();
      const visivelTexto = nome.includes(texto.toLowerCase());
      let visivelCategoria = true;

      // Dedu��es de categoria por nome (fallback para HTML est�tico)
      const mapNomeCategoria = {
        salgadas: ["calabresa","x-tudo","x-burger", "frango", "quatro queijos", "portuguesa", "margherita", "oliveira"],
        doces: ["nutella", "morango", "m&m", "banana", "romeu julieta"],
        lanches: ["x-salada","cheese", "frango grelhado"],
        bebidas: ["coca", "guaraná","água", ],
        acai: ["açaí", "barca","mix",],
      };

      if (categoria !== "todas") {
        const termos = mapNomeCategoria[categoria] || [];
        visivelCategoria = termos.some(t => nome.includes(t));
      }

      card.style.display = visivelTexto && visivelCategoria ? "" : "none";
    });
  }

  // Eventos
  if (buscaInput) {
    buscaInput.addEventListener("input", (e) => {
      const texto = e.target.value || "";
      const activeTab = tabsContainer?.querySelector(".tab.active")?.dataset?.categoria || "todas";
      filtrarLista({ texto, categoria: activeTab });
    });
  }

  if (tabsContainer) {
    tabsContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".tab");
      if (!btn) return;
      tabsContainer.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
      const categoria = btn.dataset.categoria || "todas";
      const texto = buscaInput?.value || "";
      filtrarLista({ texto, categoria });
    });
  }

  // Inicial
  document.addEventListener("DOMContentLoaded", () => {
    filtrarLista({ texto: "", categoria: "todas" });
  });
})();
