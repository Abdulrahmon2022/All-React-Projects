import { useEffect, useRef } from 'react'
import Cart from './Cart'
import '../css/Header.css'

function Header({
  cartCount,
  isCartOpen,
  onCartClick,
  cartItems,
  checkoutMessage,
  onChangeQuantity,
  onRemove,
  onCheckout,
  onCartClose,
}) {
  const cartWrapperRef = useRef(null)

  useEffect(() => {
    if (!isCartOpen) return undefined

    const handlePointerDown = (event) => {
      if (!cartWrapperRef.current?.contains(event.target)) onCartClose()
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onCartClose()
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isCartOpen, onCartClose])

  return (
    <header className="header">
      <section className="header__content">
        <div className="header__brand">
          <div className="header__logo" aria-hidden="true">N</div>
          <div>
            <p className="header__eyebrow">Curated marketplace</p>
            <h1>Northstar Market</h1>
          </div>
        </div>

        <div className="header__cart-wrap" ref={cartWrapperRef}>
          <button
            className="header__cart"
            type="button"
            onClick={onCartClick}
            aria-expanded={isCartOpen}
            aria-controls="shopping-cart"
            aria-label={`${isCartOpen ? 'Close' : 'Open'} shopping cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
          >
            <span className="header__cart-icon" aria-hidden="true">🛍</span>
            <span className="header__cart-copy">
              <small>Your cart</small>
              <strong>{cartCount} {cartCount === 1 ? 'item' : 'items'}</strong>
            </span>
            <span className={`header__cart-chevron ${isCartOpen ? 'header__cart-chevron--open' : ''}`} aria-hidden="true">⌄</span>
          </button>

          <Cart
            isOpen={isCartOpen}
            items={cartItems}
            checkoutMessage={checkoutMessage}
            onChangeQuantity={onChangeQuantity}
            onRemove={onRemove}
            onCheckout={onCheckout}
            onClose={onCartClose}
          />
        </div>
      </section>

      <div className="header__hero">
        <p className="header__hero-label">New season · Fresh finds</p>
        <h2>Beautiful essentials,<br />chosen for youuu.</h2>
        <p className="header__hero-copy">
          Explore a handpicked collection of our standout products designed to make every day a little better.
        </p>
        <a className="header__hero-link" href="#products">
          Explore the collection <span aria-hidden="true">→</span>
        </a>
      </div>
    </header>
  )
}

export default Header
