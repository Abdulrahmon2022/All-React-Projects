import '../css/Cart.css'

const formatPrice = (amount) => (
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
)

function Cart({
  isOpen,
  items,
  checkoutMessage,
  onChangeQuantity,
  onRemove,
  onCheckout,
  onClose,
}) {
  if (!isOpen) return null

  const totalCents = items.reduce(
    (sum, item) => sum + Math.round(item.price * 100) * item.quantity,
    0
  )
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <section className="cart" id="shopping-cart" aria-labelledby="cart-title">
      <div className="cart__header">
        <div>
          <p className="cart__eyebrow">Your selection</p>
          <h2 id="cart-title">Shopping cart <span>{itemCount}</span></h2>
        </div>
        <button className="cart__close" type="button" onClick={onClose}>
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close cart</span>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="cart__empty">
          <span className="cart__empty-icon" aria-hidden="true">🛒</span>
          <strong>Your cart is empty</strong>
          <p>Add a product and it will appear here.</p>
        </div>
      ) : (
        <>
          <ul className="cart__items">
            {items.map((item) => (
              <li className="cart__item" key={item.id}>
                <img className="cart__image" src={item.thumbnail} alt="" />

                <div className="cart__item-content">
                  <div className="cart__item-heading">
                    <div>
                      <h3>{item.title}</h3>
                      <p>{formatPrice(item.price)} each</p>
                    </div>
                    <button
                      className="cart__remove"
                      type="button"
                      onClick={() => onRemove(item.id)}
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="cart__item-footer">
                    <div className="cart__quantity">
                      <button
                        type="button"
                        onClick={() => onChangeQuantity(item.id, item.quantity - 1)}
                        aria-label={item.quantity === 1
                          ? `Remove ${item.title} from cart`
                          : `Decrease quantity of ${item.title}`}
                      >
                        -
                      </button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onChangeQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        +
                      </button>
                    </div>
                    <strong>
                      {formatPrice(
                        Math.round(item.price * 100) * item.quantity / 100
                      )}
                    </strong>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart__summary">
            <span>Subtotal</span>
            <strong>{formatPrice(totalCents / 100)}</strong>
          </div>
          <p className="cart__fine-print">
            Shipping and taxes are not included.
          </p>
          <button className="cart__checkout" type="button" onClick={onCheckout}>
            Continue to checkout
          </button>
          {checkoutMessage && (
            <p className="cart__notice" role="status">{checkoutMessage}</p>
          )}
        </>
      )}
    </section>
  )
}

export default Cart
