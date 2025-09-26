import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import React from "react"

// --- Asset Imports ---
import iconUnits from '../../assets/images/icon-units.svg'
import tick from '../../assets/images/icon-checkmark.svg'

// --- CSS Import ---
// Make sure to import the corresponding CSS file.
import './UnitsDropdown.css'

export default function UnitsDropdown({temperature,setTemperature,windSpeed,setWindSpeed,precipitation,setPrecipitation}) {
    return (
        <Menu as="div" className="units-dropdown">

            <MenuButton className="units-trigger">
                <img src={iconUnits} alt="Units Icon" />
                <span>Units</span>
                <ChevronDownIcon aria-hidden="true" className="dropdown-icon" />
            </MenuButton>

            <MenuItems
                transition
                className="units-menu"
            >
                {/* Temperature Section */}
                <div className="unit-section">
                    <p className="section-title">
                        Temperature
                    </p>
                    <MenuItem>
                        <button
                            className={`unit-option ${temperature.celsius ? "active" : ''}`}
                            onClick={() => {
                                setTemperature({ "celsius": true, "fahrenheit": false });
                                setWindSpeed({ "km/h": true, "mph": false });
                                setPrecipitation({ "millimeters": true, "inches": false });
                            }}
                        >
                            <span>Celsius (°C)</span>
                            {temperature.celsius && (
                                <img src={tick} alt="Selected" />
                            )}
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button
                            className={`unit-option ${temperature.fahrenheit ? "active" : ''}`}
                            onClick={() => {
                                setTemperature({"celsius":false,"fahrenheit":true});
                                setWindSpeed({ "km/h": false, "mph": true });
                                setPrecipitation({ "millimeters": false, "inches": true });
                            }}
                        >
                            <span>Fahrenheit (°F)</span>
                            {temperature.fahrenheit && (
                                <img src={tick} alt="Selected" />
                            )}
                        </button>
                    </MenuItem>
                </div>

                {/* Wind Speed Section */}
                <div className="unit-section">
                    <p className="section-title">
                        Wind Speed
                    </p>
                    <MenuItem>
                        <button
                            className={`unit-option ${windSpeed["km/h"] ? "active" : ''}`}
                            onClick={() => setWindSpeed({"km/h":true,"mph":false})}
                        >
                            <span>km/h</span>
                            {windSpeed["km/h"] && (
                                <img src={tick} alt="Selected" />
                            )}
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button
                            className={`unit-option ${windSpeed.mph ? "active" : ''}`}
                            onClick={() => setWindSpeed({"km/h":false,"mph":true})}
                        >
                            <span>mph</span>
                            {windSpeed.mph && (
                                <img src={tick} alt="Selected" />
                            )}
                        </button>
                    </MenuItem>
                </div>

                {/* Precipitation Section */}
                <div className="unit-section">
                    <p className="section-title">
                        Precipitation
                    </p>
                    <MenuItem>
                        <button
                            className={`unit-option ${precipitation.millimeters ? "active" : ''}`}
                            onClick={() => setPrecipitation({ "millimeters": true, "inches": false })}
                        >
                            <span>Millimeters (mm)</span>
                            {precipitation.millimeters && (
                                <img src={tick} alt="Selected"/>
                            )}
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button
                            className={`unit-option ${precipitation.inches ? "active" : ''}`}
                            onClick={() => setPrecipitation({ "millimeters": false, "inches": true })}
                        >
                            <span>Inches (in)</span>
                            {precipitation.inches && (
                                <img src={tick} alt="Selected"/>
                            )}
                        </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    )
}
