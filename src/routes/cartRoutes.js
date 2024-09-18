const express = require('express');
const { getCartByUser, addProductToCart, removeProductFromCart,clearCartForUser } = require('../controllers/cartControllers');  // Ensure these are imported correctly
const { isLoggedIn } = require('../validation/authValidation');

const cartRouter = express.Router();

// Route to get the cart for the logged-in user
cartRouter.get('/', isLoggedIn, getCartByUser);  

// Route to add a product to the cart
cartRouter.post('/add/:productId', isLoggedIn, addProductToCart);

// Route to remove a product from the cart
cartRouter.delete('/remove/:productId', isLoggedIn, removeProductFromCart);

cartRouter.delete('/clear', isLoggedIn, clearCartForUser);

module.exports = cartRouter;
