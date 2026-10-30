import '../css/Categories.css'

function Categories ({categories, selectedCategory, onCategoryChange, error}) {
    return (
        <section className="categories" aria-labelledby="categories-title">
          <div className="categories__intro">
            <div>
              <p className="categories__eyebrow">Find your favorite</p>
              <h2 id="categories-title">Shop by category</h2>
            </div>
            <p>Browse the collection by what matters to you.</p>
          </div>

          <div className="categories__options">
            <button
              type="button"
              onClick={() => onCategoryChange('all')}
              aria-pressed={selectedCategory === 'all'}
            >
              All products
            </button>

            {categories.map((category) => (
              <button
                type="button"
                key={category.slug}
                onClick={() => onCategoryChange(category.slug)}
                aria-pressed={selectedCategory === category.slug}
              >
                {category.name}
              </button>
            ))}
          </div>

          {error && <p className="categories__error" role="alert">{error}</p>}

        </section>
    )
}

export default Categories
