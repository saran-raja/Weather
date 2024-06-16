import React, { useEffect, useState } from "react";
import "./weather.css";
import axios from "axios";
import humidity from "./humidity.png";
import temperature from "./temperature.png";
import wind from "./wind.png";
import rain from "./images/rain.png";
import clear from "./images/clear.png";
import cloud from "./images/cloud.png";
import snow from "./images/snow.png";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCity] = useState("");
  const [searchIcon, setSearchIcon] = useState("");
  const [weatherImg, setWeatherImg] = useState("");

  useEffect(() => {
    if (searchIcon) {
      const city = searchIcon;
      const api = "9d83a79571825b34edb32a2a6bf2ef85";
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}`;

      axios
        .get(url)
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchIcon]);

  useEffect(() => {
    if (weatherData) {
      const mainWeather = weatherData.list[0].weather[0].main;
      switch (mainWeather) {
        case "Rain":
          setWeatherImg(rain);
          break;
        case "Clouds":
          setWeatherImg(cloud);
          break;
        case "Clear":
          setWeatherImg(clear);
          break;
        case "Snow":
          setWeatherImg(snow);
          break;
        default:
          setWeatherImg("");
          break;
      }
    }
  }, [weatherData]);

  const handleCity = (event) => {
    setCity(event.target.value);
  };

  const searchCity = () => {
    setSearchIcon(cityName);
  };

  return (
    <div className="container">
      <div className="content">
        <input
          type="text"
          className="city"
          onChange={handleCity}
          value={cityName}
          placeholder="Enter city name"
        />
        <span className="material-symbols-outlined" onClick={searchCity}>
          search
        </span>
        {weatherData && (
          <>
            <h1>{weatherData.city.name}</h1>
            <img src={weatherImg} className="weather-img" alt="weather icon" />
            <p className="temperature">
              {(weatherData.list[0].main.temp - 273.15).toFixed(2)}°C
            </p>
            <p>{weatherData.list[0].weather[0].description}</p>
            <div className="wind-humidity">
              <section className="wind">
                <p>Wind</p>
                <div className="wind-content">
                  <img src={wind} className="wind-img" alt="wind icon" />
                  <p>
                    {(weatherData.list[0].wind.speed * 3.6).toFixed(2)} km/hr
                  </p>
                </div>
              </section>
              <section className="humidity">
                <p>Humidity</p>
                <div className="humidity-content">
                  <img
                    src={humidity}
                    className="humidity-img"
                    alt="humidity icon"
                  />
                  <p>{weatherData.list[0].main.humidity}%</p>
                </div>
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Weather;
