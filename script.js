let locationQuery = "Bandung";
let measurementUnit = "metric";

const apiKey = "G8796BZ69XEMGGGRH42HX5RSQ";
const locationSearchForm = document.querySelector(".location-search-form");

const fetchWeatherData = async (locationQuery) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationQuery}?unitGroup=${measurementUnit}&key=${apiKey}`
    );

    if (response.status !== 200) {
      console.log(`Response Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
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
  locationQuery = fetchWeatherData(locationSearchInput.value);
};

locationSearchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  updateMeasurementUnit();
  updateLocationQuery();
});
