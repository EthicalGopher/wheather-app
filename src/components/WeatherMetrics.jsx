import { formatTemperature, formatWindSpeed, formatPrecipitation } from '../utils/weatherUtils'
import './WeatherMetrics.css'
import React from "react"

function WeatherMetrics({ data, units }) {
  const metrics = [
    {
      label: 'Feels like',
      value: formatTemperature(data.apparent_temperature, units),
    },
    {
      label: 'Humidity',
      value: `${Math.round(data.relative_humidity_2m)}%`,
    },
    {
      label: 'Wind',
      value: formatWindSpeed(data.wind_speed_10m, units),
    },
    {
      label: 'Precipitation',
      value: formatPrecipitation(data.precipitation, units),
    }
  ]

  return (
    <div className="weather-metrics">
      {metrics.map((metric, index) => (
        <div key={index} className="metric-card">
          <div className="metric-content">
            <p className="metric-label">{metric.label}</p>
            <p className="metric-value">{metric.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default WeatherMetrics