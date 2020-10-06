//variable definitions
let timer;
let isRunning = false;
let isValidTime = false;

function notifyMe() {
	//checks if browser supports notifications
	if (!('Notification' in window)) {
		alert('Dieser Browser unterstützt keine Benachrichtigungen!');
	}
	//check if notification permission have already been granted
	else if (Notification.permission === 'granted') {
		//if granted, use this notfication
		let notification = new Notification('Geschafft! Zeit für eine Pause');
	} else if (Notification.permission !== 'denied') {
		Notification.requestPermission().then(function (permission) {
			//if user has accepted, create this notification
			if (permission === 'granted') {
				let notification = new Notification('Geschafft! Zeit für eine Pause');
			}
		});
	}
}

function setTimer() {
	//defitnitons
	let dateTime = new Date();
	let timerDay = dateTime.getDate();
	let timerMonth = dateTime.getMonth() + 1;
	let timerYear = dateTime.getFullYear();
	let timerHour = document.getElementById('hour').value;
	if (timerHour == '') timerHour = 0;
	let timerMin = document.getElementById('min').value;
	if (timerMin == '') timerMin = 0;

	//check if timer has a valid input
	if (isValidTime == false) {
		clearInterval(timer);
		isRunning = false;
	} else {
		timer = setInterval(showTimer, 1000);
		isRunning = true;
	}

	if (isRunning === false) {
		let timerDate =
			timerMonth +
			'/' +
			timerDay +
			'/' +
			timerYear +
			' ' +
			timerHour +
			':' +
			timerMin;
		let end = new Date(timerDate);
		/* let now = new Date(); */
		let second = 1000;
		let minute = second * 60;
		let hour = minute * 60;
		let day = hour * 24;

		//stopWatch render function
		function showTimer() {
			let now = new Date();
			let remainingTime = end - now;

			if (remainingTime <= 0) {
				document.getElementById('timer-display').innerHTML = 'PAUSE!';
				notifyMe();
				clearInterval(timer);
				return;
			}

			let hours = Math.floor((remainingTime % day) / hour);
			let minutes = Math.floor((remainingTime % hour) / minute);
			let seconds = Math.floor((remainingTime % minute) / second);

			document.getElementById('timer-display').innerHTML = hours + 'h ';
			document.getElementById('timer-display').innerHTML += minutes + 'min ';
			document.getElementById('timer-display').innerHTML += seconds + 'sec';
		}

		//conditionals to check for valid time input
		if (timerHour < 8 || timerHour > 16 || timerMin < 0 || timerMin > 59) {
			isValidTime = false;
			window.alert(
				'Bitte geben Sie eine gültige Uhrzeit zwischen 8 und 17 Uhr ein'
			);
			document.getElementById('timer-display').innerHTML = 'Uhrzeit ungültig';
		} else {
			timer = setInterval(showTimer, 1000);
			isRunning = true;
		}
	} else {
		clearInterval(timer);
		document.getElementById('start_stop').innerHTML = 'Start';
		isRunning = false;
	}
}

//timer reset function
function reset() {
	clearInterval(timer);
	document.getElementById('timer-display').innerHTML = 'Pausen-Countdown';
	document.getElementById('start_stop').innerHTML = 'Start';
	document.getElementById('hour').value = '';
	document.getElementById('min').value = '';
	isRunning = false;
}

//timer pause function
function pause() {
	clearInterval(timer);
	document.getElementById('start_stop').innerHTML = 'Start';
	isRunning = false;
}
