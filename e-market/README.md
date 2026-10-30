# Northstar Market

Northstar Market is a responsive e-commerce product catalog built with React, Vite, and Tailwind CSS. It uses [DummyJSON](https://dummyjson.com/) for sample products, categories, and product images.

> This is a front-end demonstration. Checkout does not process real orders or payments.

## Features

- Responsive product catalog with light and dark modes
- Category filtering using live API data
- Product images, descriptions, ratings, prices, and stock status
- Loading skeletons, empty states, and request error messages
- Shopping-cart dropdown with quantity controls and product removal
- Line totals and cart subtotal calculation
- Cart persistence with browser `localStorage`
- Accessible labels, focus states, keyboard controls, and semantic HTML

## Technology

- React 19
- Vite 8
- Tailwind CSS 4
- JavaScript and JSX
- Fetch API and `localStorage`
- ESLint

## DummyJSON API

The project uses the [DummyJSON Products API](https://dummyjson.com/docs/products) as its product-data source.

| Purpose | Endpoint |
| --- | --- |
| General product catalog | `https://dummyjson.com/products` |
| Product categories | `https://dummyjson.com/products/categories` |
| Products in a category | `https://dummyjson.com/products/category/{category-slug}` |

API requests are handled in [`src/services/product.js`](src/services/product.js). The application requires an internet connection because its catalog and images are remote. The general endpoint returns 30 products by default.

## Getting Started

```bash
cd E-commerce-Product-Catalog
npm install
npm run dev
```

Open the local address displayed by Vite.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run lint` | Run ESLint checks |
| `npm run preview` | Preview the production build |

## Project Structure

```text
src/
├── components/
│   ├── Cart.jsx
│   ├── Categories.jsx
│   ├── Header.jsx
│   ├── ProductCard.jsx
│   └── ProductList.jsx
├── css/
│   ├── Cart.css
│   ├── Categories.css
│   ├── Header.css
│   ├── ProductCard.css
│   └── ProductList.css
├── services/
│   └── product.js
├── App.jsx
├── index.css
└── main.jsx
```

`App.jsx` manages product, category, loading, error, and cart state. Components render the header, filters, product grid, product cards, and cart. Cart contents are saved under `northstar-market-cart` in `localStorage` and restored after a refresh.

## Limitations

- DummyJSON provides sample data rather than real inventory.
- Search, sorting, pagination, authentication, and product detail pages are not included.
- Cart data is stored only in the current browser.
- Checkout and payment processing are not implemented.
- Prices are displayed in USD.

## Acknowledgement

Product information and images are provided by [DummyJSON](https://dummyjson.com/). See the [official documentation](https://dummyjson.com/docs) for more information.
