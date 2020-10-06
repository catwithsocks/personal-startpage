//function which displays the current date
function showDate() {
	let dateTime = new Date();
	let day = dateTime.getDate();
	let month = dateTime.getMonth() + 1;
	let year = dateTime.getFullYear();

	day = day < 10 ? '0' + day : day;
	month = month < 10 ? '0' + month : month;
	year = year < 10 ? '0' + year : year;

	let date = day + '.' + month + '.' + year;

	document.getElementById('date-display').innerText = date;
	document.getElementById('date-display').textContent = date;
}

//function which displays current time
function showTime() {
	let dateTime = new Date();
	let hours = dateTime.getHours();
	let minutes = dateTime.getMinutes();
	let seconds = dateTime.getSeconds();

	hours = hours < 10 ? '0' + hours : hours;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;

	let time = hours + ':' + minutes + ':' + seconds;

	document.getElementById('time-display').innerText = time;
	document.getElementById('time-display').textContent = time;

	setTimeout(showTime, 1000);
}

//sets the current background according to the button user pressed
function setBg(index) {
	let today = new Date();
	let currentHour = today.getHours();

	if (currentHour < 12 && currentHour >= 6) {
		greeting.textContent = 'Guten Morgen,';
	} else if (currentHour >= 12 && currentHour < 18) {
		greeting.textContent = 'Guten Tag,';
	} else {
		greeting.textContent = 'Guten Abend,';
	}

	let bgArray = [
		'url("assets/images/bg/default.jpg")',
		'url("../assets/images/bg/morning.jpg")',
		'url("assets/images/bg/evening.jpg")',
	];

	document.body.style.backgroundImage = bgArray[index];
}

//sets the greeting that is being shown on the page
function setGreeting() {
	let today = new Date();
	let currentHour = today.getHours();

	if (currentHour < 12 && currentHour >= 6) {
		greeting.textContent = 'Guten Morgen,';
	} else if (currentHour >= 12 && currentHour < 18) {
		greeting.textContent = 'Guten Tag,';
	} else {
		greeting.textContent = 'Guten Abend,';
	}

	setTimeout(setGreeting(), 60000);
}

//blur function to take away input control from user, after inputting the fields
function setBlur() {
	document.getElementById('displayGoal').blur();
}

//checks value in sessionstorage and gets the goal, if something was found
function getGoal() {
	displayGoal =
		localStorage.getItem('displayGoal') === null
			? (displayGoal.textContent = '[Geben Sie Ihr Ziel für Heute ein]')
			: (displayGoal.textContent = localStorage.getItem('displayGoal'));
}

//saves the user input goal into sessionstorage
function setGoal(e) {
	if (e.type === 'keypress' && e.keyCode === 13) {
		localStorage.setItem('displayGoal', e.target.innerText);
		setBlur();
	} else {
		localStorage.setItem('displayGoal', e.target.innerText);
	}
}

//function calls
displayGoal.addEventListener('keypress', setGoal);

showDate();
showTime();
setBg();
getGoal();
