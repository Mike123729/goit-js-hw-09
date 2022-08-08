// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

// import Notiflix from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  input: document.querySelector(`#datetime-picker`),
  btnStart: document.querySelector(`button[type="button"]`),

  daysOutput: document.querySelector(`span[data-days]`),
  hoursOutput: document.querySelector(`span[data-hours]`),
  minutesOutput: document.querySelector(`span[data-minutes]`),
  secondsOutput: document.querySelector(`span[data-seconds]`),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chooseDate = selectedDates[0];

    checkValidDate();
  },
};

flatpickr('#datetime-picker', options);

let chooseDate = null;

refs.btnStart.setAttribute('disabled', '');

refs.btnStart.addEventListener(`click`, onBtnStartClick);

function checkValidDate() {
  const currentDate = new Date();

  if (chooseDate.getTime() < currentDate.getTime()) {
    Report.warning(
      'Atention',
      'Please choose a date in the future',
      'Understand'
    );
    return;
  }
  refs.btnStart.removeAttribute('disabled', '');
}

function onBtnStartClick(e) {
  const timerId = setInterval(() => {
    const currentDate = new Date();

    const deltaTime = chooseDate.getTime() - currentDate.getTime();

    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    refs.daysOutput.textContent = days;
    refs.hoursOutput.textContent = hours;
    refs.minutesOutput.textContent = minutes;
    refs.secondsOutput.textContent = seconds;

    if (
      refs.daysOutput.textContent === '00' &&
      refs.hoursOutput.textContent === '00' &&
      refs.minutesOutput.textContent === '00' &&
      refs.secondsOutput.textContent === '00'
    ) {
      clearInterval(timerId);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
