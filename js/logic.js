// Pengaturan timer umum
function saveTimerSettings() {
    const inputTime = Math.trunc(initialTimeInput.valueAsNumber);
    const inputOverclock = Math.trunc(initialOverclockInput.valueAsNumber * 100) / 100;

    const inputMaxTime = Math.trunc(maxTimeInput.valueAsNumber);
    const inputMaxOverclock = Math.trunc(maxOverclockInput.valueAsNumber * 100) / 100;

    if (inputTime > 0 && inputOverclock > 0) {
        localStorage.initialTime = inputTime;
        localStorage.initialOverclock = inputOverclock;
        alert("Saved successfully");
    } else {
        alert("Initial Time & Initial Overclock should be greater than zero");
    }

    if (!isNaN(inputMaxTime) && inputMaxTime > 0) {
        localStorage.maxTime = inputMaxTime;
    } else {
        localStorage.removeItem("maxTime");
    }

    if (!isNaN(inputMaxOverclock) && inputMaxOverclock > 0) {
        localStorage.maxOverclock = inputMaxOverclock;
    } else {
        localStorage.removeItem("maxOverclock");
    }
}

// Tambah waktu
function addTime(value = 0) {
    const now = performance.now();

    const currentTime = Number(localStorage.time);
    const maxTime = Number(localStorage.maxTime);

    value = Math.trunc(value);

    if (isNaN(value)) return;
    if (!isNaN(maxTime) && (currentTime >= maxTime)) return;

    localStorage.time = currentTime + value;

    if (localStorage.time <= 0) localStorage.time = 0;
    if (localStorage.time >= maxTime) localStorage.time = maxTime;

    startTimestamp = now;
    targetTimestamp = startTimestamp + (localStorage.time * 100000 / localStorage.overclock);

    timeLabel.classList.add("blink");
    setTimeout(() => timeLabel.classList.remove("blink"), 1500);
}

// Tambah kecepatan (overclocking)
function overclock(value = 0) {
    const now = performance.now();

    const currentOverclock = Number(localStorage.overclock);
    const maxOverclock = Number(localStorage.maxOverclock);

    value = Math.trunc(value);

    if (isNaN(value)) return;
    if (!isNaN(maxOverclock) && (currentOverclock >= maxOverclock)) return;

    localStorage.overclock = currentOverclock + value;

    if (localStorage.overclock <= 0) localStorage.overclock = 1;
    if (localStorage.overclock >= maxOverclock) localStorage.overclock = maxOverclock;

    startTimestamp = now;
    targetTimestamp = startTimestamp + (localStorage.time * 100000 / localStorage.overclock);

    overclockLabel.classList.add("blink");
    setTimeout(() => overclockLabel.classList.remove("blink"), 1500);
}

function toggleSettings() {
    settingsPanel.classList.toggle("hidden");
}

// Play/pause
function toggleTimer() {
    const now = performance.now();

    if (localStorage.time <= 0) return;

    switch (isRunning) {
        case false:
            isRunning = true;
            startTimestamp = now;
            targetTimestamp = startTimestamp + (localStorage.time * 100000 / localStorage.overclock);
            playPauseBtn.src = "svg/pause.svg";
            break;
        case true:
            isRunning = false;
            localStorage.time = (targetTimestamp - now) / 1000 * (localStorage.overclock / 100);
            playPauseBtn.src = "svg/play.svg";
            break;
    }
}

// Restart timer
function resetTimer() {
    isRunning = false;

    localStorage.time = localStorage.initialTime;
    localStorage.overclock = localStorage.initialOverclock;

    playPauseBtn.src = "svg/play.svg";
}

// Tambah timer rules
function addCriteria() {
    const unit = Math.trunc(unitInput.valueAsNumber);
    const time = Math.trunc(timeInput.valueAsNumber);
    const overclock = Math.trunc(overclockInput.valueAsNumber);

    if (isNaN(unit) || isNaN(time) || isNaN(overclock)) {
        alert("Unit, Time, and Overclock cannot be empty");
        return;
    }

    if (unit <= 0) {
        alert("Unit should be greater than zero");
        return;
    }

    let criteria = JSON.parse(localStorage.criteria);

    if (criteria.some(el => el.unit === unit)) {
        criteria = criteria.filter(el => el.unit != unit);
    }

    criteria.push({ unit, time, overclock });
    criteria.sort((a, b) => a.unit - b.unit);

    localStorage.criteria = JSON.stringify(criteria);
    updateCriteria();

    unitInput.value = "";
    timeInput.value = "";
    overclockInput.value = "";
}

// Hapus timer rules
function removeCriteria() {
    const unit = Math.trunc(unitInput.valueAsNumber);

    if (isNaN(unit)) {
        alert("Unit cannot be empty");
        return;
    }

    if (unit <= 0) {
        alert("Unit should be greater than zero");
        return;
    }

    let criteria = JSON.parse(localStorage.criteria);

    if (criteria.some(el => el.unit === unit)) {
        criteria = criteria.filter(el => el.unit != unit);
    }
    else {
        alert("Criteria not found");
        return;
    }

    localStorage.criteria = JSON.stringify(criteria);
    updateCriteria();

    unitInput.value = "";
    timeInput.value = "";
    overclockInput.value = "";
}

// Loop untuk timer
let loop = () => {
    if (isRunning) {
        const now = performance.now();

        localStorage.time = (targetTimestamp - now) / 1000 * (localStorage.overclock / 100);

        if (localStorage.time <= 0) {
            isRunning = false;
            localStorage.time = 0;

            playPauseBtn.src = "svg/play.svg";
        }
    }

    timeLabel.textContent = styleTime(localStorage.time);
    overclockLabel.textContent = localStorage.overclock;

    requestAnimationFrame(loop);
}
loop();

// Register Trakteer
TrakteerWS.register(channelID);

// Trakteer Test
TrakteerWS.onStreamTest = ({ quantity }) => {

};

// Trakteer Real
TrakteerWS.onNewTipSuccess = ({ quantity }) => {
    const criteria = JSON.parse(localStorage.criteria);

    while (true) {
        let passingCriteria = criteria.filter(el => el.unit <= quantity);
        passingCriteria.sort((a, b) => b.unit - a.unit);

        if ((passingCriteria[0]?.unit <= quantity) && isRunning) {
            quantity -= passingCriteria[0].unit;

            addTime(passingCriteria[0].time);
            overclock(passingCriteria[0].overclock);
        }
        else break;
    }
};