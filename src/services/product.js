export async function fetchproducts(category = 'all') {
    const endpoint = category === 'all'
        ? 'https://dummyjson.com/products'
        : `https://dummyjson.com/products/category/${encodeURIComponent(category)}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data.products;
}

export async function fetchcategories() {
    const response = await fetch('https://dummyjson.com/products/categories');

    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }

    return response.json();
}
