//Time of Day

function formatDate(timestamp) {
  let date = new Date(timestamp);
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
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hour}:${minutes}`;
}

//Main Weather & Forecast
function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#degrees").innerHTML = Math.round(
    celsiusTemperature
  );
  document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#weather").innerHTML = response.data.weather[0].main;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#main-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#main-icon").setAttribute("alt", response.data.weather[0].description);
}

function showForecast(response) {
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = null;
let forecast = null;


for (let index = 0; index < 6; index++) {
  forecast = response.data.list[index];
  forecastElement.innerHTML += 
          `<div class="col sm">
           <div class="card shadow-sm">
            <p class="card-text">${Math.round(forecast.main.temp_max)}°</p>
            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" class="card-img-top" alt="sunny" />
            <h5 class="card-title">${formatHours(forecast.dt * 1000)}</h5>
          </div>
        </div>`
  
}
}

function search(city) {
  let apiKey = "203da696788c9b8d29dc0497010394bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}

function enterCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#inputPassword2");
  search(cityName.value);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentWeather);
}

function getCurrentWeather(position) {
  let apiKey = "203da696788c9b8d29dc0497010394bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
  
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`
  axios.get(apiUrl).then(showForecast);
}

let cityForm = document.querySelector("#cityForm");
cityForm.addEventListener("submit", enterCity);

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Celsius/Fahrenheit Conversion

function showFahrenheitTemp(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemp);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsiusTemp);

search("New York");