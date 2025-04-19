const searchBar = document.querySelector(".search");
const form = document.querySelector(".form");
const cityName = document.querySelector(".location");
const dateTime = document.querySelector(".date-time");
const weatherName = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weather-icon");
const temp = document.querySelector(".temperature");
const min = document.querySelector(".min");
const max = document.querySelector(".max");
const feels = document.querySelector(".feels");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind");
const pressure = document.querySelector(".pressure");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchBar.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

const getDateTime = (dt) => {
  const currdate = new Date(dt * 1000);

  const option = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formatTime = new Intl.DateTimeFormat("en-US", option).format(currdate);
  return formatTime;
};

const getCountryName = (code) => {
  return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

const getWeather = async (city = "Mumbai") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=a0b06669a793506ae54060f7df8a5fb6`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);

    if (data.cod !== 200) {
      cityName.textContent = "City not found 😓";
      return;
    }

    const { main, name, weather, wind, sys, dt } = data;

    cityName.textContent = `${name}, ${getCountryName(
      sys.country
    ).toUpperCase()}`;

    dateTime.innerHTML = getDateTime(dt);

    weatherName.textContent = weather[0].main;
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">`;

    temp.innerHTML = `${main.temp.toFixed()}&#176;C`;
    min.innerHTML = `Min: ${main.temp_min.toFixed()}&#176;C`;
    max.innerHTML = `Max: ${main.temp_max.toFixed()}&#176;C`;
    feels.innerHTML = `${main.feels_like.toFixed()}&#176;C`;
    humidity.innerHTML = `${main.humidity}%`;
    windSpeed.innerHTML = `${wind.speed} m/s`;
    pressure.innerHTML = `${main.pressure} hPa`;
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
};

window.addEventListener("DOMContentLoaded", () => getWeather());
