import React, { Component, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import cloudyGif from "./images/cloudy.gif";
import clearGif from "./images/tb.gif";
import rainGif from "./images/rainday2.gif";
import moment from "moment";

let backgrounds = {
  Clouds: cloudyGif,
  Clear: clearGif,
  Rain: rainGif,
};
const App = (props) => {
  const [weatherData, setWeatherData] = useState([]);
  const [backgroundType, setBackgroundType] = useState("");
  useEffect(() => {
    const apiKey = "73ec45f3936fe17133d8c9f13c187b62";
    const key = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&q=philadelphia&units=imperial&count=1`;

    axios
      .get(key)
      .then((response) => response)
      .then((response) => {
        console.log(response);
        let filteredList = response.data.list.filter((data) =>
          data.dt_txt.includes("18:00:00")
        );
        console.log(filteredList);
        setWeatherData(filteredList);
        setBackgroundType(filteredList[0].weather[0].main);
      });
  }, []);

  const generateDayOfTheWeek = (date) => {
    let dayOfTheWeek = moment(date).format("dddd");
    return dayOfTheWeek;
  };

  return (
     weatherData.length > 0 && (
      <>
        <div className="container">
          <div
            
            class="card row"
          >
            <div className="card-content">
              {weatherData.map((day) => {
                let imgIcon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
                return (
                  <>
                    {/* <h2>{Math.ceil(day.main.temp)}<sup>&#xb0;</sup></h2> */}
                    <div className="weekly-forcast col s12">
                      <div className="days">
                        {/* <h4 className="col s6 l12 m12 day">{this.generateDayOfTheWeek(day.dt_txt) }</h4> */}
                        <div>
                          <h5 className="col s5 l12 m12 day white-text">
                            {generateDayOfTheWeek(day.dt_txt)}
                          </h5>
                          <img
                            className="col s2"
                            id="weatherIcon"
                            src={imgIcon}
                          />
                          <h2 className="description">
                            {day.weather[0].description}
                          </h2>
                        </div>

                        <div className="col l3" />
                        <h5 className="degree">
                          <span style={{ fontSize: "110%", fontWeight: 700 }}>
                            {Math.ceil(day.main.temp)}
                          </span>
                          <sup>&#xb0;</sup>{" "}
                          <span style={{ marginLeft: "5px", fontWeight: 200 }}>
                            {Math.floor(day.main.temp_min)}
                            <sup>&#xb0;</sup>
                          </span>
                        </h5>
                      </div>
                    </div>
                    <br />
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default App;
