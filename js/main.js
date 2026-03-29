/* Animaciones y comportamiento */

document.addEventListener('DOMContentLoaded', () => {

  /* CURSOR GLOW */
  const glow = document.getElementById('cursorGlow');

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });


  /* NAVBAR — compacta al hacer scroll */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.padding = '0.6rem 3rem';
    } else {
      navbar.style.padding = '1rem 3rem';
    }
  });


  /* SCROLL REVEAL */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));


  /* COUNTER ANIMATION — stats del hero */
  const counters = document.querySelectorAll('[data-target]');

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el       = entry.target;
      const target   = parseInt(el.dataset.target);
      const duration = 1200;
      const step     = target / (duration / 16);
      let current    = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target + '+';
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, 16);

      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));


  /* TYPED EFFECT — hero subtitle */
  const titleEl = document.querySelector('.hero-title');
  const text    = 'Backend Architecture | Cloud Services | Security';
  let charIndex = 0;

  titleEl.innerHTML = '';

  function renderTyped(raw) {
    return raw
      .replace(/\|/g, '<span class="sep">|</span>')
      + '<span style="color:var(--color-accent);opacity:0.7">_</span>';
  }

  function type() {
    if (charIndex < text.length) {
      charIndex++;
      titleEl.innerHTML = renderTyped(text.slice(0, charIndex));
      setTimeout(type, 38);
    } else {
      // remove cursor blink at the end
      titleEl.innerHTML = text.replace(/\|/g, '<span class="sep">|</span>');
    }
  }

  setTimeout(type, 900);


  /* PROJECT CARDS — tilt 3D on hover */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);

      card.style.transform  = `translateY(-4px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
      card.style.transition = 'transform 0.05s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform 0.4s ease';
    });
  });


  /* SKILL CARDS — colored glow on hover */
  const skillColors = {
    green:  '#4A9EFF',
    blue:   '#4A9EFF',
    purple: '#8855ff',
    red:    '#ff4444',
    orange: '#ff9500',
    cyan:   '#00d8ff',
    yellow: '#f7df1e',
  };

  document.querySelectorAll('.skill-card').forEach(card => {
    const color = skillColors[card.dataset.color] || 'var(--color-accent)';

    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = `0 0 24px ${color}33, 0 12px 40px rgba(0,0,0,0.4)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '';
    });
  });


  /* ACTIVE NAV LINK — highlight on scroll */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--color-accent)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

});
