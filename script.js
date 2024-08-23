let locationQuery = "Bandung";
let measurementUnit = "metric";

const apiKey = "G8796BZ69XEMGGGRH42HX5RSQ";

const fetchWeatherData = async (locationQuery) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationQuery}?unitGroup=${measurementUnit}&key=${apiKey}`
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
  measurementUnit = measurementUnitSelector.value;
};

const updateLocationQuery = () => {
  const locationSearchInput = document.querySelector(".location-search-input");
  locationQuery = locationSearchInput.value;
};

const getWeatherData = async () => {
  const weatherData = await fetchWeatherData(locationQuery);

  const location = weatherData.resolvedAddress;
  const timezone = weatherData.timezone;
  const description = weatherData.description;
  const conditions = weatherData.currentConditions.conditions;
  const humidity = weatherData.currentConditions.humidity;
  const icon = weatherData.currentConditions.icon;
  const temperature = weatherData.currentConditions.temp;

  return {
    location,
    timezone,
    description,
    conditions,
    humidity,
    icon,
    temperature,
  };
};

const setWeatherIcon = (weatherData) => {
  const weatherIcon = document.querySelector(".weather-icon");

  switch (weatherData.icon) {
    case "clear-day":
      return (weatherIcon.src = "assets/clear-day.svg");
    case "clear-night":
      return (weatherIcon.src = "assets/clear-night.svg");
    case "cloudy":
      return (weatherIcon.src = "assets/cloudy.svg");
    case "fog":
      return (weatherIcon.src = "assets/fog.svg");
    case "hail":
      return (weatherIcon.src = "assets/hail.svg");
    case "partly-cloudy-day":
      return (weatherIcon.src = "assets/partly-cloudy-day.svg");
    case "partly-cloudy-night":
      return (weatherIcon.src = "assets/partly-cloudy-night.svg");
    case "rain-snow-showers-day":
      return (weatherIcon.src = "assets/rain-snow-showers-day.svg");
    case "rain-snow-showers-night":
      return (weatherIcon.src = "assets/rain-snow-showers-night.svg");
    case "rain-snow":
      return (weatherIcon.src = "assets/rain-snow.svg");
    case "rain":
      return (weatherIcon.src = "assets/rain.svg");
    case "showers-day":
      return (weatherIcon.src = "assets/showers-day.svg");
    case "showers-night":
      return (weatherIcon.src = "assets/showers-night.svg");
    case "sleet":
      return (weatherIcon.src = "assets/sleet.svg");
    case "snow-showers-day":
      return (weatherIcon.src = "assets/snow-showers-day.svg");
    case "snow-showers-night":
      return (weatherIcon.src = "assets/snow-showers-night.svg");
    case "snow":
      return (weatherIcon.src = "assets/snow.svg");
    case "thunder-rain":
      return (weatherIcon.src = "assets/thunder-rain.svg");
    case "thunder-showers-day":
      return (weatherIcon.src = "assets/thunder-showers-day.svg");
    case "thunder-showers-night":
      return (weatherIcon.src = "assets/thunder-showers-night.svg");
    case "thunder":
      return (weatherIcon.src = "assets/thunder.svg");
    case "wind":
      return (weatherIcon.src = "assets/wind.svg");
    default:
      return null;
  }
};

const displayWeatherData = async (weatherData) => {
  const location = document.querySelector(".location");
  location.textContent = weatherData.location;

  const timezone = document.querySelector(".timezone");
  timezone.textContent = `Timezone: ${weatherData.timezone}`;

  const description = document.querySelector(".description");
  description.textContent = weatherData.description;

  const conditions = document.querySelector(".conditions");
  conditions.textContent = weatherData.conditions;

  const humidity = document.querySelector(".humidity");
  humidity.textContent = `Humidity: ${weatherData.humidity}`;

  const temperature = document.querySelector(".temperature");
  temperature.textContent = weatherData.temperature;
};

const locationSearchForm = document.querySelector(".location-search-form");
locationSearchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  updateMeasurementUnit();
  updateLocationQuery();
  const weatherData = await getWeatherData();
  setWeatherIcon(weatherData);
  displayWeatherData(weatherData);
});
