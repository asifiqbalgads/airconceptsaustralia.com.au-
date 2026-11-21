/**
 * Air Concepts Australia — Custom Homepage Interactive Engine
 * Pure Vanilla JavaScript · Zero External Dependencies · GitHub Pages Compatible
 */

(function () {
  'use strict';

  /* ========================================================================
     1. MOBILE NAVIGATION DRAWER
     ======================================================================== */
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function setMobileMenuState(isOpen) {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    mobileDrawer.setAttribute('aria-hidden', String(!isOpen));
    mobileDrawer.classList.toggle('is-open', isOpen);
  }

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', function () {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      setMobileMenuState(!expanded);
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        setMobileMenuState(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setMobileMenuState(false);
        menuToggle.focus();
      }
    });
  }

  /* ========================================================================
     2. HERO INTERACTIVE CLIMATE MODE CONTROLLER
     ======================================================================== */
  const climateModes = {
    cooling: {
      readout: 'COOLING · 21.0°C SETPOINT',
      highlight: 'Melbourne Homes',
      spec1: '2.5kW – 9.4kW+ Zoned',
      spec2: 'From $2,000 incl. Electrical',
      spec3: 'Fujitsu Elite · Daikin · Mitsubishi'
    },
    heating: {
      readout: 'GAS DUCTED HEATING · 23.5°C WARMTH',
      highlight: 'Winter Comfort',
      spec1: 'Whole-Home Zoned Ducted',
      spec2: 'New Installs & Heater Upgrades',
      spec3: 'Rinnai · Brivis · Bonaire · Braemar'
    },
    commercial: {
      readout: 'COMMERCIAL VRV/VRF · IN-HOUSE ENG.',
      highlight: 'Commercial Builds',
      spec1: 'Multi-Unit VRV/VRF & Rooftop',
      spec2: 'In-House Mechanical Design',
      spec3: 'REC · VBA · ARCtick · AroFlo'
    }
  };

  const climateTabs = document.querySelectorAll('.climate-tab');
  const climateReadout = document.getElementById('climate-live-readout');
  const heroHighlight = document.getElementById('hero-dynamic-highlight');
  const specVal1 = document.getElementById('spec-val-1');
  const specVal2 = document.getElementById('spec-val-2');
  const specVal3 = document.getElementById('spec-val-3');

  climateTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const mode = tab.getAttribute('data-mode');
      const data = climateModes[mode];
      if (!data) return;

      document.documentElement.setAttribute('data-climate-mode', mode);

      climateTabs.forEach(function (t) {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-pressed', String(active));
      });

      if (climateReadout) climateReadout.textContent = data.readout;
      if (heroHighlight) heroHighlight.textContent = data.highlight;
      if (specVal1) specVal1.textContent = data.spec1;
      if (specVal2) specVal2.textContent = data.spec2;
      if (specVal3) specVal3.textContent = data.spec3;
    });
  });

  /* ========================================================================
     3. OFFICIAL 7-TIER SPLIT SYSTEM CAPACITY & PRICING CALCULATOR
        (Exact pricing & room capacity brackets from airconceptsaustralia.com.au/services)
     ======================================================================== */
  const splitSystemTiers = [
    {
      kw: '2.5kW',
      price: '$2,000',
      bracket: 'small',
      typicalArea: 16,
      title: '2.5kW Split System',
      roomMatch: 'Ideal for Small Rooms (up to 20m²) · Bedroom, Nursery or Home Study'
    },
    {
      kw: '3.5kW',
      price: '$2,125',
      bracket: 'medium',
      typicalArea: 28,
      title: '3.5kW Split System',
      roomMatch: 'Ideal for Medium Rooms (20–40m²) · Master Bedroom with Ensuite or Small Lounge'
    },
    {
      kw: '5.2kW',
      price: '$2,625',
      bracket: 'medium',
      typicalArea: 38,
      title: '5.2kW Split System',
      roomMatch: 'Ideal for Medium-Large Rooms (35–48m²) · Large Bedroom or Mid-Sized Lounge'
    },
    {
      kw: '6.0kW',
      price: '$2,750',
      bracket: 'large',
      typicalArea: 48,
      title: '6.0kW Split System',
      roomMatch: 'Ideal for Large Rooms (40–60m²) · Mid-Sized Lounge, Dining or Large Kitchen'
    },
    {
      kw: '7.1kW',
      price: '$3,125',
      bracket: 'large',
      typicalArea: 56,
      title: '7.1kW Split System',
      roomMatch: 'Ideal for Large Family Zones (45–60m²) · Generous Living & Kitchen Zone'
    },
    {
      kw: '8.5kW',
      price: '$3,750',
      bracket: 'xlarge',
      typicalArea: 66,
      title: '8.5kW Split System',
      roomMatch: 'Ideal for Extra Large Spaces (60+m²) · Open-Plan Living & Large Lounges'
    },
    {
      kw: '9.4kW',
      price: '$4,125',
      bracket: 'xlarge',
      typicalArea: 76,
      title: '9.4kW Split System',
      roomMatch: 'Ideal for Expansive Open-Plan Areas (65+m²) · High-Capacity Living Zone'
    }
  ];

  const areaSlider = document.getElementById('room-area-slider');
  const areaDisplay = document.getElementById('area-value-display');
  const kwButtons = document.querySelectorAll('.kw-tier-btn');
  const bracketPills = document.querySelectorAll('.bracket-pill');
  const calcTitle = document.getElementById('calc-system-title');
  const calcRoomMatch = document.getElementById('calc-room-match');
  const calcPriceFigure = document.getElementById('calc-price-figure');
  const calcLockBtn = document.getElementById('calc-lock-quote-btn');

  let currentTierIndex = 1;

  function renderTier(index, syncSlider) {
    const tier = splitSystemTiers[index];
    if (!tier) return;
    currentTierIndex = index;

    if (syncSlider && areaSlider && areaDisplay) {
      areaSlider.value = String(tier.typicalArea);
      areaDisplay.textContent = String(tier.typicalArea);
    }

    kwButtons.forEach(function (btn, idx) {
      const selected = idx === index;
      btn.classList.toggle('is-selected', selected);
      btn.setAttribute('aria-checked', String(selected));
    });

    bracketPills.forEach(function (pill) {
      const match = pill.getAttribute('data-bracket') === tier.bracket;
      pill.classList.toggle('is-active', match);
    });

    if (calcTitle) calcTitle.textContent = tier.title;
    if (calcRoomMatch) calcRoomMatch.textContent = tier.roomMatch;
    if (calcPriceFigure) calcPriceFigure.textContent = tier.price;
    if (calcLockBtn) {
      const span = calcLockBtn.querySelector('span');
      if (span) {
        span.textContent = 'Lock In Free Quote for ' + tier.kw + ' System (' + tier.price + '*)';
      }
    }
  }

  function getTierIndexFromArea(sqm) {
    if (sqm <= 20) return 0; // 2.5kW
    if (sqm <= 32) return 1; // 3.5kW
    if (sqm <= 42) return 2; // 5.2kW
    if (sqm <= 50) return 3; // 6.0kW
    if (sqm <= 60) return 4; // 7.1kW
    if (sqm <= 70) return 5; // 8.5kW
    return 6; // 9.4kW
  }

  if (areaSlider) {
    areaSlider.addEventListener('input', function () {
      const sqm = parseInt(areaSlider.value, 10) || 28;
      if (areaDisplay) areaDisplay.textContent = String(sqm);
      const tierIdx = getTierIndexFromArea(sqm);
      renderTier(tierIdx, false);
    });
  }

  kwButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const idx = parseInt(btn.getAttribute('data-tier-index'), 10);
      if (!isNaN(idx)) {
        renderTier(idx, true);
      }
    });
  });

  /* Pre-fill Quote Form from Calculator or Service Cards */
  const quoteSection = document.getElementById('quote-section');
  const serviceSelect = document.getElementById('q-service');
  const messageInput = document.getElementById('q-message');
  const suburbInput = document.getElementById('q-suburb');

  function prefillAndScrollToQuote(serviceValue, customNote) {
    if (serviceSelect && serviceValue) {
      serviceSelect.value = serviceValue;
    }
    if (messageInput && customNote) {
      messageInput.value = customNote;
    }
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (calcLockBtn) {
    calcLockBtn.addEventListener('click', function () {
      const tier = splitSystemTiers[currentTierIndex];
      const sqm = areaSlider ? areaSlider.value : tier.typicalArea;
      prefillAndScrollToQuote(
        'Split System / Ducted Cooling',
        'Enquiring about the ' + tier.kw + ' Split System supply & install package (starting from ' + tier.price + ' incl. electrical supply & 5-Year Warranty) for an estimated ' + sqm + 'm² room.'
      );
    });
  }

  document.querySelectorAll('.js-select-service').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const svc = btn.getAttribute('data-service-value');
      prefillAndScrollToQuote(svc, '');
    });
  });

  /* ========================================================================
     4. GENUINE PROJECT PORTFOLIO FILTER & LIGHTBOX MODAL
     ======================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = Array.from(document.querySelectorAll('.portfolio-card'));

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(function (b) {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });

      portfolioCards.forEach(function (card) {
        const category = card.getAttribute('data-category');
        const show = filter === 'all' || category === filter;
        card.hidden = !show;
      });
    });
  });

  /* Lightbox Logic */
  const lightbox = document.getElementById('project-lightbox');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxTag = document.getElementById('lightbox-tag');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxEnquire = document.getElementById('lightbox-enquire');

  let activeProjectIndex = 0;

  function getVisibleCards() {
    return portfolioCards.filter(function (c) {
      return !c.hidden;
    });
  }

  function openLightboxByCard(card) {
    const visible = getVisibleCards();
    const idx = visible.indexOf(card);
    activeProjectIndex = idx >= 0 ? idx : 0;
    updateLightboxContent(visible[activeProjectIndex]);
    if (lightbox) {
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  }

  function updateLightboxContent(card) {
    if (!card) return;
    const img = card.getAttribute('data-img') || '';
    const title = card.getAttribute('data-title') || '';
    const tag = card.getAttribute('data-tag') || '';
    const desc = card.getAttribute('data-desc') || '';

    if (lightboxImg) {
      lightboxImg.src = img;
      lightboxImg.alt = title;
    }
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxTag) lightboxTag.textContent = tag;
    if (lightboxDesc) lightboxDesc.textContent = desc;
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }

  function stepLightbox(delta) {
    const visible = getVisibleCards();
    if (!visible.length) return;
    activeProjectIndex = (activeProjectIndex + delta + visible.length) % visible.length;
    updateLightboxContent(visible[activeProjectIndex]);
  }

  portfolioCards.forEach(function (card) {
    card.addEventListener('click', function () {
      openLightboxByCard(card);
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightboxByCard(card);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', function () { stepLightbox(-1); });
  if (lightboxNext) lightboxNext.addEventListener('click', function () { stepLightbox(1); });
  if (lightboxEnquire) {
    lightboxEnquire.addEventListener('click', function () {
      const currentTitle = lightboxTitle ? lightboxTitle.textContent : 'Project';
      closeLightbox();
      prefillAndScrollToQuote('', 'Enquiring about an installation similar to: ' + currentTitle);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
  });

  /* ========================================================================
     5. INTERACTIVE MELBOURNE SUBURB & POSTCODE CHECKER
     ======================================================================== */
  const suburbSearch = document.getElementById('suburb-search-input');
  const suburbClear = document.getElementById('suburb-clear-btn');
  const suburbStatus = document.getElementById('suburb-match-status');
  const suburbChips = Array.from(document.querySelectorAll('.suburb-chip'));

  function filterSuburbs() {
    if (!suburbSearch) return;
    const query = suburbSearch.value.trim().toLowerCase();
    if (suburbClear) suburbClear.hidden = query.length === 0;

    let visibleCount = 0;
    suburbChips.forEach(function (chip) {
      const text = (chip.getAttribute('data-suburb') || chip.textContent || '').toLowerCase();
      const match = !query || text.indexOf(query) !== -1;
      chip.hidden = !match;
      if (match) visibleCount++;
    });

    if (suburbStatus) {
      if (!query) {
        suburbStatus.innerHTML = 'Showing all <strong>21 priority western &amp; metro service hubs</strong> (plus full 100km Melbourne CBD radius).';
      } else if (visibleCount > 0) {
        suburbStatus.innerHTML = '✓ Confirmed! Found <strong>' + visibleCount + ' priority service hub(s)</strong> matching "' + query.replace(/[<>&"]/g, '') + '". Click to pre-fill your quote.';
      } else {
        suburbStatus.innerHTML = 'We service <strong>all Melbourne suburbs within 100km of the CBD</strong>! Click <a href="#quote-section" style="color:#38bdf8;text-decoration:underline;">Request Quote</a> or call <strong>0431 872 515</strong> for "' + query.replace(/[<>&"]/g, '') + '".';
      }
    }
  }

  if (suburbSearch) {
    suburbSearch.addEventListener('input', filterSuburbs);
  }

  if (suburbClear && suburbSearch) {
    suburbClear.addEventListener('click', function () {
      suburbSearch.value = '';
      filterSuburbs();
      suburbSearch.focus();
    });
  }

  suburbChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      const sub = chip.getAttribute('data-suburb') || '';
      if (suburbInput) suburbInput.value = sub;
      if (quoteSection) quoteSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ========================================================================
     6. ACCESSIBLE FAQ ACCORDION
     ======================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', function () {
      const isOpen = item.classList.contains('is-open');
      faqItems.forEach(function (other) {
        const oTrigger = other.querySelector('.faq-trigger');
        const oPanel = other.querySelector('.faq-panel');
        other.classList.remove('is-open');
        if (oTrigger) oTrigger.setAttribute('aria-expanded', 'false');
        if (oPanel) oPanel.hidden = true;
      });

      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
      }
    });
  });

  /* ========================================================================
     7. TRANSPARENT STATIC QUOTE REQUEST BUILDER (NO FAKE SUBMISSION)
     ======================================================================== */
  const quoteForm = document.getElementById('quote-builder-form');
  const preparedPanel = document.getElementById('quote-prepared-panel');
  const preparedPreview = document.getElementById('prepared-preview-text');
  const preparedMailto = document.getElementById('prepared-mailto-link');
  const copyQuoteBtn = document.getElementById('copy-quote-btn');

  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const firstName = (document.getElementById('q-first-name')?.value || '').trim();
      const lastName = (document.getElementById('q-last-name')?.value || '').trim();
      const email = (document.getElementById('q-email')?.value || '').trim();
      const phone = (document.getElementById('q-phone')?.value || '').trim();
      const suburb = (document.getElementById('q-suburb')?.value || '').trim();
      const service = (document.getElementById('q-service')?.value || '').trim() || 'General HVAC Consultation';
      const message = (document.getElementById('q-message')?.value || '').trim();

      const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Prospective Client';
      const summaryLines = [
        'AIR CONCEPTS AUSTRALIA — QUOTE & CONSULTATION ENQUIRY',
        '------------------------------------------------------',
        'Name: ' + fullName,
        'Phone: ' + (phone || 'Not provided'),
        'Email: ' + (email || 'Not provided'),
        'Suburb: ' + (suburb || 'Melbourne VIC'),
        'Service Required: ' + service,
        'Project / System Details: ' + (message || 'Please contact me to arrange a free consultation and quote.')
      ];
      const summaryText = summaryLines.join('\n');

      const subject = encodeURIComponent('Free Quote Enquiry: ' + service + ' (' + (suburb || 'Melbourne') + ')');
      const body = encodeURIComponent(summaryText);

      if (preparedPreview) preparedPreview.textContent = summaryText;
      if (preparedMailto) {
        preparedMailto.href = 'mailto:info@airconceptsaustralia.com.au?subject=' + subject + '&body=' + body;
      }
      if (preparedPanel) {
        preparedPanel.hidden = false;
        preparedPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  if (copyQuoteBtn && preparedPreview) {
    copyQuoteBtn.addEventListener('click', function () {
      const text = preparedPreview.textContent || '';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          copyQuoteBtn.textContent = '✓ Copied to Clipboard';
          setTimeout(function () {
            copyQuoteBtn.textContent = 'Copy Summary Text';
          }, 2200);
        });
      }
    });
  }

  /* Dynamic Copyright Year */
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
