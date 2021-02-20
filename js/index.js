const body = document.querySelector('body');
const showMoreBtn = document.querySelector('.btn');
const refreshBtn = document.querySelector('.refresh');
const days = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

getData();
getQuote();

function showTime() {
	const date = new Date();
	const hour = date.getHours();
	let minutes = date.getMinutes();
	const timeEl = document.querySelector('.time-display');

	if (minutes < 10) {
		minutes = '0' + minutes;
	}

	timeEl.innerText = `${hour}:${minutes}`;

	setTimeout(showTime, 1000);
}

function showInfo(timezoneAbbr, timezone, dayOfWeek, weekNumber, dayOfYear) {
	const timezoneAbbrEl = document.querySelector('.timezone-abr');
	const timezoneEl = document.querySelector('.timezone');
	const dayOfWeekEl = document.querySelector('.day');
	const weekNumberEl = document.querySelector('.week');
	const dayOfYearEl = document.querySelector('.year');

	timezoneAbbrEl.innerText = timezoneAbbr;
	timezoneEl.innerText = timezone.replace('_', ' ');
	dayOfWeekEl.innerText = days[dayOfWeek];
	weekNumberEl.innerText = weekNumber;
	dayOfYearEl.innerText = dayOfYear;

	if (timezone.length > 10) {
		timezoneEl.classList.add('long');
	}
}

function setTimeOfDay() {
	const today = new Date();
	const greetingEl = document.querySelector('.time-greet');

	// Set background image
	if (today.getHours() > 4 && today.getHours() < 18) {
		body.classList.remove('night');
		body.classList.add('day');
	} else {
		body.classList.remove('day');
		body.classList.add('night');
	}

	// Set greeting message
	if (today.getHours() > 4 && today.getHours() < 12) {
		greetingEl.innerText = 'Good Morning';
	} else if (today.getHours() >= 12 && today.getHours() < 18) {
		greetingEl.innerText = 'Good Afternoon';
	} else {
		greetingEl.innerText = 'Good Evening';
	}

	setTimeout(setTimeOfDay, 1000);
}

// Show Quote
function showQuote(quote, author) {
	const quoteEl = document.querySelector('.quote p');
	const authorEl = document.querySelector('.author');

	quoteEl.innerText = quote;
	authorEl.innerText = author;
}

// Get Quote Data
async function getQuote() {
	const res = await axios.get('http://api.quotable.io/random?minLength=200');
	const data = res.data;
	const { content, author } = data;

	showQuote(content, author);
}

// Get Time Data
async function getData() {
	const res = await axios.get('http://worldtimeapi.org/api/ip');
	const data = res.data;
	const {
		abbreviation,
		timezone,
		day_of_week,
		week_number,
		day_of_year,
	} = data;

	showTime();
	showInfo(abbreviation, timezone, day_of_week, week_number, day_of_year);
	setTimeOfDay();
}

// Toggle Info
showMoreBtn.addEventListener('click', () => {
	const btnText = document.querySelector('.btn span');

	body.classList.toggle('open');

	if (body.classList.contains('open')) {
		btnText.textContent = 'Less';
	} else {
		btnText.textContent = 'More';
	}
});

// Refresh Quote
refreshBtn.addEventListener('click', getQuote);
