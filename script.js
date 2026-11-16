/**
 * ============================================================================
 * LSPD | Los Santos Police Department - Frontend Client Application
 * Authentic LAPD Style Theme
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // Update footer year dynamically
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ================= 1. MOBILE NAVIGATION MENU =================
  const hamburgerBtn = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    const navItems = navMenu.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // ================= 2. SCROLLSPY (ACTIVE NAV HIGHLIGHT) =================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-item[href^="#"]');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNavOnScroll);

  // ================= 3. SCROLL TO TOP BUTTON =================
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ================= 4. SITE SEARCH PILL (LAPD STYLE) =================
  const siteSearchInput = document.getElementById('siteSearchInput');
  if (siteSearchInput) {
    siteSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = siteSearchInput.value.toLowerCase().trim();
        if (val.includes('zákon') || val.includes('penal') || val.includes('legislativa')) {
          document.getElementById('legislation')?.scrollIntoView({ behavior: 'smooth' });
        } else if (val.includes('vedení') || val.includes('chief') || val.includes('officer') || val.includes('command')) {
          document.getElementById('high-command')?.scrollIntoView({ behavior: 'smooth' });
        } else if (val.includes('stížnost') || val.includes('stiznost') || val.includes('form')) {
          document.getElementById('complaints')?.scrollIntoView({ behavior: 'smooth' });
        } else {
          showToast(`Vyhledávání: "${val}"`, 'info');
        }
      }
    });
  }

  // ================= 5. TOAST NOTIFICATION HELPER =================
  const toastContainer = document.getElementById('toastContainer');
  function showToast(message, type = 'info') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let iconClass = 'fa-solid fa-circle-info';
    if (type === 'success') iconClass = 'fa-solid fa-circle-check';
    if (type === 'warning') iconClass = 'fa-solid fa-triangle-exclamation';

    toast.innerHTML = `
      <i class="${iconClass}"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // ================= 6. LAW COPY LINK BUTTONS =================
  const copyLinkBtns = document.querySelectorAll('.btn-copy-link');
  copyLinkBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-url');
      if (url) {
        navigator.clipboard.writeText(url).then(() => {
          showToast('Odkaz na právní dokument byl zkopírován do schránky.', 'success');
        }).catch(() => {
          showToast('Nepodařilo se zkopírovat odkaz.', 'warning');
        });
      }
    });
  });

  // ================= 7. HIGH COMMAND & COMMAND STAFF FILTER =================
  const commandCards = document.querySelectorAll('.command-card');
  const rosterTables = document.querySelectorAll('.roster-table-block');
  const hierarchyPills = document.querySelectorAll('.rank-hierarchy-pills .pill');

  hierarchyPills.forEach(pill => {
    pill.addEventListener('click', () => {
      hierarchyPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterCategory = pill.getAttribute('data-filter') || 'all';

      // Filter Cards
      commandCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterCategory === 'all' || category === filterCategory) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });

      // Filter Tables
      rosterTables.forEach(block => {
        const category = block.getAttribute('data-category');
        if (filterCategory === 'all' || category === filterCategory) {
          block.style.display = 'block';
        } else {
          block.style.display = 'none';
        }
      });
    });
  });

  // ================= 8. DISCORD TAG COPY =================
  const discordPills = document.querySelectorAll('.discord-tag-pill');
  discordPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const discord = pill.getAttribute('data-discord');
      if (discord && discord !== '—') {
        navigator.clipboard.writeText(discord).then(() => {
          showToast(`Discord "${discord}" byl zkopírován do schránky.`, 'success');
        }).catch(() => {
          showToast(`Discord: ${discord}`, 'info');
        });
      }
    });
  });

  // ================= 9. GRACEFUL AVATAR IMAGE FALLBACK =================
  const avatarImgs = document.querySelectorAll('.command-avatar');
  avatarImgs.forEach(img => {
    const placeholder = img.parentElement.querySelector('.command-avatar-placeholder');
    
    img.addEventListener('error', () => {
      const altSrc = img.getAttribute('data-alt-src');
      if (altSrc && img.getAttribute('data-tried-alt') !== 'true') {
        img.setAttribute('data-tried-alt', 'true');
        img.src = altSrc;
      } else {
        img.style.display = 'none';
        if (placeholder) {
          placeholder.style.display = 'flex';
        }
      }
    });

    img.addEventListener('load', () => {
      img.style.display = 'block';
      if (placeholder) {
        placeholder.style.display = 'none';
      }
    });
  });

});
