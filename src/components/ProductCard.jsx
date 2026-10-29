import '../css/ProductCard.css'

function ProductCard({ product, onAddToCart }) {
  const isInStock = product.stock > 0

  return (
    <article className="product-card group">
      <div className="product-card__image-wrap">
        <img
          className="product-card__image"
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />
        <span className={`product-card__badge ${isInStock ? '' : 'product-card__badge--out'}`}>
          {isInStock ? 'In stock' : 'Sold out'}
        </span>
      </div>

      <div className="product-card__body">
        <div className="product-card__details">
          <div className="product-card__meta">
            <span>{product.category?.replaceAll('-', ' ')}</span>
            <span className="product-card__rating" aria-label={`${product.rating} out of 5 stars`}>
              <span aria-hidden="true">★</span> {product.rating?.toFixed(1)}
            </span>
          </div>
          <h3 className="product-card__name">{product.title}</h3>
          <p className="product-card__description">
            {product.description}
          </p>
        </div>

        <div className="product-card__footer">
          <p className="product-card__price">${product.price.toFixed(2)}</p>
          <button
            className="product-card__button"
            type="button"
            onClick={() => onAddToCart(product)}
            aria-label={`Add ${product.title} to cart`}
            disabled={!isInStock}
          >
            {isInStock ? 'Add to cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
