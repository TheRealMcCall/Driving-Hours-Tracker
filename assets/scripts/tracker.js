// create an array to hold trip data
let trips = [];

// Function to save a new trip from the modal
function saveLog() {
    // Get the input values from the modal
    let startTime = document.getElementById("trip-start-time").value;
    let finishTime = document.getElementById("trip-finish-time").value;

    // Add the new trip to the trips array
    trips.push({
        startTime,
        finishTime
    });

    // Log to check trips being added to the array
    console.log("Log to check if array is being added to properly", trips);

    // use addTrip function to display trip container on the tracker page.
    addTrip();
}

// Function to add trips to the page
function addTrip() {
    let tripContainer = document.getElementById("tripContainer");

    // Clear existing trips
    tripContainer.innerHTML = "";

    trips.forEach((trip, index) => {
        let tripDiv = document.createElement("div");
        tripDiv.classList.add("trip-entry");
        tripDiv.innerHTML = `
            <h3>Trip ${index + 1}</h3>
            <p><strong>Start:</strong> ${trip.startTime}</p>
            <p><strong>Finish:</strong> ${trip.finishTime}</p>
            <p><strong>Duration:</strong> [Placeholder for Duration]</p>
        `;
        tripContainer.appendChild(tripDiv);
    });
}

// Function to delete last trip log
function removeLastLog(index) {
    // Remove the trip from the trips array
    trips.splice(index, 1);

    // Re-add the remaining trips to the page
    addTrip();

    // Log to check trips are being removed from the array
    console.log("Log to check if array is being removed from properly", trips);
}

// Event listener for the "Save changes" button in the modal
document.getElementById("save-log-btn").addEventListener("click", saveLog);

// Event listener for the "Remove Last Log" button
document.getElementById("removeLogButton").addEventListener("click", removeLastLog);