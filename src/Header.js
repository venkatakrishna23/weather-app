import React, { useState } from "react";
import "./App.css";

export default function Header(props) {
  const [city, setCity] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="headerContainer">
      <div className="column left">
        <h2>Weather in your city</h2>
      </div>
      <div className="column middle">
        <span>
          {" "}
          <input
            value={city}
            placeholder="Enter a City"
            onChange={handleCityChange}
          />
        </span>
        <span>
          <button className="searchButton" onClick={() => props.handleSearch(city)}> <span className="questionMark">?</span> Search</button>
        </span>
        {props.weatherForcastLoader ? <div class="loader"></div> : null}
      </div>
     
    </div>
  );
}
