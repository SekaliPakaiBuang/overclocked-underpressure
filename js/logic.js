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

function addTime(value = 0) {
    const now = performance.now();
    value = Math.trunc(value);
    if (isNaN(value)) return;

    localStorage.time = Number(localStorage.time) + value
    if (localStorage.time <= 0) localStorage.time = 0;

    startTimestamp = now;
    targetTimestamp = startTimestamp + (localStorage.time * 100000 / localStorage.speed);

    timeLabel.classList.add("blink");
    setTimeout(() => timeLabel.classList.remove("blink"), 1500);
}

function addSpeed(value = 0) {
    const now = performance.now();
    value = Math.trunc(value);
    if (isNaN(value)) return;

    localStorage.speed = Number(localStorage.speed) + value;
    if (localStorage.speed <= 0) localStorage.speed = 1;

    startTimestamp = now;
    targetTimestamp = startTimestamp + (localStorage.time * 100000 / localStorage.speed);

    speedLabel.classList.add("blink");
    setTimeout(() => speedLabel.classList.remove("blink"), 1500);
}

function toggleSettings() {
    settingsPanel.classList.toggle("hidden");
}

function toggleTimer() {
    const now = performance.now();
    if (localStorage.time <= 0) return;

    switch (isRunning) {
        case false:
            isRunning = true;
            startTimestamp = now;
            targetTimestamp = startTimestamp + (localStorage.time * 100000 / localStorage.speed);

            playPauseBtn.src = "svg/pause.svg";
            break;
        case true:
            isRunning = false;
            localStorage.time = (targetTimestamp - now) / 1000 * (localStorage.speed / 100);

            playPauseBtn.src = "svg/play.svg";
            break;
    }
}

function resetTimer() {
    isRunning = false;

    localStorage.time = localStorage.initialTime;
    localStorage.speed = localStorage.initialSpeed;

    playPauseBtn.src = "svg/play.svg";
}

// Logic timer
let loop = () => {
    if (isRunning) {
        const now = performance.now();

        localStorage.time = (targetTimestamp - now) / 1000 * (localStorage.speed / 100);

        if (localStorage.time <= 0) {
            isRunning = false;
            localStorage.time = 0;

            playPauseBtn.src = "svg/play.svg";
        }
    }

    timeLabel.textContent = styleTime(localStorage.time);
    speedLabel.textContent = localStorage.speed;

    requestAnimationFrame(loop);
}
loop();

// Logic Trakteer
TrakteerWS.register(channelID);

// Trakteer Test
TrakteerWS.onStreamTest = ({ quantity }) => {

};

// Trakteer Real
TrakteerWS.onNewTipSuccess = ({ quantity }) => {

};