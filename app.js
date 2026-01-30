// js/app.js (Script Simplificado - Apenas Banner)

// --- LÓGICA DO BANNER ROTATIVO (COM MOVIMENTAÇÃO) ---
function iniciarBannerRotativo() {
    const container = document.querySelector('.slides-container');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    const indicatorsArea = document.querySelector('.indicators');

    if (!container || slides.length === 0) return; 

    // O número de slides é 3
    const numSlides = 3; 

    // Ajusta a largura do container e dos slides
    container.style.width = (numSlides * 100) + '%';
    slides.forEach(s => {
        s.style.width = (100 / numSlides) + '%';
    });

    let currentIndex = 0;
    let slideInterval; // Variável para o timer

    indicatorsArea.innerHTML = '';
    
    // Cria 3 indicadores
    for (let i = 0; i < numSlides; i++) {
        const btn = document.createElement('button');
        btn.classList.add('indicator-btn');
        if (i === 0) btn.classList.add('active');
        btn.dataset.index = i;
        btn.addEventListener('click', () => gotoSlide(i));
        indicatorsArea.appendChild(btn);
    }
    
    const indicatorBtns = indicatorsArea.querySelectorAll('.indicator-btn');

    function gotoSlide(index) {
        currentIndex = (index + numSlides) % numSlides;
        
        const slideWidthPercentage = 100 / numSlides; 
        container.style.transform = `translateX(-${currentIndex * slideWidthPercentage}%)`;

        slides.forEach((s, i) => s.classList.toggle('active', i === currentIndex));
        indicatorBtns.forEach((btn, i) => btn.classList.toggle('active', i === currentIndex));
        
        resetTimer();
    }

    prevBtn.addEventListener('click', () => gotoSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => gotoSlide(currentIndex + 1));

    // Lógica do Timer (A "movimentação")
    function startTimer() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            gotoSlide(currentIndex + 1);
        }, 5000); // Troca a cada 5 segundos
    }

    function resetTimer() {
        startTimer();
    }

    gotoSlide(0); 
    startTimer(); 
}


// --- INICIALIZAÇÃO GERAL ---
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Tenta iniciar o contador do carrinho (do carrinho.js)
    if (typeof salvarCarrinho === 'function') {
        salvarCarrinho();
    } else {
        console.error("carrinho.js não foi carregado.");
    }
    
    // 2. Inicia o carrossel de banner
    iniciarBannerRotativo();
});