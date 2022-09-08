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
    "Saturday",
  ];
  let day = days[date.getDay()];
  const str = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  let formattedDate = `${day} ${str}`;
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
  document.querySelector("#feels_like").innerHTML = `feels like - ${Math.round(
    response.data.main.feels_like
  )}°C`;
  document.querySelector("#city").innerHTML = `${response.data.name}`;
  document.querySelector(
    "#conditions"
  ).innerHTML = `${response.data.weather[0].description}`;

  celsiusTemperature = response.data.main.temp;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let changeButton = document.querySelector("#city-form");
changeButton.addEventListener("submit", changeCity);

function handlePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function convertToFarenheit(event) {
  event.preventDefault();
  let tempToFarenheit = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#temperature").innerHTML =
    Math.round(tempToFarenheit);
}

function convertToCelsius(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let currentButton = document.querySelector("#button");
currentButton.addEventListener("click", getPosition);

let farenheitLink = document.querySelector("#fahrenheit");
farenheitLink.addEventListener("click", convertToFarenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);
