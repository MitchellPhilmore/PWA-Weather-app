import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import dotenv from "dotenv";

import "./App.css";
import cloudyGif from "./images/cloudy.gif";
import clearGif from "./images/tb.gif";
import rainGif from "./images/rainday2.gif";

dotenv.config();

const backgrounds = {
  Clouds: cloudyGif,
  Clear: clearGif,
  Rain: rainGif,
};

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [backgroundType, setBackgroundType] = useState("");

  const fetchWeatherData = useCallback(() => {
    const apiKey = process.env.API_KEY;
    const key = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&q=philadelphia&units=imperial&count=1`;
    
    axios.get(key).then(({ data }) => {
      let filteredList = data.list.filter((data) =>
        data.dt_txt.includes("18:00:00")
      );
      setWeatherData(filteredList);
      setBackgroundType(filteredList[0].weather[0].main);
    });
  }, []);

  useEffect(fetchWeatherData, []);

  const generateDayOfTheWeek = (date) => moment(date).format("dddd");

  return (
    weatherData.length > 0 && (
      <div className="container">
        <div className="card row">
          <div className="card-content">
            {weatherData.map((day) => {
              let imgIcon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
              return (
                <div key={day.dt}>
                  <WeeklyForecast
                    generateDayOfTheWeek={generateDayOfTheWeek}
                    imgIcon={imgIcon}
                    day={day}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
};

const WeeklyForecast = ({ generateDayOfTheWeek, imgIcon, day }) => (
  <div className="weekly-forecast col-span-12">
    <div className="days grid grid-cols-2 items-center">
      <div>
        <WeatherDescription
          generateDayOfTheWeek={generateDayOfTheWeek}
          day={day}
        />
        <WeatherIcon imgIcon={imgIcon} />
        <h2 className="description">{day.weather[0].description}</h2>
      </div>
      <Temperature day={day} />
    </div>
  </div>
);

const WeatherDescription = ({ generateDayOfTheWeek, day }) => (
  <h5 className="col text-white">
    {generateDayOfTheWeek(day.dt_txt)}
  </h5>
);

const WeatherIcon = ({ imgIcon }) => (
  <img className="col" id="weatherIcon" src={imgIcon} alt="Weather Icon" />
);

const Temperature = ({ day }) => (
  <h5 className="degree">
    <span className="text-lg font-semibold">
      {Math.ceil(day.main.temp)}&#xb0;
    </span>{" "}
    <span className="font-light">
      {Math.floor(day.main.temp_min)}&#xb0;
    </span>
  </h5>
);

export default App;
