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

// Panel
const settingsPanel = document.querySelector("#settings");
const criteriaPanel = document.querySelector("#criteria");

// Tombol
const playPauseBtn = document.querySelector("#btn__playpause");
const resetBtn = document.querySelector("#btn__reset");

// Inisialisasi variable
if (typeof localStorage.initialTime === "undefined") localStorage.initialTime = 3600;
if (typeof localStorage.initialSpeed === "undefined") localStorage.initialSpeed = 100;
if (typeof localStorage.time === "undefined") localStorage.time = localStorage.initialTime;
if (typeof localStorage.speed === "undefined") localStorage.speed = localStorage.initialSpeed;
if (typeof localStorage.criteria === "undefined") localStorage.criteria = JSON.stringify([{ unit: 1, time: 2, speed: 3 }]);

// Inisialisasi timer dan kriteria trakter
timeLabel.textContent = styleTime(localStorage.time);
speedLabel.textContent = localStorage.speed;

printCriteria();

// Inisialisasi input
initialTimeInput.valueAsNumber = localStorage.initialTime;
initialSpeedInput.valueAsNumber = localStorage.initialSpeed;

// Variabel global
let isRunning = false;
let startTimestamp = 0;
let targetTimestamp = 0;

const channelID = new URLSearchParams(window.location.search).get("id");
if (channelID == null) throw Error("Trakteer Channel ID is not set. Adding ?id= then your trakteer's channel ID on the link and reload should do it");

// Fungsi global
function styleTime(time) {
    let seconds = Math.ceil(time);
    if (time == 0) return "0s";

    let days = Math.floor(seconds / (24 * 60 * 60));
    seconds -= days * (24 * 60 * 60);
    let hours = Math.floor(seconds / (60 * 60));
    seconds -= hours * (60 * 60);
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    let places = 2;
    let out = "";

    if (places > 0 && days > 0) {
        out += `${days}d`;
        places--;
    }
    if (places > 0 && hours > 0) {
        out += `${hours}h`;
        places--;
    }
    if (places > 0 && minutes > 0) {
        out += `${minutes}m`;
        places--;
    }
    if (places > 0 && seconds > 0) {
        out += `${seconds}s`;
        places--;
    }

    return out;
}

function printCriteria() {
    criteriaPanel.innerHTML = "";
    JSON.parse(localStorage.criteria).forEach(el => {
        const { unit, time, speed } = el;

        let unitElement = document.createElement("div");
        let timeElement = document.createElement("div");
        let speedElement = document.createElement("div");

        unitElement.classList.add("criteria-table__value");
        timeElement.classList.add("criteria-table__value");
        speedElement.classList.add("criteria-table__value");

        unitElement.textContent = unit;
        timeElement.textContent = styleTime(time);
        speedElement.textContent = speed;

        criteriaPanel.appendChild(unitElement);
        criteriaPanel.appendChild(timeElement);
        criteriaPanel.appendChild(speedElement);
    });
}