import "./styles.css";
import React, { useState } from "react";
import classNames from "classnames";
import Typewriter from "typewriter-effect";

const api = {
  key: "c6301e384b7a762fb9d2a3587ecbf47d",
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
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
      "December"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  const getBackgroundClass = (weatherType) => {
    switch (weatherType) {
      case "Clear":
        return "clear";
      case "Clouds":
        return "cloud";
      case "Rain":
        return "rain";
      default:
        return "default";
    }
  };

  const weatherType = weather?.weather?.[0]?.main ?? "DefaultWeather";
  const backgroundClass = getBackgroundClass(weatherType);

  return (
    <div className={classNames("app", backgroundClass)}>
      <main>
        <div className="search-box">
          <input
            className="search-bar"
            type="text"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <div className="typewriter-container">
          <Typewriter
            options={{
              strings: ["Weather Forecast"],
              autoStart: true,
              loop: true
            }}
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name},{weather.sys.country}
              </div>
              <div className="date"> {dateBuilder(new Date())} </div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className="weather-description">
                {weather.weather[0].description}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
