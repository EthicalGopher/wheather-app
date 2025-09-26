import { useState, useEffect } from 'react'
import React from 'react';
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import WeatherMetrics from './components/WeatherMetrics'
import DailyForecast from './components/DailyForecast'
import HourlyForecast from './components/HourlyForecast'
import UnitsDropdown from './components/UnitsDropdown'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import { fetchWeatherData, fetchLocationData } from './services/weatherApi'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [units, setUnits] = useState('metric')
  const [selectedDay, setSelectedDay] = useState(0)
  const [location, setLocation] = useState('Berlin')

  const handleSearch = async (searchLocation) => {
    setLoading(true)
    setError(null)

    try {
      const locationData = await fetchLocationData(searchLocation)
      if (locationData.length === 0) {
        throw new Error('Location not found')
      }

      const { latitude, longitude, name, country } = locationData[0]
      const weather = await fetchWeatherData(latitude, longitude, units)

      setWeatherData({
        ...weather,
        location: { name, country }
      })
      setLocation(name)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUnitsChange = (newUnits) => {
    setUnits(newUnits)
    if (weatherData) {
      handleSearch(location)
    }
  }

  useEffect(() => {
    handleSearch('Berlin')
  }, [])

  useEffect(() => {
    if (weatherData && location) {
      handleSearch(location)
    }
  }, [units])

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <img src="/assets/images/logo.svg" alt="Weather Now" />
          <span>Weather Now</span>
        </div>
        <UnitsDropdown units={units} onUnitsChange={handleUnitsChange} />
      </header>

      <main className="app-main">
        <div className="search-section">
          <h1>How's the sky looking today?</h1>
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} onRetry={() => handleSearch(location)} />}

        {weatherData && !loading && (
          <div className="weather-content">
            <div className="weather-left">
              <WeatherCard
                data={weatherData.current}
                location={weatherData.location}
                units={units}
              />
              <WeatherMetrics
                data={weatherData.current}
                units={units}
              />
              <DailyForecast
                data={weatherData.daily}
                units={units}
                selectedDay={selectedDay}
                onDaySelect={setSelectedDay}
              />
            </div>
            
            <div className="weather-right">
              <HourlyForecast
                data={weatherData.hourly}
                selectedDay={selectedDay}
                units={units}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App