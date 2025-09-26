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

  // --- STATE CHANGE: Manage units individually ---
  const [temperature, setTemperature] = useState({ celsius: true, fahrenheit: false });
  const [windSpeed, setWindSpeed] = useState({ "km/h": true, mph: false });
  const [precipitation, setPrecipitation] = useState({ millimeters: true, inches: false });

  const [selectedDay, setSelectedDay] = useState(0)
  const [location, setLocation] = useState('New York')

  // Helper to get the API unit ('metric' or 'imperial') from our state
  const getApiUnits = () => {
    return temperature.celsius ? 'metric' : 'imperial';
  }

  const handleSearch = async (searchLocation) => {
    setLoading(true)
    setError(null)

    try {
      const locationData = await fetchLocationData(searchLocation)
      if (locationData.length === 0) {
        throw new Error('Location not found')
      }

      const { latitude, longitude, name, country } = locationData[0]
      // Use the helper to get the correct unit for the API call
      const weather = await fetchWeatherData(latitude, longitude, getApiUnits())

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

  // Refetch data whenever any unit changes
  useEffect(() => {
    if (weatherData) {
      handleSearch(location);
    }
  }, [temperature, windSpeed, precipitation]);


  useEffect(() => {
    handleSearch('New York')
  }, [])

  return (
      <div className="app">
        <header className="app-header">
          <div className="logo">
            <img src="/assets/images/logo.svg" alt="Weather App" />
          </div>
          {/* Pass all the individual states and setters to the dropdown */}
          <UnitsDropdown
              temperature={temperature}
              setTemperature={setTemperature}
              windSpeed={windSpeed}
              setWindSpeed={setWindSpeed}
              precipitation={precipitation}
              setPrecipitation={setPrecipitation}
          />
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
                <div className="current-weather">
                  <WeatherCard
                      data={weatherData.current}
                      location={weatherData.location}
                      units={getApiUnits()}
                  />
                  <WeatherMetrics
                      data={weatherData.current}
                      units={getApiUnits()}
                  />
                </div>

                <DailyForecast
                    data={weatherData.daily}
                    units={getApiUnits()}
                    selectedDay={selectedDay}
                    onDaySelect={setSelectedDay}
                />

                <HourlyForecast
                    data={weatherData.hourly}
                    selectedDay={selectedDay}
                    units={getApiUnits()}
                />
              </div>
          )}
        </main>

        <footer className="attribution">
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
          Coded by <a href="#">Your Name Here</a>.
        </footer>
      </div>
  )
}

export default App