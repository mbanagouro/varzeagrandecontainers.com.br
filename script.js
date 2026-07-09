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
