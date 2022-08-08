const refs = {
  startBtn: document.querySelector(`button[data-start]`),
  stopBtn: document.querySelector(`button[data-stop]`),
};

refs.startBtn.addEventListener(`click`, onStartBtnClick);
refs.stopBtn.addEventListener(`click`, onStopBtnClick);

let hasSubscribed = false;
let intervalId = null;

function onStartBtnClick(e) {
  if (!hasSubscribed) {
    intervalId = setInterval(changeBgColor, 1000);
    refs.startBtn.setAttribute('disabled', '');

    refs.stopBtn.removeAttribute('disabled', '');
    hasSubscribed = true;
  }
}

function onStopBtnClick(e) {
  clearInterval(intervalId);
  refs.stopBtn.setAttribute('disabled', '');

  refs.startBtn.removeAttribute('disabled', '');

  hasSubscribed = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBgColor() {
  document.body.style.backgroundColor = `${getRandomHexColor()}`;
}
