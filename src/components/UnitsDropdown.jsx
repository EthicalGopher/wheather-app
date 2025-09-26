import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import React from "react"
import './UnitsDropdown.css'

export default function UnitsDropdown({ units, onUnitsChange }) {
  return (
    <Menu as="div" className="units-dropdown">
      <MenuButton className="units-trigger">
        <img src="/assets/images/icon-units.svg" alt="Units" />
        <span>Units</span>
        <ChevronDownIcon aria-hidden="true" className="dropdown-icon" />
      </MenuButton>

      <MenuItems className="units-menu">
        <MenuItem>
          <button
            className={`unit-option ${units === 'metric' ? 'active' : ''}`}
            onClick={() => onUnitsChange('metric')}
          >
            <span>Metric</span>
            {units === 'metric' && (
              <img src="/assets/images/icon-checkmark.svg" alt="Selected" />
            )}
          </button>
        </MenuItem>
        <MenuItem>
          <button
            className={`unit-option ${units === 'imperial' ? 'active' : ''}`}
            onClick={() => onUnitsChange('imperial')}
          >
            <span>Imperial</span>
            {units === 'imperial' && (
              <img src="/assets/images/icon-checkmark.svg" alt="Selected" />
            )}
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}