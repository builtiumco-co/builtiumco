/* =====================================================
   BUILTIUM SERVICES PAGE — services.js
   Handles: modal open/close, form validation,
   submission to Netlify Forms, success/error states
   ===================================================== */

(function () {
  'use strict';

  // ---- Modal helpers ----
  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
    // Move focus into modal
    const firstInput = modal.querySelector('input, select, textarea, button');
    if (firstInput) setTimeout(() => firstInput.focus(), 50);
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  }

  function closeAllModals() {
    document.querySelectorAll('.svc-modal.is-open').forEach(m => {
      m.classList.remove('is-open');
    });
    document.body.classList.remove('modal-open');
  }

  // ---- Mobile Nav Toggle ----
  const hamburger = document.getElementById('nav-hamburger');
  const navLinksEl = document.getElementById('nav-links');
  function closeMobileNav() {
    if (hamburger && navLinksEl) {
      hamburger.setAttribute('aria-expanded', 'false');
      navLinksEl.classList.remove('is-open');
    }
  }
  if (hamburger && navLinksEl) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinksEl.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    navLinksEl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });
  }

  // ---- Button wiring ----
  const btnLaunch = document.getElementById('btn-launch');
  if (btnLaunch) btnLaunch.addEventListener('click', () => {
    closeMobileNav();
    openModal('modal-launch');
  });

  const btnCustom = document.getElementById('btn-custom');
  if (btnCustom) btnCustom.addEventListener('click', () => {
    closeMobileNav();
    openModal('modal-custom');
  });

  // Close on backdrop / close button clicks
  document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', closeAllModals);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeAllModals();
      closeMobileNav();
    }
  });

  // Retry buttons reset form state
  const launchRetry = document.getElementById('launch-retry-btn');
  if (launchRetry) launchRetry.addEventListener('click', () => {
    show('launch-form-state');
    hide('launch-error-state');
  });

  const customRetry = document.getElementById('custom-retry-btn');
  if (customRetry) customRetry.addEventListener('click', () => {
    show('custom-form-state');
    hide('custom-error-state');
  });

  // ---- UI helpers ----
  function show(id) {
    const el = document.getElementById(id);
    if (el) el.hidden = false;
  }
  function hide(id) {
    const el = document.getElementById(id);
    if (el) el.hidden = true;
  }
  function showEl(el) { if (el) el.hidden = false; }
  function hideEl(el) { if (el) el.hidden = true; }

  function setSubmitting(btn, labelEl, spinnerEl, isSubmitting) {
    btn.disabled = isSubmitting;
    if (isSubmitting) {
      hideEl(labelEl);
      showEl(spinnerEl);
    } else {
      showEl(labelEl);
      hideEl(spinnerEl);
    }
  }

  function showFormError(errEl, msg) {
    if (!errEl) return;
    errEl.textContent = msg;
    errEl.classList.add('visible');
    errEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function clearFormError(errEl) {
    if (!errEl) return;
    errEl.textContent = '';
    errEl.classList.remove('visible');
  }

  function markError(input) {
    input.classList.add('error');
    input.addEventListener('input', () => input.classList.remove('error'), { once: true });
  }

  // ---- Validation helpers ----
  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }
  function isValidPhone(v) {
    // Allow +, digits, spaces, dashes, parens — at least 7 chars
    return /^[+\d\s\-()]{7,}$/.test(v.trim());
  }

  function validateRequired(fields, errEl) {
    let valid = true;
    fields.forEach(f => {
      if (!f.value.trim()) {
        markError(f);
        valid = false;
      }
    });
    if (!valid) {
      showFormError(errEl, 'Please fill in all required fields before submitting.');
    }
    return valid;
  }

  function validateEmail(emailInput, errEl) {
    if (!isValidEmail(emailInput.value)) {
      markError(emailInput);
      showFormError(errEl, 'Please enter a valid email address.');
      return false;
    }
    return true;
  }

  function validatePhone(phoneInput, errEl) {
    if (!isValidPhone(phoneInput.value)) {
      markError(phoneInput);
      showFormError(errEl, 'Please enter a valid phone number.');
      return false;
    }
    return true;
  }

  // ---- Netlify Forms submission ----
  function prepareSubmission(form) {
    const formData = new FormData(form);
    const body = new URLSearchParams();

    // Send each checkbox group as one readable list, including every selection.
    // Keep every declared field so unanswered optional questions are explicit.
    const fieldNames = new Set(Array.from(form.elements, field => field.name).filter(Boolean));
    for (const name of fieldNames) {
      const values = formData.getAll(name).map(value => value.trim()).filter(Boolean);
      const isCheckboxGroup = Array.from(form.elements).some(field =>
        field.name === name && field.type === 'checkbox'
      );
      body.set(name, isCheckboxGroup
        ? (values.length ? values.map(value => `• ${value}`).join('\n') : 'Not specified')
        : (values.join('\n') || 'Not specified'));
    }

    // Netlify uses the email field as Reply-To. Never replace the honeypot's
    // empty value with a placeholder: that would flag real enquiries as spam.
    body.set('bot-field', formData.get('bot-field') || '');
    const businessName = body.get('Business name').replace(/[\r\n]+/g, ' ').slice(0, 120);
    body.set('subject', `${formData.get('subject')} | ${businessName}`);
    return body;
  }

  async function performSubmission(form) {
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: prepareSubmission(form).toString()
      });
      if (!response.ok) {
        console.warn('Netlify Forms rejected the submission:', {
          form: form.name,
          status: response.status,
          statusText: response.statusText
        });
      }
      return response.ok;
    } catch (error) {
      console.warn('Netlify Forms submission error:', error);
      return false;
    }
  }

  function bindServiceForm(type) {
    const form = document.getElementById(`form-${type}`);
    if (!form) return;

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const submitBtn = document.getElementById(`${type}-submit-btn`);
      if (submitBtn.disabled) return;

      const errEl = document.getElementById(`${type}-form-error`);
      clearFormError(errEl);

      const businessName = document.getElementById(`${type}-business-name`);
      const contactName = document.getElementById(`${type}-contact-name`);
      const email = document.getElementById(`${type}-email`);
      const phone = document.getElementById(`${type}-phone`);
      if (!validateRequired([businessName, contactName, email, phone], errEl)) return;
      if (!validateEmail(email, errEl) || !validatePhone(phone, errEl)) return;
      if (!form.reportValidity()) return;

      const labelEl = submitBtn.querySelector('.svc-form__submit-label');
      const spinnerEl = submitBtn.querySelector('.svc-form__submit-spinner');
      setSubmitting(submitBtn, labelEl, spinnerEl, true);
      const success = await performSubmission(form);
      setSubmitting(submitBtn, labelEl, spinnerEl, false);

      hide(`${type}-form-state`);
      if (success) {
        hide(`${type}-error-state`);
        const businessNameEl = document.getElementById(`${type}-success-biz`);
        if (businessNameEl) businessNameEl.textContent = businessName.value.trim();
        show(`${type}-success-state`);
      } else {
        show(`${type}-error-state`);
      }
      const panel = document.querySelector(`#modal-${type} .svc-modal__panel`);
      if (panel) panel.scrollTop = 0;
    });
  }

  bindServiceForm('launch');
  bindServiceForm('custom');

})();
