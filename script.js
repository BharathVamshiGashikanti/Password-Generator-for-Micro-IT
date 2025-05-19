const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const resultEl = document.getElementById('result');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const themeToggle = document.getElementById('themeToggle');
const strengthMeter = document.getElementById('strengthMeter').firstElementChild;
const strengthLabel = document.getElementById('strengthLabel');

const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lower = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

function getRandomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

function calculateStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

function updateStrengthUI(password) {
  const strength = calculateStrength(password);
  const levels = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'];
  const colors = ['#ff4d4d', '#ff944d', '#ffcc00', '#66cc66', '#33cc99'];
  strengthMeter.style.width = `${(strength / 5) * 100}%`;
  strengthMeter.style.background = colors[strength - 1] || '#ccc';
  strengthLabel.textContent = `Strength: ${levels[strength - 1] || 'N/A'}`;
}

function generatePassword() {
  const length = +lengthEl.value;
  let chars = '';
  if (uppercaseEl.checked) chars += upper;
  if (lowercaseEl.checked) chars += lower;
  if (numbersEl.checked) chars += numbers;
  if (symbolsEl.checked) chars += symbols;

  if (chars.length === 0) {
    alert('Please select at least one character type.');
    return '';
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += getRandomChar(chars);
  }
  return password;
}

generateBtn.addEventListener('click', () => {
  const password = generatePassword();
  resultEl.value = password;
  updateStrengthUI(password);
});

copyBtn.addEventListener('click', () => {
  if (resultEl.value) {
    navigator.clipboard.writeText(resultEl.value);
    alert('Password copied to clipboard!');
  }
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggle.textContent = document.body.classList.contains('light') ? '🌞' : '🌙';
});