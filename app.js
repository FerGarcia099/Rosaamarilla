const petalsContainer = document.getElementById('petals');
const openLetterButton = document.getElementById('openLetter');
const letterCard = document.getElementById('letterCard');
const letterSection = document.getElementById('carta');
const roseTransition = document.getElementById('roseTransition');

function createPetals(total = 18) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < total; i += 1) {
    const petal = document.createElement('span');
    petal.className = 'falling-petal';

    const size = 10 + Math.random() * 14;
    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 10;
    const delay = Math.random() * -16;
    const opacity = 0.35 + Math.random() * 0.55;
    const rotate = `${Math.random() * 180}deg`;

    petal.style.setProperty('--size', `${size}px`);
    petal.style.setProperty('--left', `${left}%`);
    petal.style.setProperty('--duration', `${duration}s`);
    petal.style.setProperty('--delay', `${delay}s`);
    petal.style.setProperty('--opacity', opacity.toFixed(2));
    petal.style.setProperty('--rotate', rotate);

    fragment.appendChild(petal);
  }

  petalsContainer.appendChild(fragment);
}

function enableLetterButton() {
  openLetterButton.disabled = false;
  openLetterButton.classList.add('ready');
}

function restartRoseTransitionAnimation() {
  roseTransition.classList.remove('active', 'closing');
  void roseTransition.offsetWidth;
  roseTransition.classList.add('active');
}

function revealLetterAfterRose() {
  roseTransition.classList.remove('active');
  roseTransition.classList.add('closing');
  document.body.classList.remove('transition-lock');
  letterCard.classList.add('opened');

  window.setTimeout(() => {
    letterSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 160);

  window.setTimeout(() => {
    roseTransition.classList.remove('closing');
  }, 650);
}

openLetterButton.addEventListener('click', () => {
  openLetterButton.classList.remove('ready');
  document.body.classList.add('transition-lock');
  restartRoseTransitionAnimation();

  window.setTimeout(revealLetterAfterRose, 3500);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

createPetals();
window.setTimeout(enableLetterButton, 3200);
