// Function to calculate hours driven in a trip
function hoursDriven(startTime, endTime) {
    // If either field is not inputted, then return nothing
    if (!startTime || !endTime) return 'Please enter both fields';

    // Split time strings into hours and minutes and convert to numbers
    let [startHour, startMinute] = startTime.split(":").map(Number);
    let [endHour, endMinute] = endTime.split(":").map(Number);
    // Calculate the total minutes driven for each trip
    let totalMinutesDriven = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
    // Convert total into minutes
    let hours = Math.floor(totalMinutesDriven / 60);
    let minutes = totalMinutesDriven % 60;
    // Return the formatted string of hours and minutes driven
    return `${hours} hr(s) and ${minutes} min(s)`;
}

// Function to update the total time driven in the output field for a specific trip
function updateTotalTime(tripNumber) {
    let startTime = document.getElementById(`start-time-trip${tripNumber}`).value;
    let endTime = document.getElementById(`end-time-trip${tripNumber}`).value;
    document.getElementById(`total-time-trip${tripNumber}`).value = hoursDriven(startTime, endTime);
}

// Event listeners to update total time on input changes for each trip
for (let i = 1; i <= 6; i++) {
    ["start-time-trip" + i, "end-time-trip" + i].forEach(function (id) {
        document.getElementById(id).addEventListener("input", function () {
            updateTotalTime(i);
        });
    });
}

// Function to update the total hours driven today
function updateTotalHoursDriven() {
    //create two variables for total hours and minutes driven
    let totalHours = 0;
    let totalMinutes = 0;

    // loop through all trips
    for (let i = 1; i <= 6; i++) {
        // collect start time and end time of all trips
        let startTime = document.getElementById(`start-time-trip${i}`).value;
        let endTime = document.getElementById(`end-time-trip${i}`).value;
        //ensure both start time and end time are provided
        if (startTime && endTime) {
            //split up hours and minutes and convert to numbers
            let [startHour, startMinute] = startTime.split(":").map(Number);
            let [endHour, endMinute] = endTime.split(":").map(Number);
            //convert the total minutes driven into minutes
            let totalMinutesDriven = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
            //converts minutes into hours using floor for full hours then adding to total hours
            totalHours += Math.floor(totalMinutesDriven / 60);
            // takes the remainder after dividing by 60 and storing in totalMinutes variable
            totalMinutes += totalMinutesDriven % 60;
        }
    }

    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;

    document.getElementById('total-time-driven-today').textContent = `${totalHours} hours ${totalMinutes} minutes`;
    console.log("Total Time Driven=", totalHours, totalMinutes);

    // Maximum driving hours per day setting
    const MaxDailyDrivingMinutes = 10 * 60;

    // remaining time calculation
    let remainingMinutes = MaxDailyDrivingMinutes - (totalHours * 60 + totalMinutes);
    let remainingHours = Math.floor(Math.floor(remainingMinutes) / 60);
    remainingMinutes = Math.floor(remainingMinutes) % 60;

    // Set the remaining time text
    let remainingText;
    if (remainingHours >= 0) {
        remainingText = `${remainingHours} hr ${remainingMinutes} min`;
    } else {
        remainingText = `Exceeded by ${Math.floor(remainingHours)} hr ${Math.floor(remainingMinutes)} min`;
    }
    document.getElementById('remaining-time-today').textContent = remainingText;
    console.log("Remaining Time =", remainingText);
}

// Event listeners to update total hours driven today
for (let i = 1; i <= 6; i++) {
    document.getElementById(`start-time-trip${i}`).addEventListener("input", updateTotalHoursDriven);
    document.getElementById(`end-time-trip${i}`).addEventListener("input", updateTotalHoursDriven);
}