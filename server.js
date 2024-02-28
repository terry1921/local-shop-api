const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const categoriesFilePath = path.join(__dirname, 'data', 'categories.json');
const productsFilePath = path.join(__dirname, 'data', 'products.json');

// Ensure mock data files exist
const ensureDataFilesExist = () => {
  if (!fs.existsSync(categoriesFilePath)) {
    fs.writeFileSync(categoriesFilePath, JSON.stringify([]));
  }
  if (!fs.existsSync(productsFilePath)) {
    fs.writeFileSync(productsFilePath, JSON.stringify([]));
  }
};

// Routes
// GET /categories
app.get('/categories', (req, res) => {
  const categories = JSON.parse(fs.readFileSync(categoriesFilePath));
  res.json(categories);
});

// GET /products
app.get('/products', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath));
  const { category } = req.query;

  if (category) {
    const filteredProducts = products.filter((product) => product.category === category);
    res.json(filteredProducts);
  } else {
    res.json(products);
  }
});

// In-memory shopping cart
let shoppingCarts = {}; // Stores multiple shopping carts indexed by UUID

// Function to create a new cart and return its UUID
function createCart() {
  const cartId = uuidv4();
  shoppingCarts[cartId] = { items: {} };
  return cartId;
}

// Function to add item to a specific cart
function addItemToCart(cartId, productId, quantity) {
  if (!shoppingCarts[cartId]) {
    console.log(`Cart ID ${cartId} not found, creating a new cart.`);
    cartId = createCart(); // Create a new cart if cartId does not exist
  }

  let cart = shoppingCarts[cartId];
  if (cart.items[productId]) {
    cart.items[productId] += quantity;
  } else {
    cart.items[productId] = quantity;
  }

  return cartId; // Return the cartId, new or existing
}

// POST /shopping-cart
app.post('/shopping-cart', (req, res) => {
  const { cartId, productId, quantity } = req.body;
  let updatedCartId;

  if (cartId && shoppingCarts[cartId]) {
    // Add item to existing cart
    updatedCartId = addItemToCart(cartId, productId, quantity);
    res.status(200).json({ message: 'Product added to cart successfully', cartId: updatedCartId });
  } else if (!cartId || !shoppingCarts[cartId]) {
    // Create a new cart and add item
    updatedCartId = createCart(); // Create a new cart
    addItemToCart(updatedCartId, productId, quantity);
    res.status(200).json({ message: 'New cart created and product added successfully', cartId: updatedCartId });
  }
});

function getCart(cartId) {
  const cart = shoppingCarts[cartId];
  if (!cart) {
    return { error: 'Cart not found' };
  }

  const products = JSON.parse(fs.readFileSync(productsFilePath));
  let cartTotal = 0;

  const cartItems = Object.entries(cart.items).map(([productId, quantity]) => {
    const product = products.find((product) => product.id === productId);
    if (!product) {
      return { id: productId, error: 'Product not found' };
    }

    const itemTotal = product.price * quantity;
    cartTotal += itemTotal;

    return {
      id: productId,
      name: product.name,
      price: product.price,
      quantity,
      total: itemTotal.toFixed(2) // Total por ítem
    };
  });

  return {
    items: cartItems,
    total: cartTotal.toFixed(2) // Total del carrito
  };
}

// GET /shopping-cart/:cartId
app.get('/shopping-cart/:cartId', (req, res) => {
  const { cartId } = req.params;
  const cartDetails = getCart(cartId);

  if (cartDetails.error) {
    return res.status(404).json({ error: cartDetails.error });
  }

  res.json(cartDetails);
});

// Start server
app.listen(PORT, () => {
  ensureDataFilesExist(); // Ensure mock data files exist before the server starts
  console.log(`Server running on port ${PORT}`);
});
