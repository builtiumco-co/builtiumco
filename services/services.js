/* =====================================================
   BUILTIUM SERVICES PAGE — services.js
   Handles: modal open/close, form validation,
   submission to Netlify function, success/error states
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

  // ---- Button wiring ----
  const btnLaunch = document.getElementById('btn-launch');
  if (btnLaunch) btnLaunch.addEventListener('click', () => openModal('modal-launch'));

  const btnCustom = document.getElementById('btn-custom');
  if (btnCustom) btnCustom.addEventListener('click', () => openModal('modal-custom'));

  // Close on backdrop / close button clicks
  document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', closeAllModals);
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAllModals();
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

  // ---- Collect checkboxes (multiple values same name) ----
  function collectCheckboxes(form, name) {
    const checked = [];
    form.querySelectorAll(`input[name="${name}"]:checked`).forEach(cb => {
      checked.push(cb.value);
    });
    return checked.join(', ');
  }

  function collectRadio(form, name) {
    const radio = form.querySelector(`input[name="${name}"]:checked`);
    return radio ? radio.value : '';
  }

  // ---- LAUNCH FORM ----
  const formLaunch = document.getElementById('form-launch');
  if (formLaunch) {
    formLaunch.addEventListener('submit', async (e) => {
      e.preventDefault();

      const errEl = document.getElementById('launch-form-error');
      clearFormError(errEl);

      const bizName = document.getElementById('launch-business-name');
      const contactName = document.getElementById('launch-contact-name');
      const email = document.getElementById('launch-email');
      const phone = document.getElementById('launch-phone');

      // Required field check
      if (!validateRequired([bizName, contactName, email, phone], errEl)) return;
      // Email format
      if (!validateEmail(email, errEl)) return;
      // Phone format
      if (!validatePhone(phone, errEl)) return;

      const submitBtn = document.getElementById('launch-submit-btn');
      const labelEl = submitBtn.querySelector('.svc-form__submit-label');
      const spinnerEl = submitBtn.querySelector('.svc-form__submit-spinner');
      setSubmitting(submitBtn, labelEl, spinnerEl, true);

      // Collect all form data
      const payload = {
        formType: 'launch',
        businessName: bizName.value.trim(),
        contactName: contactName.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        industry: document.getElementById('launch-industry').value,
        businessDescription: document.getElementById('launch-desc').value.trim(),
        websiteGoals: collectCheckboxes(formLaunch, 'website-goals'),
        brandAssets: collectCheckboxes(formLaunch, 'brand-assets'),
        preferredPages: collectCheckboxes(formLaunch, 'preferred-pages'),
        preferredFeatures: collectCheckboxes(formLaunch, 'preferred-features'),
        inspirationWebsites: document.getElementById('launch-inspiration').value.trim(),
        additionalNotes: document.getElementById('launch-notes').value.trim()
      };

      try {
        const res = await fetch('/.netlify/functions/services-submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok && data.success) {
          // Also submit to Netlify Forms for redundancy
          try {
            const fd = new FormData(formLaunch);
            await fetch('/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams(fd).toString()
            });
          } catch (_) { /* non-fatal */ }

          hide('launch-form-state');
          hide('launch-error-state');
          document.getElementById('launch-success-biz').textContent = payload.businessName;
          show('launch-success-state');
          // Scroll to top of modal panel
          document.querySelector('#modal-launch .svc-modal__panel').scrollTop = 0;
        } else {
          throw new Error(data.error || 'Submission failed.');
        }
      } catch (err) {
        console.error('Launch form error:', err);
        setSubmitting(submitBtn, labelEl, spinnerEl, false);
        hide('launch-form-state');
        show('launch-error-state');
        document.querySelector('#modal-launch .svc-modal__panel').scrollTop = 0;
      }
    });
  }

  // ---- CUSTOM FORM ----
  const formCustom = document.getElementById('form-custom');
  if (formCustom) {
    formCustom.addEventListener('submit', async (e) => {
      e.preventDefault();

      const errEl = document.getElementById('custom-form-error');
      clearFormError(errEl);

      const bizName = document.getElementById('custom-business-name');
      const contactName = document.getElementById('custom-contact-name');
      const email = document.getElementById('custom-email');
      const phone = document.getElementById('custom-phone');

      // Required field check
      if (!validateRequired([bizName, contactName, email, phone], errEl)) return;
      if (!validateEmail(email, errEl)) return;
      if (!validatePhone(phone, errEl)) return;

      const submitBtn = document.getElementById('custom-submit-btn');
      const labelEl = submitBtn.querySelector('.svc-form__submit-label');
      const spinnerEl = submitBtn.querySelector('.svc-form__submit-spinner');
      setSubmitting(submitBtn, labelEl, spinnerEl, true);

      const payload = {
        formType: 'custom',
        businessName: bizName.value.trim(),
        industry: document.getElementById('custom-industry').value,
        businessLocation: document.getElementById('custom-location').value.trim(),
        contactName: contactName.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        existingWebsite: document.getElementById('custom-website').value.trim(),
        businessGoals: collectCheckboxes(formCustom, 'business-goals'),
        servicesRequired: collectCheckboxes(formCustom, 'services-required'),
        existingAssets: collectCheckboxes(formCustom, 'existing-assets'),
        pageCount: collectRadio(formCustom, 'page-count'),
        userAccounts: collectRadio(formCustom, 'user-accounts'),
        onlinePayments: collectRadio(formCustom, 'online-payments'),
        adminDashboard: collectRadio(formCustom, 'admin-dashboard'),
        customerCapabilities: collectCheckboxes(formCustom, 'customer-capabilities'),
        timeline: collectRadio(formCustom, 'timeline'),
        budgetRange: collectRadio(formCustom, 'budget-range'),
        additionalInformation: document.getElementById('custom-info').value.trim()
      };

      try {
        const res = await fetch('/.netlify/functions/services-submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok && data.success) {
          // Netlify Forms fallback
          try {
            const fd = new FormData(formCustom);
            await fetch('/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams(fd).toString()
            });
          } catch (_) { /* non-fatal */ }

          hide('custom-form-state');
          hide('custom-error-state');
          document.getElementById('custom-success-biz').textContent = payload.businessName;
          show('custom-success-state');
          document.querySelector('#modal-custom .svc-modal__panel').scrollTop = 0;
        } else {
          throw new Error(data.error || 'Submission failed.');
        }
      } catch (err) {
        console.error('Custom form error:', err);
        setSubmitting(submitBtn, labelEl, spinnerEl, false);
        hide('custom-form-state');
        show('custom-error-state');
        document.querySelector('#modal-custom .svc-modal__panel').scrollTop = 0;
      }
    });
  }

})();
