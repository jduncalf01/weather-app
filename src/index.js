//Time of Day

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesay",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hour}:${minutes}`;
}

let now = new Date();
let dayTime = document.querySelector("#date");
dayTime.innerHTML = formatDate(now);

//Main Weather
function showTemperature(response) {
  document.querySelector("#degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather").innerHTML = response.data.weather[0].main;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#main-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#main-icon").setAttribute("alt", response.data.weather[0].description);
}
function enterCity(event) {
  event.preventDefault();
  let city = document.querySelector("#inputPassword2").value;
  let apiKey = "203da696788c9b8d29dc0497010394bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentWeather);
}

function getCurrentWeather(position) {
  let apiKey = "203da696788c9b8d29dc0497010394bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let cityForm = document.querySelector("#cityForm");
cityForm.addEventListener("submit", enterCity);

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);
