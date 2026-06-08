document.addEventListener('DOMContentLoaded', () => {
  // === MOBILE MENU TOGGLE ===
  const menuToggle = document.getElementById('menuToggle');
  const navMobile = document.getElementById('navMobile');
  
  if (menuToggle && navMobile) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMobile.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMobile.contains(e.target) && !menuToggle.contains(e.target) && navMobile.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
      }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = navMobile.querySelectorAll('.menu-item-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
      });
    });
  }

  // === HERO SLIDER CAROUSEL ===
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  
  if (slides.length > 0) {
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 6000; // 6 seconds

    const showSlide = (n) => {
      // Remove active class from all slides and dots
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      // Calculate correct index (wrapping)
      currentSlide = (n + slides.length) % slides.length;

      // Add active class to current slide and dot
      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
      }
    };

    const nextSlide = () => {
      showSlide(currentSlide + 1);
    };

    const prevSlide = () => {
      showSlide(currentSlide - 1);
    };

    // Auto Slide
    const startSlideShow = () => {
      slideInterval = setInterval(nextSlide, intervalTime);
    };

    const stopSlideShow = () => {
      clearInterval(slideInterval);
    };

    // Event Listeners
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideShow();
        startSlideShow();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideShow();
        startSlideShow();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        stopSlideShow();
        startSlideShow();
      });
    });

    // Pause auto slide on hover
    const sliderContainer = document.querySelector('.hero-slider');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', stopSlideShow);
      sliderContainer.addEventListener('mouseleave', startSlideShow);
    }

    // Initialize
    showSlide(currentSlide);
    startSlideShow();
  }

  // === PRODUCT CATEGORY FILTER TABS ===
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.product-tab-content');

  if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        // Remove active class from all buttons and grids
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => {
          c.classList.remove('active');
          c.style.display = 'none'; // Ensure layout handles hide/show
        });

        // Add active class to clicked button
        btn.classList.add('active');

        // Show active grid
        const activeContent = document.getElementById(targetTab);
        if (activeContent) {
          activeContent.style.display = 'grid';
          // Force layout recalculation before adding class for smooth transition
          void activeContent.offsetWidth;
          activeContent.classList.add('active');
        }
      });
    });
  }

  // === FLOATING FORM / QUICK NAVIGATION WIDGET ===
  const formFloatingBtn = document.getElementById('formFloatingBtn');
  const formFloatingBox = document.getElementById('formFloatingBox');
  const waBubble = document.getElementById('waBubble');
  const waChatBox = document.getElementById('waChatBox');

  // Helper functions to close widgets
  const closeWhatsApp = () => {
    if (waChatBox && waChatBox.classList.contains('active')) {
      waChatBox.classList.remove('active');
      waBubble.classList.remove('active');
      const chatIcon = waBubble.querySelector('.wa-icon-chat');
      const closeIcon = waBubble.querySelector('.wa-icon-close');
      if (chatIcon) chatIcon.style.display = 'block';
      if (closeIcon) closeIcon.style.display = 'none';
    }
  };

  const closeNavBox = () => {
    if (formFloatingBox && formFloatingBox.classList.contains('active')) {
      formFloatingBox.classList.remove('active');
      formFloatingBtn.classList.remove('active');
      const planeIcon = formFloatingBtn.querySelector('.form-icon-plane');
      const closeIcon = formFloatingBtn.querySelector('.form-icon-close');
      if (planeIcon) planeIcon.style.display = 'block';
      if (closeIcon) closeIcon.style.display = 'none';
    }
  };

  // Toggle quick nav
  if (formFloatingBtn && formFloatingBox) {
    const planeIcon = formFloatingBtn.querySelector('.form-icon-plane');
    const closeIcon = formFloatingBtn.querySelector('.form-icon-close');

    formFloatingBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = formFloatingBox.classList.toggle('active');
      formFloatingBtn.classList.toggle('active', isActive);

      if (isActive) {
        if (planeIcon) planeIcon.style.display = 'none';
        if (closeIcon) closeIcon.style.display = 'block';
        closeWhatsApp(); // Sync: close WhatsApp if open
      } else {
        if (planeIcon) planeIcon.style.display = 'block';
        if (closeIcon) closeIcon.style.display = 'none';
      }
    });

    document.addEventListener('click', (e) => {
      if (formFloatingBox.classList.contains('active') && !formFloatingBox.contains(e.target) && !formFloatingBtn.contains(e.target)) {
        closeNavBox();
      }
    });

    // Option clicks
    const routingItems = formFloatingBox.querySelectorAll('.form-routing-item');
    routingItems.forEach(item => {
      item.addEventListener('click', () => {
        const action = item.getAttribute('data-action');
        closeNavBox();

        if (action === 'plotters' || action === 'insumos') {
          let tabId = 'plotters-tab';
          if (action === 'insumos') tabId = 'tintas-tab';

          const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
          if (targetBtn) {
            targetBtn.click();
          }

          const prodSection = document.getElementById('productos');
          if (prodSection) {
            prodSection.scrollIntoView({ behavior: 'smooth' });
          }
        } else if (action === 'consulta') {
          const contactSection = document.getElementById('contacto');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  // Toggle WhatsApp widget
  if (waBubble && waChatBox) {
    const chatIcon = waBubble.querySelector('.wa-icon-chat');
    const closeIcon = waBubble.querySelector('.wa-icon-close');
    const badge = waBubble.querySelector('.whatsapp-badge');

    waBubble.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = waChatBox.classList.toggle('active');
      waBubble.classList.toggle('active', isActive);

      if (isActive) {
        if (chatIcon) chatIcon.style.display = 'none';
        if (closeIcon) closeIcon.style.display = 'block';
        if (badge) badge.style.display = 'none';
        closeNavBox(); // Sync: close cian nav if open
      } else {
        if (chatIcon) chatIcon.style.display = 'block';
        if (closeIcon) closeIcon.style.display = 'none';
      }
    });

    document.addEventListener('click', (e) => {
      if (waChatBox.classList.contains('active') && !waChatBox.contains(e.target) && !waBubble.contains(e.target)) {
        closeWhatsApp();
      }
    });

    const waRoutingItems = waChatBox.querySelectorAll('.wa-routing-item');
    waRoutingItems.forEach(item => {
      item.addEventListener('click', () => {
        closeWhatsApp();
      });
    });
  }

  // === BRAND MARQUEE SEEDING ===
  // To make the infinite marquee loop seamlessly, we clone its items
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    const items = marqueeTrack.innerHTML;
    marqueeTrack.innerHTML = items + items; // Duplicate for continuous flow
  }

  // === CONTACT FORM VALIDATION & FEEDBACK ===
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic fields extraction
      const name = document.getElementById('nombre').value;
      const company = document.getElementById('empresa').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('telefono').value;
      const product = document.getElementById('producto').value;
      const message = document.getElementById('mensaje').value;

      if (!name || !email || !message) {
        alert('Por favor, completa los campos requeridos (Nombre, Email y Mensaje).');
        return;
      }

      // Simulate submission success
      alert(`¡Gracias por contactarte, ${name}! Tu consulta sobre "${product || 'Equipos e Insumos'}" ha sido enviada con éxito. Nos comunicaremos a la brevedad.`);
      contactForm.reset();
    });
  }
});
