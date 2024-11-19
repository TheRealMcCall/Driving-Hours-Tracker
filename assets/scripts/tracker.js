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

    // Log the trips array to the console
    console.log("Log to check if array is saving properly", trips);

    // use addTrip function to display trip container on the tracker page.
    addTrip();
}

// Function to add trips to the page
function addTrip() {
    let tripContainer = document.getElementById("tripContainer");
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

// Event listener for the "Save changes" button in the modal
document.getElementById("save-log-btn").addEventListener("click", saveLog);