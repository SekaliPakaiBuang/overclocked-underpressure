// Metrik donathon
const timeLabel = document.querySelector("#timer-time .panel-stats__value");
const speedLabel = document.querySelector("#timer-speed .panel-stats__value");

// Input pengaturan
const initialTimeInput = document.querySelector("input[name=initial_time]");
const initialSpeedInput = document.querySelector("input[name=initial_speed]");
const maxTimeInput = document.querySelector("input[name=max_time]");
const maxSpeedInput = document.querySelector("input[name=max_speed]");

// Input override
const addTimeInput = document.querySelector("input[name=add_time]");
const addSpeedInput = document.querySelector("input[name=add_speed]");

// Tombol
const increaseTimeBtn = document.querySelector("#btn__time-increase");
const decreaseTimeBtn = document.querySelector("#btn__time-decrease");

const increaseSpeedBtn = document.querySelector("#btn__speed-increase");
const decreaseSpeedBtn = document.querySelector("#btn__speed-decrease");

const playBtn = document.querySelector("#btn__timer-play");
const pauseBtn = document.querySelector("#btn__timer-pause");
const resetBtn = document.querySelector("#btn__timer-reset");

const timerSettingSaveBtn = document.querySelector("#btn__save-timer");

// Variabel