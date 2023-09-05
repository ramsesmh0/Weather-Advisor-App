import React,  { useState, useEffect } from "react";
import "./Weather_container.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Weather_container_sass.css";
import logo1 from ".//images/logo1.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Collapse } from "react-bootstrap";
import Navigation_bar from "./Navigation_bar";
import Success from "./Signin";
import setSuccess from "./Signin";
import Registered from "./Signup";
import setRegistered from "./Signup";
import  Alert  from "react-bootstrap/Alert";
import { Button } from "@mui/material";

function Weather_container() {

    const[open, setOpen] = useState(false);

  const left_style = {
    position: "relative",
    left: "-0px",
  };

  const right_style = {
    position: "relative",
    left: "800px",
    bottom: "900px",
  };

  const middle_style = {
    position: "relative",
    left: "360px",
    bottom: "1750px",
  };

  const AI_imgstyle = {
    width: "350px",
    border: "5px solid #1c1104a5",
    padding: "3px",
    margin: "-20px",
    borderRadius: "8px", //use that instead of border-radius
  };
  //collapse button 




  const [isCollapsed1, setIsCollapsed1] = useState(true);


  //input grabbers for API: first city 

  const [city1, setcity1] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("");
  const [uvIndex, setUvIndex] = useState(null);
  const [timeZone, setTimeZone] = useState("");
  const [localTime, setLocalTime] = useState("");
  const [feelsLike, setFeelsLike] = useState(null);
  const [description, setDescription] = useState("");
  const [aqiIndex, setAqiIndex] = useState(null);
  const [isDay, setIsDay] = useState("");


  //input grabbers for second city:
  const [city2, setcity2] = useState("");
  const [temperature1, setTemperature1] = useState(null);
  const [city11, setCity11] = useState("");
  const [unit1, setUnit1] = useState("");
  const [uvIndex1, setUvIndex1] = useState(null);
  const [timeZone1, setTimeZone1] = useState("");
  const [localTime1, setLocalTime1] = useState("");
  const [feelsLike1, setFeelsLike1] = useState(null);
  const [description1, setDescription1] = useState("");
  const [aqiIndex1, setAqiIndex1] = useState(null);
  const [isDay1, setIsDay1] = useState("");


  //ChatGPT section 

  const [days_in_advance, Setdays_in_advance] = useState("");

  const [chatgptresponse, Setchatgptresponse] = useState("");


  

  function fetchchatgpt(maxtemp, minTemp, rainfall, uvIndex2, humidity){
    var apikeyChat = '';
    var url = 'https://api.openai.com/v1/chat/completions';
    var weather_parametersfirst = 'temp: '+temperature+'F°, '+description+', feels like: '+feelsLike+'F°, uv index: ' +uvIndex+'.';
    var weather_parameterssecond = 'forecast parameters for: ' +days_in_advance+ 'days in advance, max temp: ' +maxtemp+'F°, min temp: '+minTemp+'F°, total precipitation: '+rainfall+' inches, humidity: '+humidity+'%, and uv index: '+uvIndex2+' ';
    //payload to API 

    var payload = {
        max_tokens: 1000,
        temperature: 1.2,
        n:1,
        stop: '\n',
        model: 'gpt-3.5-turbo-16k',
        messages: [
          { role: 'system', content: 'You are giving weather advice for what a human should wear for their trip going from the first city to the second city. If it is going to be colder, suggest warmer clothes such as pants. If it is going to be hot, suggest smaller items such as shorts.' },
          { role: 'user', content: 'I am in a city with these weather parameters: ' + weather_parametersfirst + '.' },
          { role: 'user', content: 'I am traveling to another city with these weather parameters: ' + weather_parameterssecond + '.' },
          { role: 'user', content: 'List the articles of clothing only'},
        ],
    };

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apikeyChat,
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            console.log('ChatGPT API Response:', data);
            console.log('ChatGPT message only: ', data.choices[0].message);
            return data.choices[0].message.content;
        })
        .catch(error => {
            console.error('Error:', error);
        });
  };




  function fetchWeatherDataFuture(query){
    var apiKey = ''; // Replace with your actual WeatherAPI key
    var url = 'https://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=' + query + '&days=3&aqi=yes&lang=en';
    return fetch(url)
      .then(response => response.json())
      .catch(error => {
        console.error('Error:', error);
      });
  };
  
  const handleChatgpt = () => {
    if(city1.trim() === "" || city11.trim() === ""){
        alert("Missing fields, enter all city names");
        return;
    }
    fetchWeatherDataFuture(city11)
    .then(data =>{
        var forecast = data.forecast.forecastday;
        if(forecast.length > days_in_advance){
            var maxtemp = forecast[days_in_advance].day.maxtemp_f;
            var minTemp = forecast[days_in_advance].day.mintemp_f;
            var rainfall = forecast[days_in_advance].day.totalprecip_in;
              var humidity = forecast[days_in_advance].day.avghumidity;
              var uvIndex2 = forecast[days_in_advance].day.uv;
        } else {
            alert("invalid forecast day");
        }
        fetchchatgpt(maxtemp, minTemp, rainfall, humidity, uvIndex2)
        .then(response => {
            Setchatgptresponse(response);
        })
        .catch(error => {
            console.error('Error:', error);
          });
    })
    .catch(error => {
        console.error('Error:', error);
      });
  };

  //click description

  const handleClick = () => {
    if (city1.trim() === "") {
      alert("Please enter a city name.");
      return;
    }
    var query = city1;
    var apiKey = ""; // Replace with your actual WeatherAPI key
    var url =
      "https://api.weatherapi.com/v1/current.json?key=" +
      apiKey +
      "&q=" +
      query +
      "&aqi=yes&lang=en";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTemperature(data.current.temp_f);
        setCity(data.location.name);
        setUnit("F°"); // Or you can set the unit based on data received from the API
        setUvIndex(data.current.uv);
        setTimeZone(data.location.tz_id);
        setLocalTime(data.location.localtime);
        setFeelsLike(data.current.feelslike_f);
        setDescription(data.current.condition.text);
        setAqiIndex(data.current.air_quality.pm2_5);
        setIsDay(data.current.is_day);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //click description city 2 right field 

  const handleClick1 = () => {
    if (city2.trim() === ""){
        alert("Please enter a city name.");
        return;
    }
    var query = city2;
    var apiKey = ""; // Replace with your actual WeatherAPI key
    var url =
      "https://api.weatherapi.com/v1/current.json?key=" +
      apiKey +
      "&q=" +
      query +
      "&aqi=yes&lang=en";

      fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTemperature1(data.current.temp_f);
        setCity11(data.location.name);
        setUnit1("F°");
        setUvIndex1(data.current.uv);
        setTimeZone1(data.location.tz_id);
        setLocalTime1(data.location.localtime);
        setFeelsLike1(data.current.feelslike_f);
        setDescription1(data.current.condition.text);
        setAqiIndex1(data.current.air_quality.pm2_5);
        setIsDay1(data.current.is_day);
      })
      .catch((error) => {
        console.error("Error:", error);
      });  
  };
  //click description forecast right field 

  const [forecastData1, setForecastData1] = useState([]);

  const handleClickforecast1 = () => {
    if (city11.trim() === "") {
      alert("Please enter a city name.");
      return;
    }
    var query = city11;
    var apiKey = ""; // Replace with your actual WeatherAPI key
    var url =
      "https://api.weatherapi.com/v1/forecast.json?key=" +
      apiKey +
      "&q=" +
      query +
      "&days=3";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        var forecast = data.forecast.forecastday;
        setForecastData1(forecast);
        })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const CombinedClickForecast1 = () => {
    collapseclick1();
    handleClickforecast1();
  };

  const[open1, setOpen1] = useState(false);

  const collapseclick1 = () => {
    if(city11.trim() === ""){
        return;
    }
    setOpen1(!open1);
  };


  const collapseclick = () => {
    if(city1.trim() === ""){
        return;
    }
    setOpen(!open);
  };
  //click description forecast left field

  const [forecastData, setForecastData] = useState([]);


  const handleClickforecast = () => {
    if (city.trim() === "") {
      alert("Please enter a city name.");
      return;
    }
    var query = city;
    var apiKey = ""; // Replace with your actual WeatherAPI key
    var url =
      "https://api.weatherapi.com/v1/forecast.json?key=" +
      apiKey +
      "&q=" +
      query +
      "&days=3";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        var forecast = data.forecast.forecastday;
        setForecastData(forecast);
        })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const CombinedClickForecast = () => {
    handleClickforecast();
    collapseclick();
  };

  const dismissAlert = () => {
    setRegistered("");
  };

  return (
    
    <div className="weather_container">
      <Navigation_bar />
        <script src="bootstrap/dist/css/bootstrap.min.css"></script>
      <div className="left_field" style={left_style}>
        <input
          type="text"
          required
          value={city1} 
          onChange={(e) => setcity1(e.target.value)}
          id="textInput"
          placeholder="1. Current City"
        ></input>

        <button onClick={handleClick} id="button-73" role="button">
          Search
        </button>
        <p>City: {city} </p>
        <p>Time: {localTime}</p>
        <p>Timezone: {timeZone}</p>
        <i id="weatherIcon" className=""></i>
        <p>
          {temperature} {unit}
        </p>
        <p>
          Feels like: {feelsLike} {unit}
        </p>
        <p>Description: {description}</p>
        <p>UV Index: {uvIndex}</p>
        <p>AQI Index: {aqiIndex}</p>
        <br></br>
        
        {!open && <ExpandMoreIcon onClick = {CombinedClickForecast}
        aria-controls = "collapse" />
        }
        <Collapse in = {open}>
            <div id = "collapse">
            {forecastData.map((day) => (
                <p key = {day.date}>
                  {day.date}: <span>{day.day.condition.text}</span> ({day.day.avgtemp_f} °F)
                </p>
            ))}
                <ExpandLessIcon onClick = {() =>setOpen(!open)}/>
            </div>
        </Collapse>
      </div>

      
      <div className="right_field" style={right_style}>
        <input
          type="text"
          id="textInput1"
          value = {city2}
          onChange={(e) => setcity2(e.target.value)}
          placeholder="2. Destination city"
        ></input>
        
        <button onClick={handleClick1} id="button-73" role="button">
          Search
        </button>
        <p> City: {city11}</p>
        <p> Time: {localTime1}</p>
        <p> Timezone: {timeZone1}
        </p>
        <i id="weatherIcon1" className=""></i>
        <p>
            {temperature1} {unit1}
        </p>
        <p>
          Feels like: {feelsLike1} {unit1}
        </p>
        <p>
          Description: {description1}
        </p>
        <p>
          UV Index: {uvIndex1}
        </p>
        <p>
          AQI Index: {aqiIndex1}
        </p>
        <br></br>
        {!open1 && <ExpandMoreIcon onClick = {CombinedClickForecast1}
        aria-controls = "collapse1" />}

        <Collapse in = {open1}>
            <div className="collapse1">
            {forecastData1.map((day) => (
                <p key = {day.date}>
                  {day.date}: <span>{day.day.condition.text}</span> ({day.day.avgtemp_f} °F)
                </p>
            ))}
            <ExpandLessIcon onClick = {() => setOpen1(!open1)} />
            </div>
        </Collapse>
        </div>
      <div className="middle_field" style={middle_style}>
        <img src= {logo1} alt="Profile" style={AI_imgstyle}></img>
        <div className="searchbox_middle">
        <input
          type="text"
          id="in_advance"
          placeholder="3. How many days from now is the trip?"
          value={days_in_advance}
          onChange={(e) => Setdays_in_advance(e.target.value)}
        ></input>
        </div>
        <br></br>
        <p>Max: 3 days in advance</p>
        <button id="button-75" role="button"
        onClick={handleChatgpt}>
          Load Suggestions
        </button>
        <div className="response_container">
        <p>{chatgptresponse}</p>
        </div>
      </div>
    </div>
    );
}

export default Weather_container;
