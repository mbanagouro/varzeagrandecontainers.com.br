// Menu mobile toggle
document.querySelector('.menu-toggle').addEventListener('click', function () {
  document.querySelector('.nav').classList.toggle('nav--open');
  this.classList.toggle('menu-toggle--open');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(function (link) {
  link.addEventListener('click', function () {
    document.querySelector('.nav').classList.remove('nav--open');
    document.querySelector('.menu-toggle').classList.remove('menu-toggle--open');
  });
});

// Smooth scroll para nav links (fallback para navegadores sem scroll-behavior)
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Lightbox da galeria de projetos
(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll('.projeto-item'));
  if (!items.length) return;

  var lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Galeria de projetos');
  lightbox.hidden = true;
  lightbox.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="Fechar galeria">&times;</button>' +
    '<button type="button" class="lightbox-nav lightbox-nav--prev" aria-label="Imagem anterior">&#8249;</button>' +
    '<button type="button" class="lightbox-nav lightbox-nav--next" aria-label="Pr&oacute;xima imagem">&#8250;</button>' +
    '<figure class="lightbox-figure">' +
    '<img class="lightbox-img" src="" alt="">' +
    '<figcaption class="lightbox-caption"><span class="lightbox-legenda"></span><span class="lightbox-count"></span></figcaption>' +
    '</figure>';
  document.body.appendChild(lightbox);

  var imgEl = lightbox.querySelector('.lightbox-img');
  var legendaEl = lightbox.querySelector('.lightbox-legenda');
  var countEl = lightbox.querySelector('.lightbox-count');
  var closeBtn = lightbox.querySelector('.lightbox-close');
  var prevBtn = lightbox.querySelector('.lightbox-nav--prev');
  var nextBtn = lightbox.querySelector('.lightbox-nav--next');
  var current = 0;
  var lastFocus = null;

  function legendaDe(item) {
    var el = item.querySelector('.projeto-legenda');
    return el ? el.textContent.trim() : '';
  }

  function show(index) {
    current = (index + items.length) % items.length;
    var img = items[current].querySelector('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt;
    legendaEl.textContent = legendaDe(items[current]);
    countEl.textContent = (current + 1) + ' / ' + items.length;
  }

  function abrir(index) {
    lastFocus = document.activeElement;
    show(index);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function fechar() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    imgEl.removeAttribute('src');
    if (lastFocus) lastFocus.focus();
  }

  items.forEach(function (item, index) {
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', 'Ampliar imagem: ' + legendaDe(item));
    item.addEventListener('click', function () { abrir(index); });
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        abrir(index);
      }
    });
  });

  closeBtn.addEventListener('click', fechar);
  prevBtn.addEventListener('click', function () { show(current - 1); });
  nextBtn.addEventListener('click', function () { show(current + 1); });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target.classList.contains('lightbox-figure')) fechar();
  });

  document.addEventListener('keydown', function (e) {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') {
      fechar();
    } else if (e.key === 'ArrowLeft') {
      show(current - 1);
    } else if (e.key === 'ArrowRight') {
      show(current + 1);
    } else if (e.key === 'Tab') {
      // Mantém o foco preso no modal enquanto ele está aberto
      var focaveis = [closeBtn, prevBtn, nextBtn];
      var pos = focaveis.indexOf(document.activeElement);
      var passo = e.shiftKey ? -1 : 1;
      e.preventDefault();
      focaveis[(pos + passo + focaveis.length) % focaveis.length].focus();
    }
  });
})();
