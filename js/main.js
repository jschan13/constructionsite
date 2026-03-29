/**
 * Meridian Build Group — main.js
 * Handles: nav scroll, mobile menu, counter animations,
 *          scroll reveal, project filtering
 */

(function () {
  'use strict';

  /* ── NAV: sticky + mobile toggle ── */
  const nav        = document.getElementById('nav');
  const navToggle  = document.getElementById('navToggle');
  const navLinks   = document.getElementById('navLinks');

  // Add/remove 'scrolled' class
  function handleNavScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run once on load

  // Mobile open/close
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });

    // Close when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }


  /* ── COUNTER ANIMATION ── */
  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800; // ms
    const start    = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-quart
      const eased    = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }

    requestAnimationFrame(update);
  }

  // Trigger counters when they enter the viewport
  const counters = document.querySelectorAll('[data-target]');

  if (counters.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(c => counterObserver.observe(c));
  }


  /* ── SCROLL REVEAL ── */
  // Add .reveal class to elements we want to animate in
  const revealTargets = document.querySelectorAll(
    '.service-card, .proj-card, .testi-card, .why-item, ' +
    '.timeline-item, .team-card, .cert-badge, .numbers__item, ' +
    '.featured__card, .stat'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger siblings slightly
          const siblings = entry.target.parentElement.querySelectorAll('.reveal');
          let delay = 0;
          siblings.forEach((sib, i) => {
            if (sib === entry.target) delay = i * 60;
          });
          setTimeout(() => entry.target.classList.add('visible'), delay);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show everything immediately
    revealTargets.forEach(el => el.classList.add('visible'));
  }


  /* ── PROJECT FILTER ── */
  const filterBar    = document.getElementById('filterBar');
  const projectCards = document.querySelectorAll('.proj-card');
  const visibleCount = document.getElementById('visibleCount');

  if (filterBar && projectCards.length) {
    filterBar.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      // Update active state
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let count = 0;

      projectCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
        if (match) count++;
      });

      if (visibleCount) visibleCount.textContent = count;
    });
  }


  /* ── SMOOTH CONTACT ANCHOR ── */
  document.querySelectorAll('a[href="#contact"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.getElementById('contact');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ── CONTACT FORM ── */
  const contactBtn = document.querySelector('.contact-cta__form .btn');
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      const inputs   = document.querySelectorAll('.contact-cta__form input, .contact-cta__form textarea');
      let allFilled  = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          allFilled = false;
          input.style.borderColor = '#E07070';
          setTimeout(() => { input.style.borderColor = ''; }, 2000);
        }
      });

      if (allFilled) {
        contactBtn.textContent = '✓ Enquiry Sent — We\'ll be in touch!';
        contactBtn.style.background = '#3A7D44';
        contactBtn.style.borderColor = '#3A7D44';
        contactBtn.disabled = true;
        inputs.forEach(i => i.value = '');
        setTimeout(() => {
          contactBtn.textContent = 'Send Enquiry';
          contactBtn.style.background = '';
          contactBtn.style.borderColor = '';
          contactBtn.disabled = false;
        }, 5000);
      }
    });
  }

})();
