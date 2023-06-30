// For Stopwatch button click
$(".stopwatch-btn").click(function () {
	// Hide all other wrappers from the page
	$(".outer-wrapper > div").slideUp();

	// Show stopwatch wrapper
	$(".stopwatch").slideDown();

	// Update type text
	$(".type").html("Stopwatch");
});

// For Back button click
$(".back-btn").click(function () {
	// Hide all other wrappers from the page
	$(".outer-wrapper > div").slideUp();

	// Show clock wrapper
	$(".clock").slideDown();

	// Update type text
	$(".type").html("Clock");
});

// For Timer button click
$(".timer-btn").click(function () {
	// Hide all other wrappers from the page
	$(".outer-wrapper > div").slideUp();

	// Show timer wrapper
	$(".timer").slideDown();

	// Update type text
	$(".type").html("Timer");
});

const addTrailingZero = (num) => {
	return num < 10 ? "0" + num : num;
};

const updateTime = () => {
	const time = new Date();
	let hours = time.getHours();
	let minutes = time.getMinutes();
	let seconds = time.getSeconds();
	let ampm = hours >= 12 ? "PM" : "AM";
	let otherampn = hours >= 12 ? "PM" : "AM";

	// Convert to 12 hour format
	hours = hours % 12 || 12;

	// Add trailing zeros If less then 10
	hours = addTrailingZero(hours);
	minutes = addTrailingZero(minutes);
	seconds = addTrailingZero(seconds);

	$("#hour").html(hours);
	$("#min").html(minutes);
	$("#sec").html(seconds);
	$("#ampm").html(ampm);
	$("#other-ampm").html(otherampn);
};

// Call the function on page load
updateTime();

// Update the time every second
setInterval(updateTime, 1000);

// Sopwatch 
let stopwatchHours = 0,
	stopwatchMinutes = 0,
	stopwatchSeconds = 0,
	stopwatchMilliseconds = 0,
	stopwatchRunning = false,
	laps = 0,
	stopwatchInterval;

