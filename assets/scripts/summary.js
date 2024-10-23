let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// This will get the current day of the week
let currentday = new Date().getDay();

// console log to check output
console.log(currentday);

// insert weekday into page
document.getElementById('weekday').innerHTML = days[currentday];

// console log to check output that will be put as the day
console.log(days[currentday]);