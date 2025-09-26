import './LoadingSpinner.css'
import React from "react"

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <img src="/assets/images/icon-loading.svg" alt="Loading" />
      </div>
      <p>Fetching weather data...</p>
    </div>
  )
}

export default LoadingSpinner