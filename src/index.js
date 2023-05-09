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

//forecast

//Temp

function displayTemperature(response) {
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.name;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let weatherIconElement = document.querySelector("#weather-icon");
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIconElement.setAttribute("alt", response.data.weather[0].description);
  celciusTemperature = response.data.main.temp;
}

//City and then temp

function displayNewCity(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#enter-city");
  let cityElement = document.querySelector("#city-name");
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

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", useNavigator);

let city = "Manchester";
let apiKey = "2daf65f0cdaa917f11026e8a128ce271";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

axios.get(apiUrl).then(displayTemperature);

function convertToCelsius(event) {
  event.preventDefault();

  cTemp.classList.add("active");
  fTemp.classList.remove("active");

  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(celciusTemperature);
}

let cTemp = document.querySelector("#celsius");
cTemp.addEventListener("click", convertToCelsius);

function convertToFahrenheit(event) {
  event.preventDefault();

  cTemp.classList.remove("active");
  fTemp.classList.add("active");

  let temperature = document.querySelector("#temp");
  let fahrenheitTemp = (celciusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

let fTemp = document.querySelector("#fahrenheit");
fTemp.addEventListener("click", convertToFahrenheit);

let celciusTemperature = null;

celciusTemperature = response.dara.main.temp;
