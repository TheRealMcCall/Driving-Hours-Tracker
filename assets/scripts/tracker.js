// create an array to hold trip data
let trips = [];

// Function to save a new trip from the modal
function saveLog() {
    // Get the input values from the modal
    let startTime = document.getElementById("tripStartTime").value;
    let finishTime = document.getElementById("tripFinishTime").value;
    let isOvernight = document.getElementById("overnightTrip").checked;

    // Code to ensure both fields are filled out
    if (!startTime || !finishTime) {
        alert("Please enter both start and finish times!");
        return;
    }

    let tripData;
    if (isOvernight) {
        tripData = calculateOvernightTripDuration(startTime, finishTime);
    } else {
        // Code to ensure finish time is later than start time
        if (finishTime <= startTime) {
            alert("Finish Time must be later than Start Time!");
            return;
        }
        // created variable to hold trip duration in the trips array
        tripData = calculateTripDuration(startTime, finishTime);
    }

    // Add the relevant variables to the trips array trip
    trips.push({
        startTime,
        finishTime,
        tripDuration: tripData.formatted,
        tripDurationInMinutes: tripData.duration,
        isOvernight
    });

    // Log to check trips being added to the array
    console.log("Log to check if array is being added to properly", trips);

    // use addTrip function to display trip container on the tracker page.
    addTrip();

    calculateTotalDrivingTime()
    checkMaximumTripDuration()
}

// Function to add trips to the page
function addTrip() {
    let tripContainer = document.getElementById("tripContainer");

    // Clear existing trips
    tripContainer.innerHTML = "";

    //Creates a div with information for each trip log saved.
    trips.forEach((trip, index) => {
        let tripDiv = document.createElement("div");
        tripDiv.classList.add("trip-list")
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

    // Check to see that there are logs to be deleted
    if (trips < 1) {
        alert("No logs have been created yet");
        return;
    }

    // Remove the last trip log from the trips array
    trips.pop();

    // Re-add the remaining trips to the page
    addTrip();

    // Recalculate total driving time
    calculateTotalDrivingTime();

    // Check to see if any trips have exceeded their duration
    checkMaximumTripDuration()

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

    return {
        // duration in minutes
        duration: totalMinutes,
        // duration in text format
        formatted: `${hours} hours ${minutes} minutes`
    };
}

// Function to calculate trip duration when the trip is overnight
function calculateOvernightTripDuration(startTime, finishTime) {
    let [startHour, startMinute] = startTime.split(":").map(Number);
    let [finishHour, finishMinute] = finishTime.split(":").map(Number);

    // Add 24 hours to the finish time to account for overnight trips
    finishHour += 24;

    let startTotalMinutes = startHour * 60 + startMinute;
    let finishTotalMinutes = finishHour * 60 + finishMinute;

    let totalMinutes = finishTotalMinutes - startTotalMinutes;
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    console.log("Overnight trip duration:", hours, "hours", minutes, "minutes");

    return {
        // duration in minutes
        duration: totalMinutes,
        // duration in text format
        formatted: `${hours} hours ${minutes} minutes`
    };
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

        // If there is an overnight trip then add 1440 minutes to the total time driven
        if (trip.isOvernight) {
            finishTotalMinutes += 1440
        }

        totalMinutes += (finishTotalMinutes - startTotalMinutes);
    });

    let totalHours = Math.floor(totalMinutes / 60);
    let remainingMinutes = totalMinutes % 60;

    console.log("Calculation of trip time for the day", totalHours, remainingMinutes);

    // Update total time on the page
    document.getElementById("totalTimeDrivenToday").textContent = `${totalHours} hours ${remainingMinutes} minutes`;

    // Calculate the remaining time (assuming maximum daily driving time is 10 hours)
    let maxDailyDrivingTime = 10 * 60;
    let remainingMinutesToday = maxDailyDrivingTime - totalMinutes;
    let remainingHours = Math.floor(remainingMinutesToday / 60);
    let remainingMinutesLeft = remainingMinutesToday % 60;

    console.log("Calculation of remaining time left for the day", maxDailyDrivingTime, "-", totalMinutes, "=", remainingHours, "hours", remainingMinutesLeft, "minutes left");

    document.getElementById("remainingTimeToday").textContent = `${remainingHours} hours ${remainingMinutesLeft} minutes`;

    // Code to change colour based on whether the driving hours are less or more than 10
    let totalTimeDisplay = document.getElementById("totalTimeDrivenToday");
    if (totalMinutes < 601) {
        totalTimeDisplay.classList.add("driving-time-acceptable");
        totalTimeDisplay.classList.remove("driving-time-not-acceptable");
    } else {
        totalTimeDisplay.classList.add("driving-time-not-acceptable");
        totalTimeDisplay.classList.remove("driving-time-acceptable");
    }

    let remainingHoursDisplay = document.getElementById("remainingTimeToday");
    if (totalMinutes > 600) {
        remainingHoursDisplay.textContent = "You have exceeded your driving hours for today";
        remainingHoursDisplay.classList.add("driving-time-not-acceptable");
        remainingHoursDisplay.classList.remove("driving-time-acceptable");
    } else if (totalMinutes > 599) {
        remainingHoursDisplay.textContent = "You have run out of driving time today";
        remainingHoursDisplay.classList.add("driving-time-not-acceptable");
        remainingHoursDisplay.classList.remove("driving-time-acceptable");
    } else {
        remainingHoursDisplay.classList.add("driving-time-acceptable");
        remainingHoursDisplay.classList.remove("driving-time-not-acceptable");
    }
}

// Check if any trip's duration in minutes exceeds 330 minutes (5.5 hours)
function checkMaximumTripDuration() {

    let exceedsDuration = trips.some(trip => trip.tripDurationInMinutes > 330);

    let tripDurationAllowed = document.getElementById("tripDurationAllowed");
    if (exceedsDuration) {
        tripDurationAllowed.textContent = "One or more trips exceed the maximum allowed duration!";
        tripDurationAllowed.classList.add("driving-time-not-acceptable");
        tripDurationAllowed.classList.remove("driving-time-acceptable");
    } else {
        tripDurationAllowed.textContent = "All trips are within allowed trip duration";
        tripDurationAllowed.classList.add("driving-time-acceptable");
        tripDurationAllowed.classList.remove("driving-time-not-acceptable");
    }
}

// Event listener for the "Save changes" button in the modal
document.getElementById("saveLogButton").addEventListener("click", saveLog);

// Event listener for the "Remove Last Log" button
document.getElementById("removeLogButton").addEventListener("click", removeLastLog);