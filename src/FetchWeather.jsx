import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const apiKey = import.meta.env.VITE_API_KEY;
const url  ='https://api.openweathermap.org/data/2.5/weather'

export const FetchWeather = () => {
    const [cityName, setCityName] = useState("Bangalore");
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState("clouds");
    const [icon, setIcon] = useState("");
    const [temperature, setTemperature] = useState("273.15");
    const [pressure, setPressure] = useState("0");
    const [humidity, setHumidity] = useState("0");
    const [country, setCountry] = useState("IN");
    const [windspeed, setWindspeed] = useState("0");
    const [visibility, setVisibility] = useState("0");
    const [clouds, setClouds] = useState("0");

        const fetchData = (dfault='bangalore') => {
        Axios.get(`${url}?q=${city||dfault}&APPID=${apiKey}`).then((res) => {
          setCityName(res.data.name)
          setWeather(res.data.weather[0].description)
          setIcon(res.data.weather[0].icon)
          setTemperature(res.data.main.temp)
          setPressure(res.data.main.pressure)
          setHumidity(res.data.main.humidity)
          setCountry(res.data.sys.country)
          setWindspeed(res.data.wind.speed)
          setVisibility(res.data.visibility)
          setClouds(res.data.clouds.all)
        })
      }

    const inputData  = (evt) => {
        setCity(evt.target.value);
    }
    
    useEffect(() => fetchData("bangalore"), [])

    const img = "http://openweathermap.org/img/wn/" + icon + "@4x.png"
    const flag = "https://flagsapi.com/"+ country +"/flat/64.png"

  return (
    <main>
        <header><h1>Weather</h1>
        <form action={fetchData}>
          <input type="text" onChange={inputData} placeholder='Enter City'/>
          <button onClick={fetchData}>Search</button>
        </form></header>
        
        <section>
          <div className="left">
            <div className="place">
              <p className="city-name">{cityName}</p>
              <p className="country-name">{country}</p> 
              <img src={flag} alt="" />
            </div>
            <div className="forecast">
              <div className="data">
                <p className="temp">{(temperature - 273.15).toFixed(2)}&deg;C</p>
                <p className="wthr">{weather}</p>
              </div>
              <img src={img} alt="" style={{width:'10em'}}/>
            </div>
          </div>
          <div className="fact">
            <div className="mid">
              <div className="visibility"><p>Visibility</p><span className="dt">{(visibility / 1000).toFixed(1)}m</span></div>
              <div className="clds"><p>Clouds</p><span className="dt">{clouds}%</span></div>              
            </div>
            <div className="right">
              <div className="visibility"><p>Pressure</p> <span className="dt">{pressure}hPa</span></div>
              <div className="visibility"><p>Windspeed</p><span className="dt">{windspeed}m/s</span></div>
              <div className="clds"><p>Humidity</p><span className="dt">{humidity}%</span></div>
            </div>
          </div>          
        </section>
        
        
    </main>
    
  )
}
