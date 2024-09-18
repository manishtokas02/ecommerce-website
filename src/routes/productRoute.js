const express = require('express');
const { addProduct, getProduct, deleteProduct, getProducts } = require('../controllers/productControllers'); // Ensure this path is correct
const uploader = require('../middlewares/multerMiddleware'); // Ensure this path is correct
const { isLoggedIn, isAdmin } = require('../validation/authValidation');

const productRouter = express.Router();


productRouter.post('/',isLoggedIn,isAdmin, uploader.single('productImage'), addProduct);


productRouter.get('/', isLoggedIn,isAdmin,getProducts);


productRouter.get('/:id',isLoggedIn,isAdmin, getProduct);


productRouter.delete('/:id',isLoggedIn,isAdmin, deleteProduct);

module.exports = productRouter;
