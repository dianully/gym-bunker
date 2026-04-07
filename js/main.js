// ── 1. Navbar scroll ──────────────────────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // ── 2. Mobile menu ────────────────────────────────────────────
    function openMenu() {
      document.getElementById('mobileMenu').classList.add('open');
      document.body.style.overflow = 'hidden';
      const btn = document.querySelector('.show-mobile');
      if (btn) {
        btn.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
        btn.setAttribute('onclick', 'closeMenu()');
      }
    }
    function closeMenu() {
      document.getElementById('mobileMenu').classList.remove('open');
      document.body.style.overflow = '';
      const btn = document.querySelector('.show-mobile');
      if (btn) {
        btn.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
        btn.setAttribute('onclick', 'openMenu()');
      }
    }

    // ── 3. Scroll reveal ──────────────────────────────────────────
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    // ── 5. Animated counters ──────────────────────────────────────
    function animateCounter(el) {
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const dur    = 1600;
      const step   = 16;
      const steps  = dur / step;
      const inc    = target / steps;
      let cur = 0;
      const timer = setInterval(() => {
        cur += inc;
        if (cur >= target) {
          clearInterval(timer);
          el.textContent = (suffix === '+' ? '+' : '') + target.toLocaleString('es-AR') + (suffix === '+' ? '' : suffix);
        } else {
          el.textContent = (suffix === '+' ? '+' : '') + Math.floor(cur).toLocaleString('es-AR') + suffix;
        }
      }, step);
    }

    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && e.target.dataset.target) {
          animateCounter(e.target);
          counterObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

    // ── 6. Responsive grid adjustments ───────────────────────────
    function applyLayouts() {
      const w = window.innerWidth;

      const bg = document.getElementById('benefits-grid');
      if (bg) {
        if (w >= 1024) {
          bg.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start;';
        } else {
          bg.style.cssText = 'display:flex;flex-direction:column;gap:48px;';
        }
      }

      const cg = document.getElementById('contact-grid');
      if (cg) {
        cg.style.cssText = w >= 860
          ? 'display:grid;grid-template-columns:1.2fr 1fr;gap:36px;max-width:1040px;margin:0 auto;'
          : 'display:flex;flex-direction:column;gap:36px;max-width:1040px;margin:0 auto;';
      }

      const nr = document.getElementById('name-row');
      if (nr) {
        nr.style.cssText = w >= 480
          ? 'display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:18px;'
          : 'display:flex;flex-direction:column;gap:18px;margin-bottom:18px;';
      }

      const fg = document.getElementById('footer-grid');
      if (fg) {
        fg.style.cssText = w >= 768
          ? 'display:grid;grid-template-columns:1fr 1.5fr;gap:48px;margin-bottom:40px;align-items:start;'
          : 'display:flex;flex-direction:column;gap:40px;margin-bottom:36px;';
      }
    }

    applyLayouts();
    window.addEventListener('resize', applyLayouts, { passive: true });

    // ── 7. Form submit ────────────────────────────────────────────
    function handleSubmit(e) {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      const suc = document.getElementById('formSuccess');
      btn.disabled = true;
      btn.style.opacity = '.6';
      btn.textContent = 'Enviando…';
      setTimeout(() => {
        btn.style.display = 'none';
        suc.style.display = 'block';
        e.target.reset();
      }, 1100);
    }
