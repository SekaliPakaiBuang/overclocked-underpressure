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

function toggleSettings() {
    settingsPanel.classList.toggle("hidden");
}

function toggleTimer(pressedTimestamp = performance.now()) {
    if (localStorage.time <= 0) return;
    switch (isRunning) {
        case false:
            isRunning = true;
            startTimestamp = pressedTimestamp;
            targetTimestamp = startTimestamp + (localStorage.time * 100000 / localStorage.speed);

            playPauseBtn.src = "svg/pause.svg";
            break;
        case true:
            isRunning = false;
            localStorage.time = (targetTimestamp - pressedTimestamp) / 1000;

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
        let now = performance.now();

        localStorage.time = (targetTimestamp - now) / 1000;

        if (localStorage.time <= 0) {
            isRunning = true;
            localStorage.time = 0;


            playPauseBtn.src = "svg/play.svg";
        }
    }

    timeLabel.textContent = styleTime(localStorage.time);
    speedLabel.textContent = localStorage.speed;

    requestAnimationFrame(loop);
}
loop();