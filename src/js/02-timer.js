import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const datepicker = flatpickr('#datetime-picker', options);

datepicker.config.onClose.push(selectedDates => {
  const selectedDate = selectedDates[0];

  if (selectedDate < new Date()) {
    Notiflix.Notify.failure('Please choose a date in the future');
    document.querySelector('button[data-start]').disabled = true;
  } else {
    document.querySelector('button[data-start]').disabled = false;
  }
});

document
  .querySelector('button[data-start]')
  .addEventListener('click', startCountdown);

let countdownInterval;

function startCountdown() {
  const selectedDate = datepicker.selectedDates[0];

  if (selectedDate) {
    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
      const currentDate = new Date();
      const timeRemaining = selectedDate - currentDate;

      if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        Notiflix.Notify.success('Countdown has finished!');
        resetTimerDisplay();
        document.querySelector('#datetime-picker').disabled = false;
        document.querySelector('button[data-start]').disabled = false;
      } else {
        updateTimerDisplay(timeRemaining);
        document.querySelector('#datetime-picker').disabled = true;
        document.querySelector('button[data-start]').disabled = true;
      }
    }, 1000);
  }
}

function resetTimerDisplay() {
  document.querySelector('span[data-days]').textContent = '00';
  document.querySelector('span[data-hours]').textContent = '00';
  document.querySelector('span[data-minutes]').textContent = '00';
  document.querySelector('span[data-seconds]').textContent = '00';
}

function updateTimerDisplay(timeRemaining) {
  const { days, hours, minutes, seconds } = convertMs(timeRemaining);

  updateElementWithAnimation('data-days', days);
  updateElementWithAnimation('data-hours', hours);
  updateElementWithAnimation('data-minutes', minutes);
  updateElementWithAnimation('data-seconds', seconds);
}

function updateElementWithAnimation(dataAttribute, value) {
  const element = document.querySelector(`span[${dataAttribute}]`);
  const currentValue = parseInt(element.textContent);

  if (value !== currentValue) {
    const className = value > currentValue ? 'increase' : 'decrease';

    element.classList.remove('increase', 'decrease');
    void element.offsetWidth;
    element.textContent = addLeadingZero(value);
    element.classList.add(className);
  }
}

function convertMs(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
