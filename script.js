let searchLocation = "Bandung";
let measurementUnit = "metric";
const apiKey = "G8796BZ69XEMGGGRH42HX5RSQ";

const fetchWeatherData = async (searchLocation, measurementUnit) => {
  displayLoaderAndHideContent();

  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchLocation}?unitGroup=${measurementUnit}&key=${apiKey}`
    );

    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    const weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.error(`Error fetching weather data. ${error.message}`);
    return null;
  } finally {
    displayContentAndHideLoader();
  }
};

const updateSearchLocation = () => {
  const locationSearchInput = document.querySelector(".location-search-input");
  searchLocation = locationSearchInput.value;
};

const updateMeasurementUnit = () => {
  const measurementUnitSelector = document.querySelector(
    ".measurement-unit-selector"
  );
  measurementUnit = measurementUnitSelector.value;
};

const setDegreeSymbol = () => {
  const degreeSymbol = measurementUnit === "us" ? "°F" : "°C";
  return degreeSymbol;
};

const setPressureUnit = () => {
  const pressureUnit = measurementUnit === "metric" ? "hPa" : "mbar";
  return pressureUnit;
};

const setDistanceUnit = () => {
  const distanceUnit = measurementUnit === "metric" ? "km" : "mi";
  return distanceUnit;
};

const setSpeedUnit = () => {
  const speedUnit = measurementUnit === "metric" ? "km/h" : "mph";
  return speedUnit;
};

const formatTimeWithoutSeconds = (currentTime) => {
  let time = currentTime.split(":");
  let formattedTime = `${time[0]}:${time[1]}`;
  return formattedTime;
};

const formatDateToDDMMYY = (currentDate) => {
  let date = currentDate.split("-");
  let formattedDate = `${date[2]}/${date[1]}/${date[0].slice(2)}`;
  return formattedDate;
};

const displayLoaderAndHideContent = () => {
  const main = document.querySelector(".main");
  const loaderContainer = document.querySelector(".loader-container");

  main.style.display = "none";
  loaderContainer.style.display = "flex";
};

const prepareWeatherData = async () => {
  const weatherData = await fetchWeatherData(searchLocation, measurementUnit);

  const resolvedAddress = weatherData.resolvedAddress;
  const description = weatherData.description;
  const days = weatherData.days;
  const conditions = weatherData.currentConditions.conditions;
  const dateTime = weatherData.currentConditions.datetime;
  const dew = weatherData.currentConditions.dew;
  const feelsLike = weatherData.currentConditions.feelslike;
  const humidity = weatherData.currentConditions.humidity;
  const icon = weatherData.currentConditions.icon;
  const pressure = weatherData.currentConditions.pressure;
  const temp = weatherData.currentConditions.temp;
  const visibility = weatherData.currentConditions.visibility;
  const windSpeed = weatherData.currentConditions.windspeed;
  const sunrise = weatherData.currentConditions.sunrise;
  const sunset = weatherData.currentConditions.sunset;

  return {
    resolvedAddress,
    description,
    days,
    conditions,
    dateTime,
    dew,
    feelsLike,
    humidity,
    icon,
    pressure,
    temp,
    visibility,
    windSpeed,
    sunrise,
    sunset,
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
  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthsOfTheYear = [
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
    "December",
  ];

  const todayDay = daysOfTheWeek[currentDate.getDay()];
  const todayDate = currentDate.getDate();
  const todayMonth = monthsOfTheYear[currentDate.getMonth()];
  const todayYear = currentDate.getFullYear();

  const dayMonthYear = document.querySelector(".day-month-year");
  dayMonthYear.innerHTML = `${todayDay}, ${todayDate} ${todayMonth} ${todayYear}`;
};

const displayCurrentWeather = async (weatherData) => {
  const location = document.querySelector(".location");
  const description = document.querySelector(".description");
  const conditions = document.querySelector(".conditions");
  const dateTime = document.querySelector(".date-time");
  const dewPoint = document.querySelector(".dew-point");
  const feelsLike = document.querySelector(".feels-like");
  const humidity = document.querySelector(".humidity");
  const pressure = document.querySelector(".pressure");
  const temperature = document.querySelector(".temperature");
  const visibility = document.querySelector(".visibility");
  const windSpeed = document.querySelector(".wind-speed");
  const sunrise = document.querySelector(".sunrise");
  const sunset = document.querySelector(".sunset");

  const degreeSymbol = setDegreeSymbol();
  const pressureUnit = setPressureUnit();
  const distanceUnit = setDistanceUnit();
  const speedUnit = setSpeedUnit();

  location.innerHTML = weatherData.resolvedAddress;
  description.innerHTML = weatherData.description;
  conditions.innerHTML = weatherData.conditions;
  dateTime.innerHTML = `${formatTimeWithoutSeconds(weatherData.dateTime)}`;
  dewPoint.innerHTML = `${weatherData.dew} ${degreeSymbol}`;
  feelsLike.innerHTML = `${weatherData.feelsLike} ${degreeSymbol}`;
  humidity.innerHTML = `${weatherData.humidity}%`;
  pressure.innerHTML = `${weatherData.pressure} ${pressureUnit}`;
  temperature.innerHTML = `${weatherData.temp} ${degreeSymbol}`;
  visibility.innerHTML = `${weatherData.visibility} ${distanceUnit}`;
  windSpeed.innerHTML = `${weatherData.windSpeed} ${speedUnit}`;
  sunrise.innerHTML = `${formatTimeWithoutSeconds(weatherData.sunrise)}`;
  sunset.innerHTML = `${formatTimeWithoutSeconds(weatherData.sunset)}`;
};

const resetForecastDashboards = () => {
  const hourlyForecastDashboard = document.querySelector(
    ".hourly-forecast-dashboard"
  );
  const dailyForecastDashboard = document.querySelector(
    ".daily-forecast-dashboard"
  );

  hourlyForecastDashboard.innerHTML = "";
  dailyForecastDashboard.innerHTML = "";
};

const displayAndGenerateHourlyForecasts = async (weatherData) => {
  const hourlyForecastDashboard = document.querySelector(
    ".hourly-forecast-dashboard"
  );

  weatherData.days[0].hours.forEach((hour, index) => {
    if (index < 24) {
      const hourlyForecastCard = document.createElement("div");
      const dateTime = document.createElement("h4");
      const temperature = document.createElement("h4");
      const conditions = document.createElement("h4");

      const degreeSymbol = setDegreeSymbol();

      hourlyForecastCard.classList.add("hourly-forecast-card");
      dateTime.classList.add("date-time");
      temperature.classList.add("temperature");
      conditions.classList.add("conditions");

      dateTime.innerHTML = `<i class="fa-regular fa-clock"></i> - ${formatTimeWithoutSeconds(
        hour.datetime
      )}`;
      temperature.innerHTML = `<i class="fa-solid fa-temperature-half"></i> - ${hour.temp} ${degreeSymbol}`;
      conditions.innerHTML = `<i class="fa-solid fa-cloud"></i> - ${hour.conditions}`;

      hourlyForecastCard.appendChild(dateTime);
      hourlyForecastCard.appendChild(temperature);
      hourlyForecastCard.appendChild(conditions);
      hourlyForecastDashboard.appendChild(hourlyForecastCard);
    }
  });
};

const displayAndGenerateDailyForecasts = async (weatherData) => {
  const dailyForecastDashboard = document.querySelector(
    ".daily-forecast-dashboard"
  );

  weatherData.days.forEach((day, index) => {
    if (index > 0 && index < 15) {
      const dailyForecastCard = document.createElement("div");
      const dateTime = document.createElement("h4");
      const temperature = document.createElement("h4");
      const conditions = document.createElement("h4");

      const degreeSymbol = setDegreeSymbol();

      dailyForecastCard.classList.add("daily-forecast-card");
      dateTime.classList.add("date-time");
      temperature.classList.add("temperature");
      conditions.classList.add("conditions");

      dateTime.innerHTML = `<i class="fa-regular fa-calendar"></i> - ${formatDateToDDMMYY(
        day.datetime
      )}`;
      temperature.innerHTML = `<i class="fa-solid fa-temperature-half"></i> - ${day.temp} ${degreeSymbol}`;
      conditions.innerHTML = `<i class="fa-solid fa-cloud"></i> - ${day.conditions}`;

      dailyForecastCard.appendChild(dateTime);
      dailyForecastCard.appendChild(temperature);
      dailyForecastCard.appendChild(conditions);
      dailyForecastDashboard.appendChild(dailyForecastCard);
    }
  });
};

const displayContentAndHideLoader = () => {
  const loaderContainer = document.querySelector(".loader-container");
  const main = document.querySelector(".main");

  loaderContainer.style.display = "none";
  main.style.display = "flex";
};

const updateUI = (weatherData) => {
  displayCurrentDate();
  setWeatherIcon(weatherData);
  displayCurrentWeather(weatherData);
  resetForecastDashboards();
  displayAndGenerateHourlyForecasts(weatherData);
  displayAndGenerateDailyForecasts(weatherData);
};

const loadDefaultState = async () => {
  const weatherData = await prepareWeatherData();
  updateUI(weatherData);
};

const handleFormSubmit = async (event) => {
  event.preventDefault();
  updateSearchLocation();
  updateMeasurementUnit();
  const weatherData = await prepareWeatherData();
  updateUI(weatherData);
};

document.addEventListener("DOMContentLoaded", loadDefaultState);

const locationSearchForm = document.querySelector(".location-search-form");
locationSearchForm.addEventListener("submit", handleFormSubmit);
