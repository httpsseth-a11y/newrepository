const navLinks = document.querySelectorAll('.nav-link');
const panels = document.querySelectorAll('.mini-panel');
const homeQuote = document.querySelector('.home-quote');
const audio = document.querySelector('.audio-source');
const playButton = document.querySelector('.play-button');
const progress = document.querySelector('.progress');
const currentTime = document.querySelector('.current-time');
const duration = document.querySelector('.duration');

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return '0:00';
  return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
};

const updateProgress = () => {
  const percentage = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  progress.value = percentage;
  progress.style.setProperty('--progress', `${percentage}%`);
  currentTime.textContent = formatTime(audio.currentTime);
};

playButton.addEventListener('click', () => {
  if (audio.paused) audio.play();
  else audio.pause();
});
audio.addEventListener('loadedmetadata', () => {
  duration.textContent = formatTime(audio.duration);
  updateProgress();
});
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('play', () => {
  playButton.textContent = '❚❚';
  playButton.setAttribute('aria-label', 'Pausar música');
  playButton.setAttribute('aria-pressed', 'true');
});
audio.addEventListener('pause', () => {
  playButton.textContent = '▶';
  playButton.setAttribute('aria-label', 'Reproducir música');
  playButton.setAttribute('aria-pressed', 'false');
});
progress.addEventListener('input', () => {
  if (audio.duration) audio.currentTime = (progress.value / 100) * audio.duration;
  updateProgress();
});

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const panelId = link.dataset.panel;

    navLinks.forEach((item) => item.classList.remove('active'));

    if (!panelId) {
      panels.forEach((panel) => { panel.hidden = true; });
      homeQuote.hidden = false;
      link.classList.add('active');
      return;
    }

    event.preventDefault();
    const panel = document.getElementById(panelId);
    const shouldOpen = panel.hidden;

    panels.forEach((item) => { item.hidden = true; });
    if (shouldOpen) {
      panel.hidden = false;
      homeQuote.hidden = true;
      link.classList.add('active');
    } else {
      homeQuote.hidden = false;
    }
  });
});
