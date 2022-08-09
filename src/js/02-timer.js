// Описан в документации
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  btnStartTimer: document.querySelector('button[data-start]'),
  timerDays: document.querySelector('[data-days]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerHours: document.querySelector('[data-hours]'),
  timerSeconds: document.querySelector('[data-seconds]'),
  dataTimePicker: document.querySelector('#datetime-picker'),
};

refs.btnStartTimer.disabled = true;

let timerId = null;
let chooseDate = null;

// Вывод календаря в инпуте
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

flatpickr(refs.dataTimePicker, options);

// Проверка выбранной даты
function onClose(selectedDates) {
  if (selectedDates[0] < options.defaultDate) {
    return Notify.failure('Please choose a date in the future');
  }
  chooseDate = selectedDates[0];
  refs.btnStartTimer.disabled = false;
}

// Запуск таймера по клику
refs.btnStartTimer.addEventListener('click', () => {
  timerId = setInterval(() => {
    const currentTime = Date.now();
    const dateInterval = chooseDate - currentTime;
    const { days, hours, minutes, seconds } = convertMs(dateInterval);

    refs.btnStartTimer.disabled = true;
    refs.dataTimePicker.disabled = true;

    if (dateInterval > 0) {
      updateTimer({ days, hours, minutes, seconds });
    } else {
      clearInterval(timerId);
      Notify.success('Time is over');
    }
  }, 1000);
});

// Обновляет интерфейс таймера
function updateTimer({ days, hours, minutes, seconds }) {
  refs.timerDays.textContent = addLeadingZero(days);
  refs.timerHours.textContent = addLeadingZero(hours);
  refs.timerMinutes.textContent = addLeadingZero(minutes);
  refs.timerSeconds.textContent = addLeadingZero(seconds);
}

// Добавляет "0", если меньше десяти
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Конвертация в дату
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
