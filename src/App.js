import React, { useState, useEffect } from "react";
import TableComponent from "./TableComponent";
import "./App.css";
import axios from "axios";
import Header from "./Header";

function App() {
  const [weatherForcast, setWeatherForcast] = useState([]);
  const [weatherForcastLoader, setWeatherForcastLoader] = useState(false);

  // useEffect(() => {
  //   getWeatherInfo();
  // }, []);
  const getFormattedDate = (date) => {
    const today = new Date(date);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return dd + "/" + mm + "/" + yyyy;
  };

  const getWeatherInfo = (lat, long) => {
    setWeatherForcastLoader(true);
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
          lat +
          "&lon=" +
          long +
          "&appid=1635890035cbba097fd5c26c8ea672a1"
      )
      .then((res) => {
        console.log(res.data.list);
        let datesArr = [];
        let data = res.data.list;
        let forcastData = [];

        for (let i of data) {
          if (!datesArr.includes(getFormattedDate(i.dt_txt))) {
            if (forcastData.length >= 5) {
              break;
            } else {
              forcastData.push(i);
              datesArr.push(getFormattedDate(i.dt_txt));
            }
          }
        }
        setWeatherForcast(forcastData);
        setWeatherForcastLoader(false);
      })
      .catch((err) => {
        setWeatherForcastLoader(false);
      });
  };
  const handleSearch = (city) => {
    axios
      .get(
        "http://api.openweathermap.org/geo/1.0/direct?q=" +
          city +
          "&appid=1635890035cbba097fd5c26c8ea672a1"
      )
      .then((res) => {
        if (res.data && res.data.length > 0) {
          let lat = res.data[0].lat,
            long = res.data[0].lon;
          getWeatherInfo(lat, long);
        } else {
          alert("Enter a valid city");
        }
      });
  };
  return (
    <>
      <div className="appContainer" >
        <Header
          handleSearch={handleSearch}
          weatherForcastLoader={weatherForcastLoader}
        />
      </div>

      <div className="weather-info">
        {weatherForcast.map((day, index) => {
          return <TableComponent key={index} data={day} />;
        })}
        {/* <TableComponent /> */}
      </div>
    </>
  );
}

export default App;
