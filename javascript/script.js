function updateCurrentDate() {
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
  let dayName = days[now.getDay()];
  let hours = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");

  return `${dayName} ${hours}:${minutes}`;
}

function handleSearch(event) {
  event.preventDefault();
  let cityName = searchInput.value.trim();

  if (cityName) {
    findCity(cityName);
    searchInput.value = "";
  }
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    handleSearch(event);
  }
}
function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;

  let tempElement = document.querySelector(".temp");
  tempElement.innerHTML = `☀️ ${temperature}&deg C`;

  cityDisplay.textContent = city;
}

function findCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

let currentWeatherInfo = document.querySelector(".current-weather p");
let cityDisplay = document.querySelector(".current-weather h1");
let searchInput = document.querySelector(".search-input");
let searchButton = document.querySelector(".search-button");
let apiKey = "ob2cf76b441t303bab3624054158f86a";

currentWeatherInfo.innerHTML = `
    ${updateCurrentDate()}, slightly cloudy <br />
    Humidity: <strong>67%</strong> Wind: <strong>6.1km/h</strong>
  `;

searchButton.addEventListener("click", handleSearch);
searchInput.addEventListener("keypress", handleKeyPress);