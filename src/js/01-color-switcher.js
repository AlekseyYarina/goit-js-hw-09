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
refs.stopBtn.disabled = true; // Установка кнопки как неактивной

refs.startBtn.addEventListener('click', () => {
  if (isActive) {
    return;
  }
  timerId = setInterval(() => {
    refs.bodyColor.style.backgroundColor = randomColor();
    isActive = true;
    refs.startBtn.disabled = true; // Установка кнопки "Start" как неактивной
    refs.stopBtn.disabled = false; // Удаление неактивного состояния кнопки "Stop"
  }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  isActive = false;
  refs.startBtn.disabled = false; // Удаление неактивного состояния кнопки "Start"
  refs.stopBtn.disabled = true; // Установка кнопки "Stop" как неактивной
  console.log(`Интервал с идентификатором ${timerId} остановлен!`);
});