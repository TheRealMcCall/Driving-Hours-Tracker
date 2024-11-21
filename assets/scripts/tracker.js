// create an array to hold trip data
let trips = [];

// Function to save a new trip from the modal
function saveLog() {
    // Get the input values from the modal
    let startTime = document.getElementById("trip-start-time").value;
    let finishTime = document.getElementById("trip-finish-time").value;

    // Code to ensure both fields are filled out
    if (!startTime || !finishTime) {
        alert("Please enter both start and finish times!");
        return;
    }

    // created variable to hold trip duration in the trips array
    let tripDuration = calculateTripDuration(startTime, finishTime);

    // Add the relevant variables to the trips array trip
    trips.push({
        startTime,
        finishTime,
        tripDuration
    });

    // Log to check trips being added to the array
    console.log("Log to check if array is being added to properly", trips);

    // use addTrip function to display trip container on the tracker page.
    addTrip();

    calculateTotalDrivingTime()
}

// Function to add trips to the page
function addTrip() {
    let tripContainer = document.getElementById("tripContainer");

    // Clear existing trips
    tripContainer.innerHTML = "";

    //Creates a div with information for each trip log saved.
    trips.forEach((trip, index) => {
        let tripDiv = document.createElement("div");
        tripDiv.classList.add("trip-entry");
        tripDiv.innerHTML = `
            <h3>Trip ${index + 1}</h3>
            <p><strong>Start:</strong> ${trip.startTime}</p>
            <p><strong>Finish:</strong> ${trip.finishTime}</p>
            <p><strong>Duration:</strong> ${trip.tripDuration}</p>
        `;
        tripContainer.appendChild(tripDiv);
    });
}

// Function to delete last trip log
function removeLastLog(index) {
    // Remove the last trip log from the trips array
    trips.pop();

    // Re-add the remaining trips to the page
    addTrip();

    // Recalculate total driving time
    calculateTotalDrivingTime();

    // Log to check trips are being removed from the array
    console.log("Log to check if array is being removed from properly", trips);
}

//Function to calculate trip duration
function calculateTripDuration(startTime, finishTime) {
    let [startHour, startMinute] = startTime.split(":").map(Number);
    let [finishHour, finishMinute] = finishTime.split(":").map(Number);

    let startTotalMinutes = startHour * 60 + startMinute;
    let finishTotalMinutes = finishHour * 60 + finishMinute;

    let totalMinutes = finishTotalMinutes - startTotalMinutes;
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    console.log("Time between start and finish time", hours, minutes);

    return `${hours} hours ${minutes} minutes`;
}

// Function to calculate the total driving hours for the day
function calculateTotalDrivingTime() {
    let totalMinutes = 0;

    // Loop through all trips and calculate the total time in minutes
    trips.forEach(trip => {
        let [startHour, startMinute] = trip.startTime.split(":").map(Number);
        let [finishHour, finishMinute] = trip.finishTime.split(":").map(Number);

        let startTotalMinutes = startHour * 60 + startMinute;
        let finishTotalMinutes = finishHour * 60 + finishMinute;

        totalMinutes += (finishTotalMinutes - startTotalMinutes);
    });

    let totalHours = Math.floor(totalMinutes / 60);
    let remainingMinutes = totalMinutes % 60;

    console.log("Calculation of trip time for the day", totalHours, remainingMinutes);

    // Update total time on the page
    document.getElementById("total-time-driven-today").textContent = `${totalHours} hours ${remainingMinutes} minutes`;

    // Calculate the remaining time (assuming maximum daily driving time is 10 hours)
    let maxDailyDrivingTime = 10 * 60;
    let remainingMinutesToday = maxDailyDrivingTime - totalMinutes;
    let remainingHours = Math.floor(remainingMinutesToday / 60);
    let remainingMinutesLeft = remainingMinutesToday % 60;

    console.log("Calculation of remaining time left for the day", maxDailyDrivingTime, "-", totalMinutes, "=", remainingHours, "hours", remainingMinutesLeft, "minutes left");

    document.getElementById("remaining-time-today").textContent = `${remainingHours} hours ${remainingMinutesLeft} minutes`;
}

// Event listener for the "Save changes" button in the modal
document.getElementById("save-log-btn").addEventListener("click", saveLog);

// Event listener for the "Remove Last Log" button
document.getElementById("removeLogButton").addEventListener("click", removeLastLog);