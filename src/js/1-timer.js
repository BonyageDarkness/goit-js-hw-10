import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const loadTimerStyles = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = './css/1-timer.css';
  document.head.appendChild(link);
};

loadTimerStyles();

let userSelectedDate;
const startButton = document.querySelector('[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate > new Date()) {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    } else {
      iziToast.error({ title: 'Please choose a date in the future' });
      startButton.disabled = true;
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  dateTimePicker.disabled = true;

  const countdown = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = userSelectedDate.getTime() - now;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      document.querySelector('[data-days]').textContent = '00';
      document.querySelector('[data-hours]').textContent = '00';
      document.querySelector('[data-minutes]').textContent = '00';
      document.querySelector('[data-seconds]').textContent = '00';
      dateTimePicker.disabled = false;
      startButton.disabled = true;
    } else {
      const time = convertMs(timeLeft);
      document.querySelector('[data-days]').textContent = addLeadingZero(
        time.days
      );
      document.querySelector('[data-hours]').textContent = addLeadingZero(
        time.hours
      );
      document.querySelector('[data-minutes]').textContent = addLeadingZero(
        time.minutes
      );
      document.querySelector('[data-seconds]').textContent = addLeadingZero(
        time.seconds
      );
    }
  }, 1000);
});
