/**
 * ARYA KHAB - EUROPEAN ATELIER INTERACTIVE ENGINE
 * Includes: Sky-Blue Cursor Glow, Video Layer Player, Scroll Reveal Animations,
 * Catalog Angle & Swatch Switcher, and Live Bespoke Calculator.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initColorSwatches();
  initScrollReveal();
  initWaveVideoPlayer();
});

/* ==========================================================================
   ۱. هاله نرم آبی آسمانی پشت حرکت ماوس (Guaranteed Visible Multiply Blend)
   ========================================================================== */
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderGlow() {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;

    glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderGlow);
  }
  requestAnimationFrame(renderGlow);
}

/* ==========================================================================
   ۲. انیمیشن روان ورود سکشن‌ها هنگام اسکرول (Scroll Reveal)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
}

/* ==========================================================================
   ۳. ویدیو پلیر انیمیشن لایه‌های مواج تشک (Pin 2 Video Engine)
   ========================================================================== */
function initWaveVideoPlayer() {
  const video = document.getElementById('wave-video');
  if (!video) return;

  // Make sure it autoplays seamlessly
  video.play().catch(() => {
    // If browser pauses autoplay, play on first user interaction
    window.addEventListener('click', () => video.play(), { once: true });
    window.addEventListener('scroll', () => video.play(), { once: true });
  });
}

/* ==========================================================================
   ۴. تعویض رنگ‌بندی کاتالوگ (Color Swatches)
   ========================================================================== */
function initColorSwatches() {
  const swatches = document.querySelectorAll('.swatch-pill');
  const label = document.getElementById('color-label');

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      const colorName = swatch.getAttribute('data-color');
      if (label) label.textContent = colorName;
    });
  });
}

/* ==========================================================================
   ۵. تعویض زوایای محصول در کاتالوگ (Multi-Angle Switcher)
   ========================================================================== */
window.switchAngle = function(angleName) {
  const thumbs = document.querySelectorAll('.angle-thumb');
  thumbs.forEach(t => t.classList.remove('active'));
  
  if (window.event && window.event.currentTarget) {
    window.event.currentTarget.classList.add('active');
  }

  const catalogImg = document.getElementById('catalog-main-img');
  if (!catalogImg) return;

  // Smooth fade switch
  catalogImg.style.opacity = '0.5';
  catalogImg.style.transform = 'scale(0.98)';
  setTimeout(() => {
    catalogImg.style.opacity = '1';
    catalogImg.style.transform = 'scale(1)';
  }, 220);
};

/* ==========================================================================
   ۶. همگام‌سازی لایه‌های مواج با ویدیو (Wave Layers Synchronizer)
   ========================================================================== */
window.highlightLayer = function(layerNumber) {
  const cards = document.querySelectorAll('.wave-layer-card');
  cards.forEach(c => c.classList.remove('active'));
  
  const activeCard = document.getElementById(`layer-card-${layerNumber}`);
  if (activeCard) {
    activeCard.classList.add('active');
    activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  const video = document.getElementById('wave-video');
  if (video) {
    // Pulse animation on video container
    const card = video.parentElement;
    if (card) {
      card.style.transform = 'scale(1.02)';
      setTimeout(() => card.style.transform = 'scale(1)', 300);
    }
  }
};

/* ==========================================================================
   ۷. محاسبه‌گر ابعاد سفارشی تشک (Bespoke Calculator)
   ========================================================================== */
let bespokeConfig = {
  size: 'تک‌نفره ۹۰ × ۲۰۰',
  firmness: 'نرم ابری متعادل (پیشنهاد کارگاه)',
  price: 10800000
};

window.setBespokeSize = function(element, sizeName) {
  const container = element.parentElement;
  container.querySelectorAll('.euro-chip').forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');

  bespokeConfig.size = sizeName;
  bespokeConfig.price = parseInt(element.getAttribute('data-price'));
  updateBespokeDisplay();
};

window.setBespokeFirmness = function(element, firmName) {
  const container = element.parentElement;
  container.querySelectorAll('.euro-chip').forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');

  bespokeConfig.firmness = firmName;
  updateBespokeDisplay();
};

function updateBespokeDisplay() {
  const nameOut = document.getElementById('calc-name-out');
  const firmOut = document.getElementById('calc-firmness-out');
  const priceOut = document.getElementById('calc-price-out');

  if (nameOut) nameOut.textContent = `تشک ${bespokeConfig.size}`;
  if (firmOut) firmOut.textContent = bespokeConfig.firmness;
  if (priceOut) {
    priceOut.innerHTML = `${formatNumberPersian(bespokeConfig.price)} <small>تومان</small>`;
  }
}

function formatNumberPersian(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/* ==========================================================================
   ۸. مودال سفارش مستقیم کارگاه
   ========================================================================== */
window.openOrderModal = function(customModel) {
  const modal = document.getElementById('order-modal');
  const summaryInput = document.getElementById('m-summary');
  const form = document.getElementById('order-form-euro');
  const success = document.getElementById('m-success');

  if (summaryInput) {
    summaryInput.value = customModel || `${bespokeConfig.size} (${bespokeConfig.firmness})`;
  }

  if (form) form.style.display = 'block';
  if (success) success.style.display = 'none';
  if (modal) modal.style.display = 'flex';
};

window.closeOrderModal = function() {
  const modal = document.getElementById('order-modal');
  if (modal) modal.style.display = 'none';
};

window.submitFinalOrder = function() {
  const name = document.getElementById('m-name').value;
  const phone = document.getElementById('m-phone').value;
  const form = document.getElementById('order-form-euro');
  const success = document.getElementById('m-success');

  if (!phone || phone.length < 8) {
    alert('لطفاً شماره تماس معتبر خود را وارد نمایید.');
    return;
  }

  form.style.display = 'none';
  success.style.display = 'block';
  console.log('سفارش ثبت شد:', { name, phone, config: bespokeConfig });
};
