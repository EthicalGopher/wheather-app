import  { formatTemperature, getWeatherIcon } from '../utils/weatherUtils'
import './HourlyForecast.css'
import React from "react"

function HourlyForecast({ data, selectedDay, units, onDaySelect }) {
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
    const today = new Date()
    const targetDate = new Date(today)
    targetDate.setDate(today.getDate() + selectedDay)

    if (selectedDay === 0) return 'Today'
    if (selectedDay === 1) return 'Tomorrow'

    return targetDate.toLocaleDateString('en-US', { weekday: 'long' })
  }

  const getDayOptions = () => {
    const options = []
    for (let i = 0; i < 7; i++) {
      options.push({
        value: i,
        label: getDayName(i)
      })
    }
    return options
  }


  return (
    <div className="hourly-forecast">
      <div className="hourly-header">
        <h3>Hourly forecast</h3>
        <div className="day-selector" >
          <select
            value={selectedDay}
            onChange={(e) => onDaySelect(parseInt(e.target.value))}
            className="day-select"

          >
            {getDayOptions().map(option => (
              <option key={option.value} value={option.value} className={"optionItems"} >
                {option.label}
              </option>
            ))}
          </select>
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