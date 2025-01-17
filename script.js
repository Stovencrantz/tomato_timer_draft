var statusSpan = document.querySelector("#status");
var statusToggle = document.querySelector("#status-toggle");
var playButton = document.querySelector("#play");
var pauseButton = document.querySelector("#pause");
var stopButton = document.querySelector("#stop");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var workMinutesInput = document.querySelector("#work-minutes");
var restMinutesInput = document.querySelector("#rest-minutes");
var messageDisplay = document.querySelector("#message");

var totalSeconds = 0;
var secondsElapsed = 0;
var interval;

// PART ONE
// 1) Create a function that intializes a timer by taking the minutes input from the user and setting trhe `totalSeconds` variable. This function will also reset so be sure to clear any existing intervals
// 2) When the timer starts, update the DOM every second to reflect the time left. It is reocmmended that you create seperate functions to properly format the minutes and seconds.
// 3) When the timer is finished, alert the user that it is time to take a break.

// PART TWO - add funcitonality to the pause and stop buttons
// 1) Pause button should temporarily stop the timer. THis means if play is pressed again, the timer will continue where it left off.
// 2) The stop button should reset the timer. If play is pressed again, the timer should start over.

// PART THREE - Add ability to switch back and forth between working time and resting time.
// 1) Set up a variable to keep track of which mode the timer is in.
// 2) If the timer is  in working mode, then it should alert the user "Time for a break" upon completion
// 3) If the timer is in resting mode, it should alert the user "Time to get back to work!" upon completion
// 4) Whenever the switch is clicked, the DOM should update with the current status, and the timer should reset.
// 5) Make sure that the timer is using minutes of work in work mode and minutes of rest, respectively

// PART FOUR - Add localstorage to the app
// 1) Every time the user starts a timer, the minutes of work and minutes of rest shoudl be saved to localStorage
// 2) Upon page load, the minutes of work and minutes of rest input fields should be initialized to their previously stored values.

// BONUS
// 1) Prevent the timer from running when the user enters an invalid input. (numers <= 0)
// 2) rotate the tomato around the circle based on the percent of time remaining in the timer

function formatSeconds(time) {
  return time * 60;
}

function toggle() {
  console.log("checkbox status: ", statusToggle.checked)
  //check if the status toggle is true (working)
  clearInterval(interval);
  secondsElapsed = 0;
  if(statusToggle.checked) {
    statusSpan.textContent = "Working";
    // Render working totalSeconds to min/sec
    totalSeconds = workMinutesInput.value*60;
    let min = Math.floor(totalSeconds/60);
    let sec = Math.floor(totalSeconds%60);
    // minutesDisplay.textContent = min;
    // secondsDisplay.textContent = sec;
    renderTime(min, sec);
  }
  else {
    statusSpan.textContent = "Resting";
    // Render resting totalSeconds to min/sec
    totalSeconds = restMinutesInput.value*60;
    let min = Math.floor(totalSeconds/60);
    let sec = Math.floor(totalSeconds%60);
    // minutesDisplay.textContent = min;
    // secondsDisplay.textContent = sec;
    renderTime(min, sec);
  }
}

function renderTime(min, sec) {
// render a 00:00 format!!! 
  let minText = min;
  let secText = sec;
  if(min < 10) {
    minText = `0${min}`;
  }
  if(sec < 10) {
    secText = `0${sec}`;
    console.log(secText)
  }
  minutesDisplay.textContent = minText;
  secondsDisplay.textContent = secText;
}

function countdown(msg) {
  let minutes;
  let seconds;
  interval = setInterval(function() {
    minutes = Math.floor((totalSeconds-secondsElapsed)/60);
    seconds = (totalSeconds-secondsElapsed)%60;
    renderTime(minutes, seconds)
    console.log(minutes + " : " + seconds)
    if(secondsElapsed >= totalSeconds) {
      clearInterval(interval)
      messageDisplay.textContent = msg;
    }
    secondsElapsed++;
  }, 1000)
}

function startTimer() {
  // Write code to start the timer here
  //check that timers are x>=0;
  console.log("START");
  messageDisplay.textContent = "";
  if(workMinutesInput.value >= 0 && restMinutesInput.value >= 0) {
    // if working use workMin, if resting use restMin
    if(statusToggle.checked === true) {
      totalSeconds = formatSeconds(workMinutesInput.value);
      console.log(totalSeconds)
      let message = "Take a break";
      clearInterval(interval);
      countdown(message)
    }
    else {
      totalSeconds = formatSeconds(restMinutesInput.value);
      console.log(totalSeconds)
      let message = "Get back to work!"
      clearInterval(interval);
      countdown(message)
    }
  }
  else
    alert("Work and Rest timers must be greater than 0")
}

function pauseTimer() {
  clearInterval(interval)
  console.log("PAUSED")
}

function stopTimer() {
  clearInterval(interval);
  secondsElapsed = 0;
  let minutes = totalSeconds/60;
  let seconds = totalSeconds%60;
  renderTime(minutes,seconds);
}


statusToggle.addEventListener("change", toggle);
playButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
stopButton.addEventListener("click", stopTimer);
workMinutesInput.addEventListener("change", function(event) {
  clearInterval(interval);
  secondsElapsed = 0;
});
restMinutesInput.addEventListener("change", function(event) {
  clearInterval(interval);
  secondsElapsed = 0;
})