const stopwatch = () => {
	// Increase mililseconds by 1
	stopwatchMilliseconds++;

	if (stopwatchMilliseconds == 100){
		// If stopwatch is miliseconds equals 100 increase one second and set ms to 0
		stopwatchMilliseconds = 0;
		stopwatchSeconds++;
	}

	if (stopwatchSeconds == 60){
		// If stopwatch is seconds equals 60 increase one minute and set seconds to 0
		stopwatchSeconds = 0;
		stopwatchMinutes++;
	}

	if (stopwatchMinutes == 60){
		// If stopwatch is minutes equals 60 increase one hour and set minutes to 0
		stopwatchMinutes = 0;
		stopwatchHours++;
	}

	// Show values on document
	$("#stopwatch-hours").html(addTrailingZero(stopwatchHours));
	$("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
	$("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
	$("#stopwatch-milisecond").html(addTrailingZero(stopwatchMilliseconds));//check ID ms or milisecond
};

// Function to start stopwatch
const startStopwatch = () => {
	if (!stopwatchRunning){
		// If stopwatch is not running start it
		stopwatchInterval = setInterval(stopwatch, 10);
		stopwatchRunning = true;
	}
};

// Function to stop stopwatch
const stopStopwatch = () => {
	if (stopwatchRunning){
		// If stopwatch is running stop it
		clearInterval(stopwatchInterval); 
		stopwatchRunning = false;
	}
};

// Function to reset stopwatch
const resetStopwatch = () => {
	// Clear interval and set all values to default values
	clearInterval(stopwatchInterval);
	stopwatchRunning = false;
	stopwatchHours = 0;
	stopwatchMinutes = 0;
	stopwatchSeconds = 0;
	stopwatchMilliseconds = 0;
	laps = 0;

	// Update values to default values 00
	$("#stopwatch-hours").html("00");
	$("#stopwatch-min").html("00");
	$("#stopwatch-sec").html("00");
	$("#stopwatch-milisecond").html("00");
	$(".laps").html("");
};	

// Start stopwatch on start button click
$(".start-stopwatch").click(function (){
	startStopwatch();
	// Hide start button and show lap button
	$(".start-stopwatch").hide();
	$(".lap-stopwatch").show();
});

// Stop stopwatch on stop button click
$(".stop-stopwatch").click(function (){
	stopStopwatch();
	// Hide lap button and show start button
	$(".lap-stopwatch").hide();
	$(".start-stopwatch").show();
});

// Reset stopwatch on reset button click
$(".reset-stopwatch").click(function (){
	resetStopwatch();
	// Hide lap button and show start button
	$(".lap-stopwatch").hide();
	$(".start-stopwatch").show();
});

// lap
$(".lap-stopwatch").click(function (){
	// on lap button click
	laps++;
	// Remove active class
	$(".lap-stopwatch").removeClass("active");

	$(".laps").prepend(
		`<div class="lap active">
			<p>lap ${laps}</p>
			<p>
				${addTrailingZero(stopwatchHours)}:${addTrailingZero(stopwatchMinutes)}:
				${addTrailingZero(stopwatchSeconds)}
			</p>
		</div>`
	)
});

// Timer
let time = 0,
	timerHours = 0,
	timerMinutes = 0,
	timerSeconds = 0,
	timerMilisecond = 0,
	timerInterval;

const getTime = () => {
	time = prompt("Enter time in minutes");
	// Convert minutes to seconds
	time = time * 60;
	// Update timer defults
	setTime();
};

const setTime = () => {
	// Convert seconds to hours, minutes and seconds
	timerHours = Math.floor(time / 3600);
	timerMinutes = Math.floor((time % 3600) / 60);
	timerSeconds = Math.floor(time % 60);

	// Show user input time
	$("#timer-hours").html(addTrailingZero(timerHours));
	$("#timer-min").html(addTrailingZero(timerMinutes));
	$("#timer-sec").html(addTrailingZero(timerSeconds));
	$("#timer-milisecond").html(addTrailingZero(timerMilisecond));
};

const timer = () => {
	timerMilisecond--;
	if (timerMilisecond === -1) {
		timerMilisecond = 99;
		timerSeconds--;
	}
	if (timerSeconds === -1) {
		timerSeconds = 59;
		timerMinutes--;
	}
	if (timerMinutes === -1) {
		timerMinutes = 59;
		timerHours--;
	}

	// Update timer values on document
	$("#timer-hours").html(addTrailingZero(timerHours));
	$("#timer-min").html(addTrailingZero(timerMinutes));
	$("#timer-sec").html(addTrailingZero(timerSeconds));
	$("#timer-milisecond").html(addTrailingZero(timerMilisecond));

	// Check time up on every inverval
	timeUp();

};

const startTimer = () => {
	if (timerHours === 0 && timerMinutes === 0 && timerSeconds === 0 && timerMilisecond === 0){
		// All the values are 0
		getTime();
	}
	// Start timer
	else {
		timerInterval = setInterval(timer, 10);
		$(".start-timer").hide();
		$(".stop-timer").show();
	}
};

const stopTimer = () => {
	// Stop timer
	clearInterval(timerInterval);
	$(".stop-timer").hide();
	$(".start-timer").show();
};

const resetTimer = () => {
	stopTimer();
	time = 0;
	getTime();
};

// Check if time ramaning 0
const timeUp = () => {
	if (timerHours === 0 && timerMinutes === 0 && timerSeconds === 0 && timerMilisecond === 0){
		resetTimer();

		// Show alert
		alert("Timer finished");
		
		// setTime();
	}
};

// Start timer on start button click
$(".start-timer").click(function (){
	startTimer();
});

// Stop timer on stop button click
$(".stop-timer").click(function (){
	stopTimer();
});

// Reset timer on reset button click
$(".reset-timer").click(function (){
	resetTimer();
});
