// Logic tombol
function saveTimerSettings() {
    const inputTime = Math.trunc(initialTimeInput.valueAsNumber);
    const inputOverclock = Math.trunc(initialOverclockInput.valueAsNumber * 100) / 100;

    if (inputTime > 0 && inputOverclock > 0) {
        localStorage.initialTime = inputTime;
        localStorage.initialOverclock = inputOverclock;

        alert("Successfully saved");
    }
    else alert("Initial Time & Initial Overclock should be greater than zero");
}

function addTime(value = 0) {
    const now = performance.now();
    value = Math.trunc(value);
    if (isNaN(value)) return;

    localStorage.time = Number(localStorage.time) + value;
    if (localStorage.time <= 0) localStorage.time = 0;

    startTimestamp = now;
    targetTimestamp = startTimestamp + (localStorage.time * 100000 / localStorage.overclock);

    timeLabel.classList.add("blink");
    setTimeout(() => timeLabel.classList.remove("blink"), 1500);
}

function overclock(value = 0) {
    const now = performance.now();
    value = Math.trunc(value);
    if (isNaN(value)) return;

    localStorage.overclock = Number(localStorage.overclock) + value;
    if (localStorage.overclock <= 0) localStorage.overclock = 1;

    startTimestamp = now;
    targetTimestamp = startTimestamp + (localStorage.time * 100000 / localStorage.overclock);

    overclockLabel.classList.add("blink");
    setTimeout(() => overclockLabel.classList.remove("blink"), 1500);
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

function resetTimer() {
    isRunning = false;

    localStorage.time = localStorage.initialTime;
    localStorage.overclock = localStorage.initialOverclock;

    playPauseBtn.src = "svg/play.svg";
}

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
    
    criteria.push({unit, time, overclock});
    criteria.sort((a, b) => a.unit - b.unit);
    
    localStorage.criteria = JSON.stringify(criteria);
    updateCriteria();

    unitInput.value = "";
    timeInput.value = "";
    overclockInput.value = "";
}

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

// Logic timer
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

// Logic Trakteer
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