const toggle = document.querySelector('#timer-input-show');
const timerInput = document.querySelector('.timer-input');

//eventlistener timer for toggling timer input fields
toggle.addEventListener('click', () => {
	timerInput.classList.toggle('active');
});
