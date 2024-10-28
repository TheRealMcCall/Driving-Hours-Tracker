// Function to calculate hours driven in a trip
function hoursDriven() {
    // Collect user input for start time and end time of the trip
    let startTime1 = document.getElementById("start-time-trip1").value;
    let endTime1 = document.getElementById("end-time-trip1").value;

    // Log start time
    console.log(startTime1);
    // Log end time
    console.log(endTime1);

    // If either field is not inputted, then return nothing
    if (!startTime1 || !endTime1) return '';

    // Split time strings into hours and minutes and convert to numbers
    let [startHour, startMinute] = startTime1.split(":").map(Number);
    let [endHour, endMinute] = endTime1.split(":").map(Number);
    console.log(startHour, startMinute);

    // Calculate the total minutes driven
    let totalMinutesDriven = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
    console.log(totalMinutesDriven);

    // Convert total minutes into hours and minutes
    let hours = Math.floor(totalMinutesDriven / 60);
    let minutes = totalMinutesDriven % 60;
    console.log(hours, minutes);

    // Return the formatted string of hours and minutes driven
    return `${hours} hr(s) and ${minutes} min(s)`;
}

// Function to update the total time driven in the output field
function updateTotalTime() {
    document.getElementById('total-time-trip1').value = hoursDriven();
}

// Event listener to update total time on input changes
["start-time-trip1", "end-time-trip1"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", updateTotalTime);
});

document.getElementById('addTrip2').addEventListener('click', function () {
    document.getElementById('trip2').classList.remove('hidden');
});

document.getElementById('removeTrip2').addEventListener('click', function () {
    document.getElementById('trip2').classList.add('hidden');
});