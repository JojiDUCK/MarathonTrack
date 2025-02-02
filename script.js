// Welcome Screen -> Class Selection Screen
document.getElementById("start-button").addEventListener("click", function () {
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("class-screen").style.display = "block";
});

// Navigate to Junior Class Screen
document.getElementById("junior-btn").addEventListener("click", function () {
    document.getElementById("class-screen").style.display = "none";
    document.getElementById("junior-screen").style.display = "block";
    generateNameFields("junior-list", 30); // Generate 30 input fields for names
});

// Navigate to Senior Class Screen
document.getElementById("senior-btn").addEventListener("click", function () {
    document.getElementById("class-screen").style.display = "none";
    document.getElementById("senior-screen").style.display = "block";
    generateNameFields("senior-list", 30); // Generate 30 input fields for names
});

// Back buttons for Junior and Senior Screens
document.getElementById("junior-back-btn").addEventListener("click", function () {
    document.getElementById("junior-screen").style.display = "none";
    document.getElementById("class-screen").style.display = "block";
});

document.getElementById("senior-back-btn").addEventListener("click", function () {
    document.getElementById("senior-screen").style.display = "none";
    document.getElementById("class-screen").style.display = "block";
});

// READY Screen -> Navigation Logic
document.getElementById("ready-btn").addEventListener("click", function () {
    document.getElementById("class-screen").style.display = "none";
    document.getElementById("ready-screen").style.display = "block";
});

document.getElementById("back-to-class-btn").addEventListener("click", function () {
    document.getElementById("ready-screen").style.display = "none";
    document.getElementById("class-screen").style.display = "block";
});

// Junior Race Navigation
document.getElementById("start-junior-btn").addEventListener("click", function () {
    document.getElementById("ready-screen").style.display = "none";
    document.getElementById("junior-race-screen").style.display = "block";
    populateRaceList("junior-race-list", "junior-list");
});

// Senior Race Navigation
document.getElementById("start-senior-btn").addEventListener("click", function () {
    document.getElementById("ready-screen").style.display = "none";
    document.getElementById("senior-race-screen").style.display = "block";
    populateRaceList("senior-race-list", "senior-list");
});

// Back to READY Screen
document.getElementById("junior-back-to-ready-btn").addEventListener("click", function () {
    document.getElementById("junior-race-screen").style.display = "none";
    document.getElementById("ready-screen").style.display = "block";
});

document.getElementById("senior-back-to-ready-btn").addEventListener("click", function () {
    document.getElementById("senior-race-screen").style.display = "none";
    document.getElementById("ready-screen").style.display = "block";
});

// Generate input fields for names
function generateNameFields(listId, count) {
    const list = document.getElementById(listId);
    list.innerHTML = ""; // Clear previous inputs, if any
    for (let i = 1; i <= count; i++) {
        const listItem = document.createElement("li");
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Name ${i}`;
        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent default behavior
                const inputs = list.querySelectorAll("input");
                const currentIndex = Array.from(inputs).indexOf(event.target);
                if (currentIndex < inputs.length - 1) {
                    inputs[currentIndex + 1].focus(); // Move to the next input
                }
            }
        });
        listItem.appendChild(input);
        list.appendChild(listItem);
    }
}

// Populate Race List with Names
function populateRaceList(raceListId, classListId) {
    const raceList = document.getElementById(raceListId);
    const classInputs = document.getElementById(classListId).querySelectorAll("input");
    const names = Array.from(classInputs)
        .map((input) => input.value.trim())
        .filter((name) => name !== "") // Remove empty names
        .sort(); // Sort alphabetically

    raceList.innerHTML = ""; // Clear previous list
    names.forEach((name) => {
        const listItem = document.createElement("li");
        listItem.textContent = name;
        raceList.appendChild(listItem);
    });
}