// Weather code to icon mapping based on Open-Meteo weather codes
const weatherCodeMap = {
  0: '/assets/images/icon-sunny.webp',      // Clear sky
  1: '/assets/images/icon-sunny.webp',      // Mainly clear
  2: '/assets/images/icon-partly-cloudy.webp', // Partly cloudy
  3: '/assets/images/icon-overcast.webp',   // Overcast
  45: '/assets/images/icon-fog.webp',       // Fog
  48: '/assets/images/icon-fog.webp',       // Depositing rime fog
  51: '/assets/images/icon-drizzle.webp',   // Light drizzle
  53: '/assets/images/icon-drizzle.webp',   // Moderate drizzle
  55: '/assets/images/icon-drizzle.webp',   // Dense drizzle
  56: '/assets/images/icon-drizzle.webp',   // Light freezing drizzle
  57: '/assets/images/icon-drizzle.webp',   // Dense freezing drizzle
  61: '/assets/images/icon-rain.webp',      // Slight rain
  63: '/assets/images/icon-rain.webp',      // Moderate rain
  65: '/assets/images/icon-rain.webp',      // Heavy rain
  66: '/assets/images/icon-rain.webp',      // Light freezing rain
  67: '/assets/images/icon-rain.webp',      // Heavy freezing rain
  71: '/assets/images/icon-snow.webp',      // Slight snow fall
  73: '/assets/images/icon-snow.webp',      // Moderate snow fall
  75: '/assets/images/icon-snow.webp',      // Heavy snow fall
  77: '/assets/images/icon-snow.webp',      // Snow grains
  80: '/assets/images/icon-rain.webp',      // Slight rain showers
  81: '/assets/images/icon-rain.webp',      // Moderate rain showers
  82: '/assets/images/icon-rain.webp',      // Violent rain showers
  85: '/assets/images/icon-snow.webp',      // Slight snow showers
  86: '/assets/images/icon-snow.webp',      // Heavy snow showers
  95: '/assets/images/icon-storm.webp',     // Thunderstorm
  96: '/assets/images/icon-storm.webp',     // Thunderstorm with slight hail
  99: '/assets/images/icon-storm.webp',     // Thunderstorm with heavy hail
}

export function getWeatherIcon(weatherCode) {
  return weatherCodeMap[weatherCode] || '/assets/images/icon-sunny.webp'
}

export function formatTemperature(temp, units) {
  const rounded = Math.round(temp)
  const symbol = units === 'metric' ? '°C' : '°F'
  return `${rounded}${symbol}`
}

export function formatWindSpeed(speed, units) {
  const rounded = Math.round(speed)
  const unit = units === 'metric' ? 'km/h' : 'mph'
  return `${rounded} ${unit}`
}

export function formatPrecipitation(precip, units) {
  const rounded = Math.round(precip * 10) / 10
  const unit = units === 'metric' ? 'mm' : 'in'
  return `${rounded} ${unit}`
}