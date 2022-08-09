import Notiflix from 'notiflix';
Notiflix.Notify.init({
  timeout: 5000,
});

const formElements = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

formElements.form.addEventListener('submit', onFormSubmit);

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

function expectPromice(pos, delay, step) {
  createPromise(pos + 1, delay + step * pos)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

function onFormSubmit(event) {
  event.preventDefault();
  const delay = Number.parseInt(formElements.delay.value);
  const step = Number.parseInt(formElements.step.value);
  const amount = Number.parseInt(formElements.amount.value);
  for (let i = 0; i < amount; i++) {
    expectPromice(i, delay, step);
  }
}
