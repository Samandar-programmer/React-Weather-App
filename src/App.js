import { useEffect, useState } from "react";
import './App.css'
import searchIcon from './search.svg'
import mountain from './mountain.png'

const api = {
    key: '48cdc7cb4c582d4d9563a941735d6bd9',
    brauser: 'https://api.openweathermap.org/data/2.5/'
}
const App = function(props) {
    const [day, setDay] = useState('')
    const [weather, setWeather] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const searchWeather = async (title) => {
        const response = await fetch(`${api.brauser}weather?q=${title}&units=metric&APPID=${api.key}`)
        const data = await response.json()
        setWeather(data)
    }
    let now = new Date();
    useEffect(function() {
        searchWeather('Tashkent')
    }, []);
    function dateBuilder(s) {
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
            "December",
        ];
        let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        let day = days[s.getDay()];
        let date = s.getDate();
        let month = months[s.getMonth()];
        let year = s.getFullYear();
        return `${day} ${date} ${month} ${year}`
    }
    function enterKeyPressed(event) {
      if (event.keyCode == 13) {
         searchWeather(searchTerm)
         return true;
      } else {
         return false;
      }
    }
    function stars() {
        if(now.getHours() > 18 || now.getHours() < 6) {
            return 'stars'
        }
    }
    function mainobj() {
        if(now.getHours() <= 18 && now.getHours() >= 14) {
            return 'night--sun'
        } else if(now.getHours() >= 6 && now.getHours() < 14) {
            return 'sun'
        } else if(now.getHours() > 18 || now.getHours() < 6) {
            return 'moon'
        }
    }
    function mainBg() {
        if(now.getHours() <= 18 && now.getHours() >= 14) {
            return {backgroundImage: 'linear-gradient(to top, #82657b, #e49dad, #82657b)'}
        } else if(now.getHours() >= 6 && now.getHours() < 14) {
            return {backgroundImage: 'linear-gradient(-150deg, #59b8cc, #e2e2c7)'}
        } else if(now.getHours() > 18 || now.getHours() < 6) {
            return {backgroundImage: 'linear-gradient(to top, #1f0d33, #313165, #1f0d33)'}
        }
    }
    return (
        <>
            <div className="app">
                <div className={stars()}></div>
                <div className={mainobj()}></div>
                <div className="mainBg" style={mainBg()}></div>
                <div className="mountain--container">
                    <img src={mountain} className="mountain"></img>
                </div>
                <div className="header">
                    <h1>Weather App</h1>
                    <div className="search">
                        <input placeholder="Search Weather" onChange={(e) => {setSearchTerm(e.target.value)}} onKeyDown={enterKeyPressed}></input>
                        <img src={searchIcon} className="searchIcon" onClick={() => searchWeather(searchTerm)}></img>
                    </div>
                </div>
                {(typeof weather.main != "undefined") ? (
                    <>  
                        <div className="main">
                            <div className="temprature">
                                {weather.main.temp}°C
                            </div>
                            <h2 className="city">
                                {weather.name}, {weather?.sys?.country}
                            </h2>
                        </div>
                        <footer className="container">
                            <div className="block">
                                <div className="date">{dateBuilder(now)}</div>
                            </div>
                            <div className="block">
                                <div className="inner--block">
                                    <div className="windSpeed">
                                        <span>Wind Speed:</span> {weather.wind.speed} km/h
                                    </div>
                                </div>
                                <div className="inner--block">
                                    <div className="description">
                                        <span>Description:</span> {weather.weather[0].description}
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </>
                ) : (
                    <div className="empty">
                        <h2>No weather found</h2>
                    </div>
                )}
            </div>
        </>
    )
}

export default App;