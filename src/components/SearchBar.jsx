import { useState } from 'react'
import './SearchBar.css'
import React from "react"

function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim() && !loading) {
      onSearch(query.trim())
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-container">
        <img src="/assets/images/icon-search.svg" alt="Search" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a place..."
          className="search-input"
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        className="search-button"
        disabled={loading || !query.trim()}
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar