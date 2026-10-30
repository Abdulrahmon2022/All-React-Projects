import { useState } from 'react'
import '../css/Filter.css'

function Filter({ onSearch }) {
  const [inputText, setInputText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch(inputText)
  }

  return (
    <section className="filter" aria-labelledby="filter-title">
      <div className="filter__intro">
        <p className="filter__eyebrow">Looking for something?</p>
        <h2 id="filter-title">Search the collection</h2>
      </div>

      <form className="filter__form" role="search" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="product-search">
          Search products by title
        </label>
        <input
          id="product-search"
          type="search"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          placeholder="Search by product title"
        />
        <button type="submit">Search</button>
      </form>
    </section>
  )
}

export default Filter
