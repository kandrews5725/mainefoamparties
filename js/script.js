// Maine Foam Parties — shared interactions

document.addEventListener('DOMContentLoaded', () => {

  /* Mobile nav toggle ----------------------------------------------------*/
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    nav.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  /* FAQ accordion ----------------------------------------------------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-a').style.maxHeight = null;
          openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        }
      });
      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = null;
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Foam-burst micro-interaction on primary buttons ---------------------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (prefersReducedMotion) return;
      // clear any leftover bubbles
      btn.querySelectorAll('.bubble').forEach(b => b.remove());
      const count = 9;
      for (let i = 0; i < count; i++) {
        const bubble = document.createElement('span');
        bubble.className = 'bubble';
        const angle = (Math.PI / count) * i - Math.PI / 2 + (Math.random() * 0.5 - 0.25);
        const dist = 40 + Math.random() * 50;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist - 20;
        const size = 5 + Math.random() * 8;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.setProperty('--tx', tx + 'px');
        bubble.style.setProperty('--ty', ty + 'px');
        bubble.style.animationDelay = (Math.random() * 0.08) + 's';
        btn.appendChild(bubble);
      }
      btn.classList.remove('pop');
      void btn.offsetWidth; // restart animation
      btn.classList.add('pop');
      setTimeout(() => {
        btn.querySelectorAll('.bubble').forEach(b => b.remove());
        btn.classList.remove('pop');
      }, 750);
    });
  });

  /* Ambient foam bubble field in hero sections --------------------------- */
  document.querySelectorAll('.foam-field').forEach(field => {
    const count = parseInt(field.dataset.count || '14', 10);
    for (let i = 0; i < count; i++) {
      const bub = document.createElement('span');
      bub.className = 'bub';
      const size = 6 + Math.random() * 22;
      bub.style.width = size + 'px';
      bub.style.height = size + 'px';
      bub.style.left = Math.random() * 100 + '%';
      bub.style.top = Math.random() * 100 + '%';
      bub.style.opacity = (0.15 + Math.random() * 0.35).toFixed(2);
      field.appendChild(bub);
    }
  });

  /* Simple scroll reveal --------------------------------------------------*/
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    revealEls.forEach(el => { el.style.opacity = 0; el.style.transform = 'translateY(16px)'; el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  }

  /* Bubble clusters pop and vanish on click — a fun interaction, and a
     built-in escape hatch if one ever lands somewhere awkward */
  document.querySelectorAll('.bubble-decor').forEach(cluster => {
    cluster.addEventListener('click', () => {
      if (cluster.classList.contains('popped')) return;
      cluster.classList.add('popped');
      cluster.addEventListener('animationend', () => {
        cluster.style.display = 'none';
      }, { once: true });
      // Fallback in case prefers-reduced-motion skips the animation entirely
      if (prefersReducedMotion) {
        cluster.style.display = 'none';
      }
    });
  });

});
