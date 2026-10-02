import './scroll-to-top.js';

const form = document.querySelector('#recommendation-form');
const successPanel = document.querySelector('[data-success]');
const anotherButton = document.querySelector('[data-another]');

window.addEventListener('load', () => window.scrollTo(0, 0), { once: true });

form.querySelectorAll('textarea[maxlength]').forEach(textarea => {
  const counter = form.querySelector(`[data-count="${textarea.name}"]`);
  textarea.addEventListener('input', () => {
    counter.textContent = textarea.value.length;
  });
});

const setFieldState = input => {
  const wrapper = input.closest('.field, .check-field');
  if (!wrapper) return input.checkValidity();
  const valid = input.checkValidity();
  wrapper.classList.toggle('invalid', !valid);
  return valid;
};

form.querySelectorAll('input, textarea, select').forEach(input => {
  input.addEventListener('blur', () => setFieldState(input));
  input.addEventListener('input', () => {
    if (input.closest('.invalid')) setFieldState(input);
  });
  input.addEventListener('change', () => setFieldState(input));
});

form.addEventListener('submit', async event => {
  event.preventDefault();
  const inputs = [...form.querySelectorAll('input, textarea, select')];
  const invalid = inputs.filter(input => !setFieldState(input));

  if (invalid.length) {
    invalid[0].focus();
    const note = form.querySelector('.submit-note');
    note.dataset.state = 'error';
    note.textContent = 'Please complete the highlighted fields before sending.';
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  const buttonLabel = button.innerHTML;
  const note = form.querySelector('.submit-note');
  const data = new FormData(form);
  data.set('_subject', `Guest recommendation: ${data.get('guest_name')}`);

  document.body.classList.add('is-sending');
  button.disabled = true;
  button.textContent = 'Sending recommendation…';
  note.dataset.state = 'sending';
  note.textContent = 'Securely sending your recommendation to The SJK Podcast team…';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error('Recommendation request failed');

    form.hidden = true;
    successPanel.hidden = false;
    successPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch {
    note.dataset.state = 'error';
    note.textContent = 'We couldn’t send your recommendation. Please check your connection and try again.';
  } finally {
    document.body.classList.remove('is-sending');
    button.disabled = false;
    button.innerHTML = buttonLabel;
  }
});

anotherButton.addEventListener('click', () => {
  form.reset();
  form.querySelectorAll('[data-count]').forEach(counter => { counter.textContent = '0'; });
  form.querySelectorAll('.invalid').forEach(field => field.classList.remove('invalid'));
  const note = form.querySelector('.submit-note');
  note.textContent = '';
  delete note.dataset.state;
  successPanel.hidden = true;
  form.hidden = false;
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
