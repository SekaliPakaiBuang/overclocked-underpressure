// Logic tombol
timerSettingSaveBtn.addEventListener("click", () => {
    let inputTime = initialTimeInput.valueAsNumber
    let inputSpeed = initialSpeedInput.valueAsNumber

    if (inputTime > 0 && inputSpeed > 0) {
        localStorage.initialTime = inputTime;
        localStorage.initialSpeedInput = inputSpeed;
    }
    else {
        alert("Initial Time & Initial Speed can't be empty or zero")
    }
});

// Logic timer
