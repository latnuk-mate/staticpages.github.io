
    // Mobile Menu Toggle
    function toggleMobileMenu() {
      const menu = document.getElementById('mobileMenu');
      menu.classList.toggle('hidden');
    }

    // Treatment Category Filter
    function filterCategory(category, buttonElement) {
      // Toggle button styles
      document.querySelectorAll('.menu-tab-btn').forEach(btn => {
        btn.classList.remove('bg-brand-charcoal', 'text-white');
        btn.classList.add('text-brand-charcoal');
      });
      buttonElement.classList.add('bg-brand-charcoal', 'text-white');
      buttonElement.classList.remove('text-brand-charcoal');

      // Filter cards
      const cards = document.querySelectorAll('.treatment-card');
      cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // Booking Modal Interactions
    function openBookingModal(serviceName = '') {
      const modal = document.getElementById('bookingModal');
      const select = document.getElementById('treatmentSelect');
      const form = document.getElementById('reservationForm');
      const successMsg = document.getElementById('modalSuccessMsg');

      if (serviceName && select) {
        let matched = false;
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].text.includes(serviceName) || select.options[i].value.includes(serviceName)) {
            select.selectedIndex = i;
            matched = true;
            break;
          }
        }
        if (!matched) {
          select.value = 'Custom Bespoke Journey';
        }
      }

      form.classList.remove('hidden');
      successMsg.classList.add('hidden');
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // lock scrolling
      lucide.createIcons();
    }

    function closeBookingModal() {
      const modal = document.getElementById('bookingModal');
      modal.classList.add('hidden');
      document.body.style.overflow = ''; // unlock scrolling
    }

    // Close modal if user clicks outside of modal container
    window.addEventListener('click', function(e) {
      const modal = document.getElementById('bookingModal');
      if (e.target === modal) {
        closeBookingModal();
      }
    });

    // Form Submission Handling
    function handleBookingSubmit(event) {
      event.preventDefault();
      const form = document.getElementById('reservationForm');
      const successMsg = document.getElementById('modalSuccessMsg');
      
      form.classList.add('hidden');
      successMsg.classList.remove('hidden');
      lucide.createIcons();
    }

    // Newsletter Handling
    function handleNewsletter(event) {
      event.preventDefault();
      const successText = document.getElementById('newsletterSuccess');
      successText.classList.remove('hidden');
      event.target.reset();
    }
