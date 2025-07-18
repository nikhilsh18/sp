const root = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');
toggleBtn.onclick = () => {
  document.body.dataset.theme =
    document.body.dataset.theme === 'dark' ? '' : 'dark';
  localStorage.setItem('theme', document.body.dataset.theme);
};
// restore on load
if (localStorage.getItem('theme') === 'dark') {
  document.body.dataset.theme = 'dark';
}

/* ========= CONTACT FORM ========= */
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
const phoneInput = form.phone;
const phoneHint  = document.getElementById('phoneHint');
const charCount  = document.getElementById('charCount');
const messageBox = form.message;

// live character counter
messageBox.addEventListener('input', () => {
  charCount.textContent = messageBox.value.length;
});

// phone live hint
phoneInput.addEventListener('input', () => {
  const val = phoneInput.value;
  if (val && !/^\+?[\d\s\-()]{7,}$/.test(val)) {
    phoneHint.textContent = 'Only numbers, spaces, (), -, +';
    phoneHint.style.color = 'crimson';
  } else {
    phoneHint.textContent = '';
  }
});

// submission
form.addEventListener('submit', e => {
  e.preventDefault();
  // basic checks
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const email = form.email.value.trim();
  const name  = form.name.value.trim();
  const msg   = form.message.value.trim();
  const phone = form.phone.value.trim();

  if (!name || !email || !msg) {
    showMsg('Please fill in the required fields.', false);
    return;
  }
  if (!emailPattern.test(email)) {
    showMsg('Invalid email address.', false);
    return;
  }

  // success
  showMsg('Message sent! Thank you.', true);
  form.reset();
  charCount.textContent = 0;
});

function showMsg(text, ok) {
  formMsg.textContent = text;
  formMsg.style.color = ok ? 'var(--ok)' : 'var(--error)';
  if (ok) formMsg.classList.add('pulse');
  setTimeout(() => formMsg.classList.remove('pulse'), 1200);
}

/* ========= TO-DO LIST ========= */
const taskInput  = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList   = document.getElementById('taskList');

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.innerHTML = `
    <span>${text}</span>
    <button onclick="this.parentElement.remove()">×</button>
  `;
  taskList.appendChild(li);
  taskInput.value = '';
  taskInput.focus();
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTask();
});