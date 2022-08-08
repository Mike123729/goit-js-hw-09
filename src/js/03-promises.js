import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector(`.form`),
  delayField: document.querySelector(`input[name="delay"]`),
  stepField: document.querySelector(`input[name="step"]`),
  amountField: document.querySelector(`input[name="amount"]`),
};

refs.form.addEventListener(`submit`, onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  let counter = 0;
  let delay = 0;

  const timerId = setInterval(() => {
    delay =
      Number(refs.delayField.value) + counter * Number(refs.stepField.value);

    counter += 1;

    if (counter === Number(refs.amountField.value)) {
      clearInterval(timerId);
    }

    createPromise(counter, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })
      .finally(() => e.target.reset());
  }, delay);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
