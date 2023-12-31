const randomColor = function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
};

const refs = {
  bodyColor: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
let isActive = false;
let timerId;

refs.startBtn.addEventListener('click', () => {
  if (isActive) {
    return;
  }
  timerId = setInterval(() => {
    refs.bodyColor.style.backgroundColor = randomColor();
    isActive = true;
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    ('Stop');
  }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  isActive = false;
  refs.startBtn.disabled = false;
  // ('Start');
  refs.stopBtn.disabled = true;
  console.log(`Интервал с идентификатором ${timerId} остановлен!`);
});
