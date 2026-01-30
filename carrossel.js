// Carrossel básico para a home, respeitando estrutura atual (.banner-carousel)

(function() {
  const slidesContainer = document.querySelector('.slides-container');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.nav-btn.prev');
  const nextBtn = document.querySelector('.nav-btn.next');
  const indicators = document.querySelectorAll('.indicator-btn');

  if (!slidesContainer || slides.length === 0) return;

  let currentIndex = 0;

  function updateCarousel(index) {
    const offset = index * 100;
    slidesContainer.style.transform = `translateX(-${offset}%)`;
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
    currentIndex = index;
  }

  function goToNext() {
    updateCarousel((currentIndex + 1) % slides.length);
  }

  function goToPrev() {
    updateCarousel((currentIndex - 1 + slides.length) % slides.length);
  }

  if (nextBtn) nextBtn.addEventListener('click', goToNext);
  if (prevBtn) prevBtn.addEventListener('click', goToPrev);

  indicators.forEach(indicator => {
    indicator.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index, 10);
      if (!Number.isNaN(index)) updateCarousel(index);
    });
  });

  let autoSlide = setInterval(goToNext, 5000);
  slidesContainer.parentElement.addEventListener('mouseenter', () => clearInterval(autoSlide));
  slidesContainer.parentElement.addEventListener('mouseleave', () => {
    autoSlide = setInterval(goToNext, 5000);
  });

  updateCarousel(currentIndex);
})();
