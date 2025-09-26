import { getWeatherIcon, formatTemperature } from '../utils/weatherUtils'
import './WeatherCard.css'
import React from "react"

function WeatherCard({ data, location, units }) {
  const iconSrc = getWeatherIcon(data.weather_code)
  const temperature = formatTemperature(data.temperature_2m, units)

  return (
    <div className="weather-card">
      <div className="weather-card-background">

      </div>
      
      <div className="weather-card-content">
        <div className="location">
          <h2>{location.name}</h2>
          <p>{location.country}</p>
        </div>
        
        <div className="weather-main">
          <div className="weather-icon">
            <img src={iconSrc} alt="Weather condition" />
          </div>
          <div className="temperature">
            <span className="temp-value">{temperature}</span>
          </div>
        </div>
        
        <div className="weather-time">
          <p>{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard