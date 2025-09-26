import { useState, useEffect, useRef } from 'react';
import React from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherMetrics from './components/WeatherMetrics';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';
import UnitsDropdown from './components/UnitsDropdown';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { fetchWeatherData, fetchLocationData } from './services/weatherApi';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true for initial fetch
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [location, setLocation] = useState('New York');

  // --- FIX: Simplified State Management ---
  // We only need one state for the detailed unit objects.
  const [temperature, setTemperature] = useState({ celsius: true, fahrenheit: false });
  const [windSpeed, setWindSpeed] = useState({ "km/h": true, mph: false });
  const [precipitation, setPrecipitation] = useState({ millimeters: true, inches: false });

  // This ref helps prevent the unit-change effect from running on the first render.
  const isInitialMount = useRef(true);

  // Helper function to get the correct API unit string ('metric' or 'imperial')
  const getApiUnits = () => (temperature.celsius ? 'metric' : 'imperial');

  const handleSearch = async (searchLocation) => {
    if (!searchLocation) return; // Prevent empty searches

    setLoading(true);
    setError(null);
    setSelectedDay(0); // Reset to the first day on a new search

    try {
      const locationData = await fetchLocationData(searchLocation);
      if (locationData.length === 0) {
        throw new Error(`Location "${searchLocation}" not found.`);
      }

      const { latitude, longitude, name, country } = locationData[0];
      // --- FIX: Use the helper function to get the current units ---
      const units = getApiUnits();
      const weather = await fetchWeatherData(latitude, longitude, units);

      setWeatherData({
        ...weather,
        location: { name, country }
      });
      setLocation(name);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- FIX: Corrected useEffect Hooks ---

  // 1. This effect runs ONLY ONCE for the initial data load.
  useEffect(() => {
    handleSearch('New York');
  }, []); // Empty array means it runs only on mount.

  // 2. This effect runs ONLY when units change, to refetch data.
  useEffect(() => {
    // Skip this effect on the very first render.
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // If we have a location, refetch the data with the new units.
    if (location) {
      handleSearch(location);
    }
    // This effect is tied to the temperature state. Since your dropdown
    // updates all units when you switch between Celsius/Fahrenheit,
    // this is a reliable trigger.
  }, [temperature]);


  return (
      <div className="app">
        <header className="app-header">
          <div className="logo">
            <img src="/assets/images/logo.svg" alt="Weather Now" />

          </div>
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
                <div className="weather-left">
                  <WeatherCard
                      data={weatherData.current}
                      location={weatherData.location}
                      units={getApiUnits()}
                  />
                  <WeatherMetrics
                      data={weatherData.current}
                      units={getApiUnits()}
                  />
                  <DailyForecast
                      data={weatherData.daily}
                      units={getApiUnits()}
                      selectedDay={selectedDay}
                      onDaySelect={setSelectedDay}
                  />
                </div>

                <div className="weather-right">
                  <HourlyForecast
                      data={weatherData.hourly}
                      selectedDay={selectedDay}
                      units={getApiUnits()}
                  />
                </div>
              </div>
          )}
        </main>
      </div>
  );
}

export default App;