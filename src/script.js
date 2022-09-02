let li = document.querySelector("li");
let currentTime = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let currentYear = date.getFullYear();
  let currentDate = date.getDate();
  let currentMonth = months[date.getMonth()];
  let currentDay = days[date.getDay()];
  const str = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false
  });

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} ${str}`;
  return formattedDate;
}
li.innerHTML = formatDate(currentTime);

function changeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form1");
  document.querySelector("#city").innerHTML = searchInput.value;
  let apiKey = "08e614d9ee083d75375e0e9e6cfb6971";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = `wind - ${Math.round(
    response.data.wind.speed
  )} km/h 💨`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `humidity - ${response.data.main.humidity} % 💧`;
  document.querySelector("#feels_like").innerHTML = `feels like ${Math.round(
    response.data.main.feels_like
  )}°C`;
  document.querySelector("#city").innerHTML = `${response.data.name}`;
}

let changeButton = document.querySelector("#city-form");
changeButton.addEventListener("submit", changeCity);

function handlePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let currentButton = document.querySelector("#button");
currentButton.addEventListener("click", getPosition);

// function convertToCelcius(event) {
//   event.preventDefault();
//   let tempCelcius = document.querySelector("#temperature");
//   tempCelcius.innerHTML = ${currentTemperature};
// }
// let celciusLink = document.querySelector("#celsius");
// celciusLink.addEventListener("click", convertToCelcius);

// function convertToFarenheit(event) {
//   event.preventDefault();
//   let tempFarenheit = document.querySelector("#temperature");
//   tempFarenheit.innerHTML = 95;
// }
// let farenheitLink = document.querySelector("#fahrenheit");
// farenheitLink.addEventListener("click", convertToFarenheit);
