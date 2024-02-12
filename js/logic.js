// Logic tombol
function saveTimerSettings() {
    const inputTime = Math.trunc(initialTimeInput.valueAsNumber);
    const inputSpeed = Math.trunc(initialSpeedInput.valueAsNumber * 100) / 100;

    if (inputTime > 0 && inputSpeed > 0) {
        localStorage.initialTime = inputTime;
        localStorage.initialSpeed = inputSpeed;

        alert("Successfully saved");
    }
    else alert("Initial Time & Initial Speed should be greater than zero");
}

function playTimer() {
    if (!isRunning) {
        isRunning = true;
        clock = setInterval(onClockTick, 100000 / Number(localStorage.speed));
    }
}

function pauseTimer() {
    isRunning = false;
    clearInterval(clock);
}

function resetTimer() {
    isRunning = false;
    clearInterval(clock);

    localStorage.time = localStorage.initialTime;
    localStorage.speed = localStorage.initialSpeed;

    timeLabel.textContent = localStorage.time;
    speedLabel.textContent = localStorage.speed;

}

async function addTime() {
    const input = Math.trunc(modifyTimeInput.valueAsNumber);
    if (isNaN(input)) return;

    localStorage.time = Number(localStorage.time) + input;

    if (localStorage.time <= 0) {
        isRunning = false;
        localStorage.time = 0;
        clearInterval(clock);
    }

    timeLabel.textContent = localStorage.time;
    timeLabel.classList.add("blink");

    setTimeout(() => timeLabel.classList.remove("blink"), 1500);
}

async function addSpeed() {
    const input = Math.trunc(modifySpeedInput.valueAsNumber);
    if (isNaN(input)) return;

    localStorage.speed = Number(localStorage.speed) + input;

    if (localStorage.speed <= 0) localStorage.speed = 1;

    if (isRunning) {
        clearInterval(clock);
        clock = setInterval(onClockTick, 100000 / Number(localStorage.speed));
    }

    speedLabel.textContent = localStorage.speed;
    speedLabel.classList.add("blink");

    setTimeout(() => speedLabel.classList.remove("blink"), 1500);
}

// Logic timer
let clock;
let isRunning = false;

function onClockTick() {
    localStorage.time -= 1;

    if (localStorage.time <= 0) {
        isRunning = false;
        localStorage.time = 0;
        clearInterval(clock);
    }

    timeLabel.textContent = localStorage.time;
}