//Day/Time

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let currentHour = now.getHours();

if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let currentMinutes = now.getMinutes();

if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let dayAndTime = document.querySelector("h3");
dayAndTime.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

//Temp

function displayTemperature(response) {
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.name;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);
}

//City and then temp

function displayNewCity(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#enter-city");
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = enterCity.value;
  let unit = "metric";
  let apiKey = "2daf65f0cdaa917f11026e8a128ce271";
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${enterCity.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiLink).then(displayTemperature);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", displayNewCity);

function getCurrentCity(position) {
  let apiKey = "2daf65f0cdaa917f11026e8a128ce271";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayTemperature);
}

function useNavigator(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentCity);
}

let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", useNavigator);
