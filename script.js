let searchLocation = "Bandung";
let measurementUnit = "metric";
const apiKey = "G8796BZ69XEMGGGRH42HX5RSQ";

const fetchWeatherData = async (searchLocation, measurementUnit) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchLocation}?unitGroup=${measurementUnit}&key=${apiKey}`
    );

    if (response.status !== 200) {
      console.log(`Response Status: ${response.status}`);
    }
    const weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.log(error);
  }
};

const updateMeasurementUnit = () => {
  const measurementUnitSelector = document.querySelector(
    ".measurement-unit-selector"
  );
  return (measurementUnit = measurementUnitSelector.value);
};

const setDegreeSymbol = () => {
  const measurementUnit = updateMeasurementUnit();
  const degreeSymbol = measurementUnit === "us" ? "°F" : "°C";
  return degreeSymbol;
};

const setSpeedUnit = () => {
  const measurementUnit = updateMeasurementUnit();
  const speedUnit = measurementUnit === "metric" ? "km/h" : "mph";
  return speedUnit;
};

const updateSearchLocation = () => {
  const locationSearchInput = document.querySelector(".location-search-input");
  searchLocation = locationSearchInput.value;
};

const prepareWeatherData = async () => {
  const weatherData = await fetchWeatherData(searchLocation, measurementUnit);

  const location = weatherData.resolvedAddress;
  const timezone = weatherData.timezone;
  const description = weatherData.description;
  const conditions = weatherData.currentConditions.conditions;
  const dateTime = weatherData.currentConditions.datetime;
  const humidity = weatherData.currentConditions.humidity;
  const icon = weatherData.currentConditions.icon;
  const temperature = weatherData.currentConditions.temp;
  const windSpeed = weatherData.currentConditions.windspeed;
  const sunrise = weatherData.currentConditions.sunrise;
  const sunset = weatherData.currentConditions.sunset;
  const days = weatherData.days;

  return {
    location,
    timezone,
    description,
    conditions,
    dateTime,
    humidity,
    icon,
    temperature,
    windSpeed,
    sunrise,
    sunset,
    days,
  };
};

const setWeatherIcon = (weatherData) => {
  const weatherIconMapping = {
    "clear-day": "assets/clear-day.svg",
    "clear-night": "assets/clear-night.svg",
    cloudy: "assets/cloudy.svg",
    fog: "assets/fog.svg",
    hail: "assets/hail.svg",
    "partly-cloudy-day": "assets/partly-cloudy-day.svg",
    "partly-cloudy-night": "assets/partly-cloudy-night.svg",
    "rain-snow-showers-day": "assets/rain-snow-showers-day.svg",
    "rain-snow-showers-night": "assets/rain-snow-showers-night.svg",
    "rain-snow": "assets/rain-snow.svg",
    rain: "assets/rain.svg",
    "showers-day": "assets/showers-day.svg",
    "showers-night": "assets/showers-night.svg",
    sleet: "assets/sleet.svg",
    "snow-showers-day": "assets/snow-showers-day.svg",
    "snow-showers-night": "assets/snow-showers-night.svg",
    snow: "assets/snow.svg",
    "thunder-rain": "assets/thunder-rain.svg",
    "thunder-showers-day": "assets/thunder-showers-day.svg",
    "thunder-showers-night": "assets/thunder-showers-night.svg",
    thunder: "assets/thunder.svg",
    wind: "assets/wind.svg",
  };

  const weatherIcon = document.querySelector(".weather-icon");
  weatherIcon.src = weatherIconMapping[weatherData.icon] || "";
};

const displayCurrentDate = () => {
  const currentDate = new Date();
  const dayOfWeeks = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayDay = dayOfWeeks[currentDate.getDay()];
  const todayDate = currentDate.getDate();
  const todayMonth = currentDate.getMonth();
  const todayYear = currentDate.getFullYear();

  const dayMonthYear = document.querySelector(".day-month-year");
  dayMonthYear.innerHTML = `${todayDay}, ${todayDate} ${todayMonth} ${todayYear}`;
};

const displayCurrentWeather = async (weatherData) => {
  const location = document.querySelector(".location");
  location.innerHTML = weatherData.location;

  const timezone = document.querySelector(".timezone");
  timezone.innerHTML = `Timezone: ${weatherData.timezone}`;

  const description = document.querySelector(".description");
  description.innerHTML = weatherData.description;

  const conditions = document.querySelector(".conditions");
  conditions.innerHTML = weatherData.conditions;

  const dateTime = document.querySelector(".date-time");
  dateTime.innerHTML = `Time: ${weatherData.dateTime}`;

  const humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${weatherData.humidity}%`;

  const temperature = document.querySelector(".temperature");
  const degreeSymbol = setDegreeSymbol();
  temperature.innerHTML = `${weatherData.temperature} ${degreeSymbol}`;

  const windSpeed = document.querySelector(".wind-speed");
  const speedUnit = setSpeedUnit();
  windSpeed.innerHTML = `Wind Speed: ${weatherData.windSpeed} ${speedUnit}`;

  const sunrise = document.querySelector(".sunrise");
  sunrise.innerHTML = `Sunrise: ${weatherData.sunrise}`;

  const sunset = document.querySelector(".sunset");
  sunset.innerHTML = `Sunset: ${weatherData.sunset}`;
};

const resetForecastCards = () => {
  const forecastDashboard = document.querySelector(".forecast-dashboard");
  forecastDashboard.innerHTML = "";
};

const generateForecastCards = () => {
  const forecastDashboard = document.querySelector(".forecast-dashboard");

  for (let i = 0; i < 10; i++) {
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");
    forecastCard.innerHTML = "TEST";
    forecastDashboard.appendChild(forecastCard);
  }
};

const displayForecasts = async (weatherData) => {
  console.log(weatherData.days);
};

const loadDefaultState = async () => {
  const weatherData = await prepareWeatherData();
  displayCurrentDate();
  setWeatherIcon(weatherData);
  displayCurrentWeather(weatherData);
  generateForecastCards();
  displayForecasts(weatherData);
};

document.addEventListener("DOMContentLoaded", loadDefaultState);

const locationSearchForm = document.querySelector(".location-search-form");
locationSearchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  updateMeasurementUnit();
  updateSearchLocation();
  const weatherData = await prepareWeatherData();
  displayCurrentDate();
  setWeatherIcon(weatherData);
  displayCurrentWeather(weatherData);
  resetForecastCards();
  generateForecastCards();
  displayForecasts(weatherData);
});
