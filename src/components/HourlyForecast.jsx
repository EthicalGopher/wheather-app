import { formatTemperature, getWeatherIcon } from '../utils/weatherUtils'
import './HourlyForecast.css'
import React from "react"

function HourlyForecast({ data, selectedDay, units }) {
  // Get 24 hours starting from the selected day
  const startIndex = selectedDay * 24
  const hourlyData = data.time.slice(startIndex, startIndex + 24)
  const hourlyTemps = data.temperature_2m.slice(startIndex, startIndex + 24)
  const hourlyWeatherCodes = data.weather_code.slice(startIndex, startIndex + 24)

  const formatHour = (timeString) => {
    const date = new Date(timeString)
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      hour12: true 
    })
  }

  const getDayName = (selectedDay) => {
    const days = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday']
    return days[selectedDay] || 'Tuesday'
  }

  return (
    <div className="hourly-forecast">
      <div className="hourly-header">
        <h3>Hourly forecast</h3>
        <div className="day-selector">
          <span>{getDayName(selectedDay)}</span>
          <img src="/assets/images/icon-dropdown.svg" alt="Dropdown" />
        </div>
      </div>
      
      <div className="hourly-list">
        {hourlyData.slice(0, 8).map((time, index) => (
          <div key={index} className="hourly-item">
            <div className="hour-time">
              {formatHour(time)}
            </div>
            <div className="hour-icon">
              <img 
                src={getWeatherIcon(hourlyWeatherCodes[index])} 
                alt="Weather condition" 
              />
            </div>
            <div className="hour-temp">
              {formatTemperature(hourlyTemps[index], units)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HourlyForecast