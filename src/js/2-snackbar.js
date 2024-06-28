import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const delayInput = form.elements['delay'].valueAsNumber;
    const state = form.elements['state'].value;

    const promise = new Promise((resolve, reject) => {
      if (state === 'fulfilled') {
        setTimeout(() => {
          resolve(delayInput);
        }, delayInput);
      } else if (state === 'rejected') {
        setTimeout(() => {
          reject(delayInput);
        }, delayInput);
      }
    });

    promise
      .then(delay => {
        iziToast.success({
          title: `✅ Fulfilled promise in ${delay}ms`,
          icon: null,
          position: 'topCenter',
        });
      })
      .catch(delay => {
        iziToast.error({
          title: `❌ Rejected promise in ${delay}ms`,
          icon: null,
          position: 'topCenter',
        });
      });
  });
});
