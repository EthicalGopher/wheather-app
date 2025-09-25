import { useState, useEffect } from 'react'
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
  const [location, setLocation] = useState('New York')

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

  const handleUnitsChange = async (newUnits) => {
    setUnits(newUnits)
    if (weatherData) {
      setLoading(true)
      try {
        const locationData = await fetchLocationData(location)
        const { latitude, longitude } = locationData[0]
        const weather = await fetchWeatherData(latitude, longitude, newUnits)
        setWeatherData({
          ...weather,
          location: weatherData.location
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    handleSearch('New York')
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <img src="/assets/images/logo.svg" alt="Weather App" />
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
            <div className="current-weather">
              <WeatherCard 
                data={weatherData.current} 
                location={weatherData.location}
                units={units}
              />
              <WeatherMetrics 
                data={weatherData.current} 
                units={units}
              />
            </div>

            <DailyForecast 
              data={weatherData.daily} 
              units={units}
              selectedDay={selectedDay}
              onDaySelect={setSelectedDay}
            />

            <HourlyForecast 
              data={weatherData.hourly} 
              selectedDay={selectedDay}
              units={units}
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