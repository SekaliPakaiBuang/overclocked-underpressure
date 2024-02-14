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


function toggleTimer(el) {
    switch (isRunning) {
        case false:
            isRunning = true;
            clock = setInterval(onClockTick, 100000 / trueSpeedScale);

            el.src = "svg/pause.svg";
            el.title = "Pause Timer";
            break;

        case true:
            isRunning = false;
            clearInterval(clock);

            el.src = "svg/play.svg";
            el.title = "Play Timer";
            break;
    }
}

function resetTimer() {
    isRunning = false;
    clearInterval(clock);

    localStorage.time = localStorage.initialTime;
    localStorage.speed = localStorage.initialSpeed;

    setScale();

    timeLabel.textContent = styleTime(localStorage.time);
    speedLabel.textContent = localStorage.speed;

    document.querySelector("#play").src = "svg/play.svg";
}

function addTime() {
    const input = Math.trunc(modifyTimeInput.valueAsNumber);
    if (isNaN(input)) return;

    localStorage.time = Number(localStorage.time) + input;

    if (localStorage.time <= 0) {
        isRunning = false;
        localStorage.time = 0;
        clearInterval(clock);
    }

    timeLabel.textContent = styleTime(localStorage.time);
    timeLabel.classList.add("blink");

    setTimeout(() => timeLabel.classList.remove("blink"), 1500);
}

function addSpeed() {
    const input = Math.trunc(modifySpeedInput.valueAsNumber);
    if (isNaN(input)) return;

    localStorage.speed = Number(localStorage.speed) + input;

    if (localStorage.speed <= 0) localStorage.speed = 1;

    setScale();

    if (isRunning) {
        clearInterval(clock);
        clock = setInterval(onClockTick, 100000 / Number(trueSpeedScale));
    }

    speedLabel.textContent = localStorage.speed;
    speedLabel.classList.add("blink");

    setTimeout(() => speedLabel.classList.remove("blink"), 1500);
}

function toggleSettings(el) {
    settingsPanel.classList.toggle("hidden");
    el.style.transform = settingsPanel.classList.contains("hidden") ? "" : "rotate(180deg)";
}

// Logic timer
let clock;
let isRunning = false;

function onClockTick() {
    localStorage.time -= oneSecondScale;

    if (localStorage.time <= 0) {
        localStorage.time = 0;
        toggleTimer(document.querySelector("#play"));
    }

    timeLabel.textContent = styleTime(localStorage.time);
}