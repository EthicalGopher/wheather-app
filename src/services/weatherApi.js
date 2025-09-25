const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast'

export async function fetchLocationData(query) {
  try {
    const response = await fetch(`${GEOCODING_API}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch location data')
    }
    
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching location data:', error)
    throw new Error('Unable to search for location. Please check your connection and try again.')
  }
}

export async function fetchWeatherData(latitude, longitude, units = 'metric') {
  try {
    const temperatureUnit = units === 'metric' ? 'celsius' : 'fahrenheit'
    const windSpeedUnit = units === 'metric' ? 'kmh' : 'mph'
    const precipitationUnit = units === 'metric' ? 'mm' : 'inch'
    
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'precipitation',
        'weather_code',
        'wind_speed_10m'
      ].join(','),
      hourly: [
        'temperature_2m',
        'weather_code'
      ].join(','),
      daily: [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min'
      ].join(','),
      temperature_unit: temperatureUnit,
      wind_speed_unit: windSpeedUnit,
      precipitation_unit: precipitationUnit,
      timezone: 'auto',
      forecast_days: 7
    })

    const response = await fetch(`${WEATHER_API}?${params}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data')
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw new Error('Unable to fetch weather data. Please check your connection and try again.')
  }
}