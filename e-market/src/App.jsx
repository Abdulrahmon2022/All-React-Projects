import { useEffect, useState } from 'react'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Categories from './components/Categories'
import Filter from './components/Filter'
import { fetchcategories, fetchproducts } from './services/product'

const CART_STORAGE_KEY = 'northstar-market-cart'

function App() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = window.localStorage.getItem(CART_STORAGE_KEY)
      const parsedCart = savedCart ? JSON.parse(savedCart) : []

      return Array.isArray(parsedCart)
        ? parsedCart.filter((item) => (
            item &&
            Number.isInteger(item.id) &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0 &&
            Number.isFinite(item.price)
          ))
        : []
    } catch {
      return []
    }
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [checkoutMessage, setCheckoutMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [categoriesError, setCategoriesError] = useState('')

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  const handleCategoryChange = (category) => {
    if (category === selectedCategory) return

    setIsLoading(true)
    setError('')
    setSearchTerm('')
    setSelectedCategory(category)
  }

  const handleSearch = (inputText) => {
    setSearchTerm(inputText.trim())
  }

  const handleAddToCart = (product) => {
    setCheckoutMessage('')
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id)

      if (existingItem) {
        return currentCart.map((item) => (
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ))
      }

      return [...currentCart, { ...product, quantity: 1 }]
    })
  }

  const handleChangeQuantity = (productId, quantity) => {
    setCheckoutMessage('')
    setCart((currentCart) => (
      quantity < 1
        ? currentCart.filter((item) => item.id !== productId)
        : currentCart.map((item) => (
            item.id === productId ? { ...item, quantity } : item
          ))
    ))
  }

  const handleRemoveFromCart = (productId) => {
    setCheckoutMessage('')
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId))
  }

  const handleCheckout = () => {
    if (cart.length > 0) {
      setCheckoutMessage(
        'Checkout is a demo. Connect a payment provider to accept orders.'
      )
    }
  }

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch (storageError) {
      console.error('Unable to save the cart in this browser.', storageError)
    }
  }, [cart])

  useEffect(() => {
    fetchcategories()
      .then(setCategories)
      .catch(() => setCategoriesError('Categories could not be loaded.'))
  }, [])

  useEffect(() => {
    let ignore = false

    fetchproducts(selectedCategory)
      .then((data) => {
        if (!ignore) setProducts(data)
      })
      .catch(() => {
        if (!ignore) {
          setProducts([])
          setError('Products could not be loaded. Please try again.')
        }
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [selectedCategory])

  const normalizedSearchTerm = searchTerm.toLowerCase()
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(normalizedSearchTerm)
    const matchesCategory = selectedCategory === 'all' ||
      product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="app-shell">
      <Header
        cartCount={cartCount}
        isCartOpen={isCartOpen}
        onCartClick={() => setIsCartOpen((isOpen) => !isOpen)}
        cartItems={cart}
        checkoutMessage={checkoutMessage}
        onChangeQuantity={handleChangeQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
        onCartClose={() => setIsCartOpen(false)}
      />

      <main className="app-main">
        <Categories
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          error={categoriesError}
        />

        <Filter key={selectedCategory} onSearch={handleSearch} />

        <ProductList
          products={filteredProducts}
          isLoading={isLoading}
          error={error}
          onAddToCart={handleAddToCart}
        />
      </main>

      <footer className="app-footer">
        <p>Thoughtfully selected products for everyday living.</p>
        <p>© 2026 Northstar Market</p>
      </footer>
    </div>
  )
}

export default App
