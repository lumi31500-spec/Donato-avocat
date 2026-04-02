/* ════════════════════════════════════
   MAIN.JS — Maître Donato Sophie
   ════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Menu hamburger mobile ── */
  const burger = document.getElementById('burger-btn');
  const nav    = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen);
    });

    // Fermer en cliquant sur un lien
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    // Fermer en cliquant en dehors
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Lien actif dans la nav ── */
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Scroll reveal ── */
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.07 });
    document.querySelectorAll('.reveal').forEach(function (el) {
      obs.observe(el);
    });
  } else {
    // Fallback sans IntersectionObserver
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ── Formulaire de contact ── */
  var form = document.getElementById('form-contact');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (f) {
        if (f.type === 'checkbox' && !f.checked) ok = false;
        else if (f.type !== 'checkbox' && !f.value.trim()) ok = false;
      });
      if (!ok) {
        alert('Merci de compléter tous les champs obligatoires.');
        return;
      }
      var success = document.getElementById('form-success');
      if (success) success.style.display = 'block';
      var btn = form.querySelector('.btn-submit');
      if (btn) { btn.disabled = true; btn.textContent = 'Message envoyé ✓'; }
    });
  }

});
