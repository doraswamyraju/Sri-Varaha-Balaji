/* ==========================================================================
   OM SRI VARAHA BALAJI FAMILY A/C DORMITORY & WAITING HALL - SCRIPTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Set today's date in enquiry date picker
  const dateInput = document.getElementById('enquiryDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      const icon = mobileMenuBtn.querySelector('i');
      if (navMenu.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking nav links
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 3. Gallery Filtering Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 4. Scroll Active Link Highlight
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  });
});

/* ==========================================================================
   WhatsApp Instant Enquiry Form Handler
   ========================================================================== */
function handleWhatsAppForm(event) {
  event.preventDefault();

  const name = document.getElementById('enquiryName').value.trim();
  const phone = document.getElementById('enquiryPhone').value.trim();
  const date = document.getElementById('enquiryDate').value;
  const stayType = document.getElementById('enquiryType').value;
  const members = document.getElementById('enquiryMembers').value;
  const time = document.getElementById('enquiryTime').value;

  const targetWhatsAppNumber = '919000500207';

  // Format a neat, structured message for WhatsApp
  const message = `*Enquiry - OM SRI VARAHA BALAJI DORMITORY (Tirupati)*%0A` +
    `----------------------------------------%0A` +
    `👤 *Name:* ${encodeURIComponent(name)}%0A` +
    `📞 *Phone:* ${encodeURIComponent(phone)}%0A` +
    `📅 *Arrival Date:* ${encodeURIComponent(date)}%0A` +
    `🏨 *Stay Requirement:* ${encodeURIComponent(stayType)}%0A` +
    `👨‍👩‍👧‍👦 *Family Members:* ${encodeURIComponent(members)}%0A` +
    `⏰ *Expected Check-in:* ${encodeURIComponent(time)}%0A` +
    `----------------------------------------%0A` +
    `Please let us know availability, rates & location details.`;

  const waUrl = `https://wa.me/${targetWhatsAppNumber}?text=${message}`;
  window.open(waUrl, '_blank');
}

/* ==========================================================================
   Call Modal (Showing all 3 direct phone numbers)
   ========================================================================== */
function openCallModal() {
  const modal = document.getElementById('callModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCallModal(event) {
  if (event.target.id === 'callModal') {
    closeCallModalDirect();
  }
}

function closeCallModalDirect() {
  const modal = document.getElementById('callModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   Gallery Lightbox Preview
   ========================================================================== */
function openLightbox(imgSrc, caption) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');

  if (modal && img && cap) {
    img.src = imgSrc;
    cap.textContent = caption;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox(event) {
  if (event.target.id === 'lightboxModal') {
    closeLightboxDirect();
  }
}

function closeLightboxDirect() {
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   FAQ Accordion Toggle
   ========================================================================== */
function toggleFaq(button) {
  const item = button.parentElement;
  const isActive = item.classList.contains('active');

  // Close other open accordion items
  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('active');
  });

  if (!isActive) {
    item.classList.add('active');
  }
}
