
import ProductCard from './ProductCard'
import '../css/ProductList.css'

function ProductList({ products, isLoading, error, onAddToCart }) {
  return (
    <section className="product-list" id="products">
      <div className="product-list__heading">
        <div>
          <p className="product-list__eyebrow">The collection</p>
          <h2 className="product-list__title">Made to be discovered</h2>
          <p className="product-list__subtitle">Quality picks, honest prices, and something for everyone.</p>
        </div>
        <p className="product-list__count">
          {products.length} {products.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      <div className="product-list__grid">
        {isLoading && Array.from({ length: 6 }, (_, index) => (
          <div className="product-list__skeleton" key={index} aria-hidden="true">
            <div className="product-list__skeleton-image" />
            <div className="product-list__skeleton-body"><span /><span /><span /></div>
          </div>
        ))}
        {isLoading && <p className="sr-only" aria-live="polite">Loading products…</p>}
        {!isLoading && error && <p className="product-list__status product-list__status--error" role="alert">{error}</p>}
        {!isLoading && !error && products.length === 0 && (
          <p className="product-list__status">No products found.</p>
        )}
        {!isLoading && !error && products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  )
}

export default ProductList
