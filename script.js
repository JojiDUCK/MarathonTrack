// Track race state
let raceTimers = {}; // To store timers for each runner
let raceLaps = {};   // To track laps for each runner

// Welcome Screen -> Class Selection Screen
document.getElementById("start-button").addEventListener("click", function () {
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("class-screen").style.display = "block";
});

// Navigate to Junior Class Screen
document.getElementById("junior-btn").addEventListener("click", function () {
    document.getElementById("class-screen").style.display = "none";
    document.getElementById("junior-screen").style.display = "block";
    prepopulateNameFields("junior-list", "junior-names", 30);
});

// Navigate to Senior Class Screen
document.getElementById("senior-btn").addEventListener("click", function () {
    document.getElementById("class-screen").style.display = "none";
    document.getElementById("senior-screen").style.display = "block";
    prepopulateNameFields("senior-list", "senior-names", 30);
});

// DONE button for Junior Class Screen
document.getElementById("junior-done-btn").addEventListener("click", function () {
    saveNameList("junior-list", "junior-names");
    document.getElementById("junior-screen").style.display = "none";
    document.getElementById("class-screen").style.display = "block";
});

// DONE button for Senior Class Screen
document.getElementById("senior-done-btn").addEventListener("click", function () {
    saveNameList("senior-list", "senior-names");
    document.getElementById("senior-screen").style.display = "none";
    document.getElementById("class-screen").style.display = "block";
});

// BACK button for Junior Class Screen
document.getElementById("junior-back-btn").addEventListener("click", function () {
    document.getElementById("junior-screen").style.display = "none";
    document.getElementById("class-screen").style.display = "block";
});

// BACK button for Senior Class Screen
document.getElementById("senior-back-btn").addEventListener("click", function () {
    document.getElementById("senior-screen").style.display = "none";
    document.getElementById("class-screen").style.display = "block";
});

// READY Screen -> Navigation Logic
document.getElementById("ready-btn").addEventListener("click", function () {
    document.getElementById("class-screen").style.display = "none";
    document.getElementById("ready-screen").style.display = "block";
});

// GO Buttons - Junior and Senior Races
document.getElementById("junior-go-btn").addEventListener("click", function () {
    startRace("junior-race-list", "junior-names", "junior");
});
document.getElementById("senior-go-btn").addEventListener("click", function () {
    startRace("senior-race-list", "senior-names", "senior");
});

// Start the race
function startRace(raceListId, storageKey, raceType) {
    const raceList = document.getElementById(raceListId);
    const names = JSON.parse(sessionStorage.getItem(storageKey)) || [];
    raceTimers = {};
    raceLaps = {};

    raceList.innerHTML = ""; // Clear the list
    names.forEach((name) => {
        raceTimers[name] = 0;
        raceLaps[name] = 0;

        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${name}</span>
            <span id="${raceType}-timer-${name}">0:00</span>
        `;
        listItem.style.backgroundColor = "green";
        listItem.style.cursor = "pointer";
        listItem.addEventListener("click", function () {
            recordLap(name, listItem, raceType);
        });
        raceList.appendChild(listItem);
    });

    const intervalId = setInterval(() => {
        names.forEach((name) => {
            raceTimers[name] += 1;
            const timerElement = document.getElementById(`${raceType}-timer-${name}`);
            if (timerElement) {
                timerElement.textContent = formatTime(raceTimers[name]);
            }
        });
    }, 1000);
    raceTimers["intervalId"] = intervalId;
}

// Record a lap
function recordLap(name, listItem, raceType) {
    raceLaps[name] += 1;

    if (raceLaps[name] === 2) {
        listItem.style.backgroundColor = "yellow";
    } else if (raceLaps[name] === 3) {
        listItem.style.backgroundColor = "red";
    } else if (raceLaps[name] === 4) {
        listItem.style.backgroundColor = "gray";
    }

    const allFinished = Object.values(raceLaps).every((laps) => laps >= 4);
    if (allFinished) {
        document.getElementById(`${raceType}-done-btn`).style.display = "block";
    }
}

// Format timer to mm:ss
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Save name list
function saveNameList(listId, storageKey) {
    const inputs = document.getElementById(listId).querySelectorAll("input");
    const names = Array.from(inputs)
        .map((input) => input.value.trim())
        .filter((name) => name !== "");
    sessionStorage.setItem(storageKey, JSON.stringify(names));
}

// Prepopulate name fields
function prepopulateNameFields(listId, storageKey, count) {
    const list = document.getElementById(listId);
    const savedNames = JSON.parse(sessionStorage.getItem(storageKey)) || [];
    list.innerHTML = "";
    for (let i = 1; i <= count; i++) {
        const listItem = document.createElement("li");
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Name ${i}`;
        input.value = savedNames[i - 1] || ""; // Prepopulate if available
        listItem.appendChild(input);
        list.appendChild(listItem);
    }
}