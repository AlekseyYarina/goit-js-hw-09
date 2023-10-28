import Notiflix from 'notiflix';

const refs = {
form: document.querySelector('.form'),
delayInput: form.querySelector('input[name="delay"]'),
stepInput: form.querySelector('input[name="step"]'),
amountInput: form.querySelector('input[name="amount"]'),
}


const delay = parseInt(refs.delayInput.value);
const step = parseInt(refs.stepInput.value);
const amount = parseInt(refs.amountInput.value);

refs.form.addEventListener('submit', function (e) {
  e.preventDefault();

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay + (i - 1) * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}