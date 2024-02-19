// Metrik donathon
const timeLabel = document.querySelector("#timer-time .panel-stats__value");
const overclockLabel = document.querySelector("#timer-overclock .panel-stats__value");

// Input pengaturan
const initialTimeInput = document.querySelector("input[name=initial_time]");
const initialOverclockInput = document.querySelector("input[name=initial_overclock]");
const maxTimeInput = document.querySelector("input[name=max_time]");
const maxOverclockInput = document.querySelector("input[name=max_overclock]");

// Input override
const modifyTimeInput = document.querySelector("input[name=add_time]");
const modifyOverclockInput = document.querySelector("input[name=add_overclock]");

// Panel
const settingsPanel = document.querySelector("#settings");
const criteriaPanel = document.querySelector("#criteria");

// Tombol
const playPauseBtn = document.querySelector("#btn__playpause");
const resetBtn = document.querySelector("#btn__reset");

// Inisialisasi variable
if (typeof localStorage.initialTime === "undefined") localStorage.initialTime = 3600;
if (typeof localStorage.initialOverclock === "undefined") localStorage.initialOverclock = 100;
if (typeof localStorage.time === "undefined") localStorage.time = localStorage.initialTime;
if (typeof localStorage.overclock === "undefined") localStorage.overclock = localStorage.initialOverclock;
if (typeof localStorage.criteria === "undefined") localStorage.criteria = JSON.stringify([{ unit: 1, time: 2, overclock: 3 }]);

// Inisialisasi timer dan kriteria trakter
timeLabel.textContent = styleTime(localStorage.time);
overclockLabel.textContent = localStorage.overclock;

printCriteria();

// Inisialisasi input
initialTimeInput.valueAsNumber = localStorage.initialTime;
initialOverclockInput.valueAsNumber = localStorage.initialOverclock;

// Variabel global
let isRunning = false;
let startTimestamp = 0;
let targetTimestamp = 0;

const channelID = new URLSearchParams(window.location.search).get("id");
if (channelID == null) throw Error("Trakteer Channel ID is not set. Adding ?id= then your trakteer's channel ID on the link and reload should do it");

// Fungsi global
function styleTime(time) {
    let sign = time < 0 ? "-" : "";
    let seconds = Math.ceil(Math.abs(time));
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
        out += `${days}d `;
        places--;
    }
    if (places > 0 && hours > 0) {
        out += `${hours}h `;
        places--;
    }
    if (places > 0 && minutes > 0) {
        out += `${minutes}m `;
        places--;
    }
    if (places > 0 && seconds > 0) {
        out += `${seconds}s`;
        places--;
    }

    return sign + out.trim();
}

function printCriteria() {
    criteriaPanel.innerHTML = "";
    JSON.parse(localStorage.criteria).forEach(el => {
        const { unit, time, overclock } = el;

        let unitElement = document.createElement("div");
        let timeElement = document.createElement("div");
        let overclockElement = document.createElement("div");

        unitElement.classList.add("criteria-table__value");
        timeElement.classList.add("criteria-table__value");
        overclockElement.classList.add("criteria-table__value");

        unitElement.textContent = unit;
        timeElement.textContent = styleTime(time);
        overclockElement.textContent = overclock + "%";

        criteriaPanel.appendChild(unitElement);
        criteriaPanel.appendChild(timeElement);
        criteriaPanel.appendChild(overclockElement);
    });
}