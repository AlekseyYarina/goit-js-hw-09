const randomColor = function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};

const refs = {
  bodyColor: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
let isActive = false;
refs.stopBtn.setAttribute('disabled', "")

refs.startBtn.addEventListener('click', () => {
  if (isActive) {
    return;
  }
  timerId = setInterval(() => {
    refs.bodyColor.style.backgroundColor = randomColor();
    isActive = true
    refs.startBtn.setAttribute('disabled', "")
    refs.stopBtn.removeAttribute('disabled')
  }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  isActive = false;
  refs.startBtn.removeAttribute('disabled')
  refs.stopBtn.setAttribute('disabled', "")
  console.log(`Interval with id ${timerId} has stopped!`);
});
