import React, { useEffect, useState } from "react";
import "./style.css";
import WeatherCard from "./weatherCard";
const Weather = () => {
  const [searchVal, setSearchItem] = useState("Pune");
  const [weatherInfo, setWeatherInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&appid=3874dcd2add76b1e67823bd54db85f57`;

      let res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const newWeatherData = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      setWeatherInfo(newWeatherData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            className="searchTerm"
            placeholder="Enter City..."
            type="search"
            autoFocus
            id="search"
            value={searchVal}
            onChange={(e) => {
              setSearchItem(e.target.value);
            }}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      <WeatherCard {...weatherInfo} />
    </>
  );
};

export default Weather;
