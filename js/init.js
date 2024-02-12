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

// Panel pengaturan
const settingsPanel = document.querySelector("#settings");

// Inisialisasi variable
if (typeof localStorage.initialTime === "undefined") localStorage.initialTime = 3600;
if (typeof localStorage.initialSpeed === "undefined") localStorage.initialSpeed = 100;
if (typeof localStorage.time === "undefined") localStorage.time = localStorage.initialTime;
if (typeof localStorage.speed === "undefined") localStorage.speed = localStorage.initialSpeed;

timeLabel.textContent = styleTime(localStorage.time);
speedLabel.textContent = localStorage.speed;

initialTimeInput.valueAsNumber = localStorage.initialTime;
initialSpeedInput.valueAsNumber = localStorage.initialSpeed;

// Fungsi global
function styleTime(time) {
    let seconds = time;
    if (time==0) return "0s";

    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds -= days * (24 * 60 * 60);

    const hours = Math.floor(seconds / (60 * 60));
    seconds -= hours * (60 * 60);

    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    let places = 2;
    let out = "";

    if (places>0 && days > 0) {
        out += `${days}d`;
        places--;
    }
    if (places>0 && hours > 0) {
        out += `${hours}h`;
        places--;
    }
    if (places>0 && minutes > 0) {
        out += `${minutes}m`;
        places--;
    }
    if (places>0 && seconds > 0) {
        out += `${seconds}s`;
        places--;
    }

    return out;
}