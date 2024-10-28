// Function to calculate hours driven in a trip
function hoursDriven(startTime, endTime) {
    // If either field is not inputted, then return nothing
    if (!startTime || !endTime) return 'Please enter both fields';

    // Log start time
    console.log(startTime);
    // Log end time
    console.log(endTime);

    // Split time strings into hours and minutes and convert to numbers
    let [startHour, startMinute] = startTime.split(":").map(Number);
    let [endHour, endMinute] = endTime.split(":").map(Number);
    // Calculate the total minutes driven
    let totalMinutesDriven = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
    // Convert total minutes into hours and minutes
    let hours = Math.floor(totalMinutesDriven / 60);
    let minutes = totalMinutesDriven % 60;
    console.log(hours, minutes);

    // Return the formatted string of hours and minutes driven
    return `${hours} hr(s) and ${minutes} min(s)`;
}

// Function to update the total time driven in the output field for a specific trip
function updateTotalTime(tripNumber) {
    let startTime = document.getElementById(`start-time-trip${tripNumber}`).value;
    let endTime = document.getElementById(`end-time-trip${tripNumber}`).value;
    document.getElementById(`total-time-trip${tripNumber}`).value = hoursDriven(startTime, endTime);
}

// Add event listeners to update total time on input changes for each trip
for (let i = 1; i <= 6; i++) {
    ["start-time-trip" + i, "end-time-trip" + i].forEach(function (id) {
        document.getElementById(id).addEventListener("input", function () {
            updateTotalTime(i);
        });
    });
}