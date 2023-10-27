import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
};

const datepicker = flatpickr('#datetime-picker', options);

datepicker.config.onChange.push(selectedDates => {
  const selectedDate = selectedDates[0];

  if (selectedDate < new Date()) {
    window.alert('Please choose a date in the future');
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
        alert('Countdown has finished!');
        resetTimerDisplay();
      } else {
        updateTimerDisplay(timeRemaining);
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

  document.querySelector('span[data-days]').textContent = addLeadingZero(days);
  document.querySelector('span[data-hours]').textContent =
    addLeadingZero(hours);
  document.querySelector('span[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('span[data-seconds]').textContent =
    addLeadingZero(seconds);
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
