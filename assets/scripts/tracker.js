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
}

// Event listener for the "Save changes" button in the modal
document.getElementById("save-log-btn").addEventListener("click", saveLog);