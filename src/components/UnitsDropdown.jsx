import { useState } from 'react'
import './UnitsDropdown.css'

function UnitsDropdown({ units, onUnitsChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const unitOptions = [
    { value: 'metric', label: 'Metric', temp: 'Celsius (°C)', wind: 'km/h', precip: 'mm' },
    { value: 'imperial', label: 'Imperial', temp: 'Fahrenheit (°F)', wind: 'mph', precip: 'in' }
  ]

  const currentUnit = unitOptions.find(option => option.value === units)

  const handleUnitChange = (newUnits) => {
    onUnitsChange(newUnits)
    setIsOpen(false)
  }

  return (
    <div className="units-dropdown">
      <button 
        className="units-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src="/assets/images/icon-units.svg" alt="Units" />
        <span>Units</span>
        <img 
          src="/assets/images/icon-dropdown.svg" 
          alt="Dropdown" 
          className={`dropdown-icon ${isOpen ? 'open' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="units-menu">
          <div className="units-header">
            <h4>Switch to Imperial/Metric</h4>
          </div>
          
          {unitOptions.map((option) => (
            <div key={option.value} className="unit-section">
              <button
                className={`unit-option ${units === option.value ? 'active' : ''}`}
                onClick={() => handleUnitChange(option.value)}
              >
                <div className="unit-main">
                  <span className="unit-label">{option.label}</span>
                  {units === option.value && (
                    <img src="/assets/images/icon-checkmark.svg" alt="Selected" />
                  )}
                </div>
                <div className="unit-details">
                  <div className="unit-detail">
                    <span className="detail-label">Temperature:</span>
                    <span className="detail-value">{option.temp}</span>
                  </div>
                  <div className="unit-detail">
                    <span className="detail-label">Wind Speed:</span>
                    <span className="detail-value">{option.wind}</span>
                  </div>
                  <div className="unit-detail">
                    <span className="detail-label">Precipitation:</span>
                    <span className="detail-value">{option.precip}</span>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      )}

      {isOpen && (
        <div 
          className="units-overlay" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default UnitsDropdown