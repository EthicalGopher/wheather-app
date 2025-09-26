import { getWeatherIcon, formatTemperature } from '../utils/weatherUtils'
import './DailyForecast.css'
import React from "react"
function DailyForecast({ data, units, selectedDay, onDaySelect }) {
  const getDayName = (dateString, index) => {
    if (index === 0) return 'Today'
    if (index === 1) return 'Tomorrow'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { weekday: 'short' })
  }

  return (
    <div className="daily-forecast">
      <h3>Daily forecast</h3>
      <div className="forecast-grid">
        {data.time.slice(0, 7).map((date, index) => (
          <button
            key={index}
            className={`forecast-day ${selectedDay === index ? 'active' : ''}`}
            onClick={() => onDaySelect(index)}
          >
            <div className="day-name">{getDayName(date, index)}</div>
            <div className="day-icon">
              <img 
                src={getWeatherIcon(data.weather_code[index])} 
                alt="Weather condition" 
              />
            </div>
            <div className="day-temps">
              <span className="temp-high">
                {formatTemperature(data.temperature_2m_max[index], units)}
              </span>
              <span className="temp-low">
                {formatTemperature(data.temperature_2m_min[index], units)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default DailyForecast