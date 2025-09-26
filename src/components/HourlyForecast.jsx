import { formatTemperature } from '../utils/weatherUtils'
import './HourlyForecast.css'
import React from "react"

function HourlyForecast({ data, selectedDay, units }) {
  // Get 24 hours starting from the selected day
  const startIndex = selectedDay * 24
  const hourlyData = data.time.slice(startIndex, startIndex + 24)
  const hourlyTemps = data.temperature_2m.slice(startIndex, startIndex + 24)

  const formatHour = (timeString) => {
    const date = new Date(timeString)
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      hour12: true 
    })
  }

  const getTemperatureBarHeight = (temp, minTemp, maxTemp) => {
    const range = maxTemp - minTemp
    if (range === 0) return 50
    return ((temp - minTemp) / range) * 80 + 20
  }

  const minTemp = Math.min(...hourlyTemps)
  const maxTemp = Math.max(...hourlyTemps)

  return (
    <div className="hourly-forecast">
      <h3>Hourly forecast</h3>
      <div className="hourly-scroll">
        <div className="hourly-grid">
          {hourlyData.map((time, index) => (
            <div key={index} className="hourly-item">
              <div className="hour-time">
                {formatHour(time)}
              </div>
              <div className="hour-temp-bar">
                <div 
                  className="temp-bar"
                  style={{
                    height: `${getTemperatureBarHeight(hourlyTemps[index], minTemp, maxTemp)}%`
                  }}
                />
              </div>
              <div className="hour-temp">
                {formatTemperature(hourlyTemps[index], units)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HourlyForecast