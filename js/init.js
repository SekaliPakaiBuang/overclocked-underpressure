// Metrik donathon
const timeLabel = document.querySelector("#timer-time .panel-stats__value");
const speedLabel = document.querySelector("#timer-speed .panel-stats__value");

// Input pengaturan
const initialTimeInput = document.querySelector("input[name=initial_time]");
const initialSpeedInput = document.querySelector("input[name=initial_speed]");
const maxTimeInput = document.querySelector("input[name=max_time]");
const maxSpeedInput = document.querySelector("input[name=max_speed]");

// Input override
const modifyTimeInput = document.querySelector("input[name=add_time]");
const modifySpeedInput = document.querySelector("input[name=add_speed]");

// Inisialisasi variable
if (typeof localStorage.initialTime === "undefined") localStorage.initialTime = 3600;
if (typeof localStorage.initialSpeed === "undefined") localStorage.initialSpeed = 100;
if (typeof localStorage.time === "undefined") localStorage.time = localStorage.initialTime;
if (typeof localStorage.speed === "undefined") localStorage.speed = localStorage.initialSpeed;

timeLabel.textContent = localStorage.time;
speedLabel.textContent = localStorage.speed;

initialTimeInput.valueAsNumber = localStorage.initialTime;
initialSpeedInput.valueAsNumber = localStorage.initialSpeed;