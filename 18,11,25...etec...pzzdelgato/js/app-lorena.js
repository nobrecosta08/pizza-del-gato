// js/app-lorena.js (Script Exclusivo para a Página da Parceria)

// Reutiliza a função de renderização, focando apenas nos produtos da parceria
function renderizarProdutosLorena(produtosList) {
    const area = document.getElementById("carrossel-lorena");
    if (!area) return;

    area.innerHTML = '';
    
    if (produtosList.length === 0) {
        area.innerHTML = '<p style="color: var(--color-secondary); text-align: center; width: 100%; padding: 20px;">Nenhum item da parceria disponível no momento.</p>';
        return;
    }

    // Renderiza TODOS os produtos da lista (não limita a 4)
    produtosList.forEach(p => {
        area.innerHTML += `
            <div class="card-produto">
                <img src="${p.img}" alt="${p.nome}">
                <h3>${p.nome}</h3>
                <p class="price">R$ ${p.preco.toFixed(2)}</p>
                <div class="card-actions">
                    <button class="btn secondary ver-det">Detalhes</button>
                    <button class="btn add-cart" onclick="addCarrinho(${p.id})">Pedir</button>
                </div>
            </div>
        `;
    });
}

// --- LÓGICA DO BANNER ROTATIVO (COPIADA DO app.js) ---
function iniciarBannerRotativoLorena() {
    const container = document.querySelector('.slides-container');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    const indicatorsArea = document.querySelector('.indicators');

    if (!container || slides.length < 2) return; 

    let currentIndex = 0;
    let slideInterval;

    indicatorsArea.innerHTML = ''; // Limpa indicadores para recriar

    slides.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.classList.add('indicator-btn');
        if (i === 0) btn.classList.add('active');
        btn.addEventListener('click', () => gotoSlide(i));
        indicatorsArea.appendChild(btn);
    });
    const indicatorBtns = document.querySelectorAll('.indicator-btn');

    function gotoSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        
        const slideWidthPercentage = 100 / slides.length; 
        container.style.transform = `translateX(-${currentIndex * slideWidthPercentage}%)`;

        indicatorBtns.forEach((btn, i) => {
            btn.classList.toggle('active', i === currentIndex);
        });
        
        resetTimer();
    }

    prevBtn.addEventListener('click', () => gotoSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => gotoSlide(currentIndex + 1));

    function startTimer() {
        slideInterval = setInterval(() => {
            gotoSlide(currentIndex + 1);
        }, 5000); 
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startTimer();
    }

    startTimer();
}


document.addEventListener("DOMContentLoaded", () => {
    // 1. Filtra APENAS os produtos da parceria
    const produtosLorena = window.produtos.filter(p => p.parceria === 'acai-lorena');
    
    // 2. Carrega o cardápio exclusivo
    renderizarProdutosLorena(produtosLorena); 
    
    // 3. Inicializa o contador de carrinho
    if (typeof salvarCarrinho === 'function') {
        salvarCarrinho();
    }
    
    // 4. Configura o botão de voltar para a Index
    const btnVoltar = document.getElementById('acaiLorenaBtnVoltar');
    if(btnVoltar) {
        btnVoltar.addEventListener('click', () => {
             window.location.href = 'index.html';
        });
    }

    // 5. INICIA O CARROSSEL DE BANNERS EXCLUSIVO DA PÁGINA
    iniciarBannerRotativoLorena();
});