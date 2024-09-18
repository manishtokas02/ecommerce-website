const Product = require('../schema/productSchema');

async function createProduct(productDetails) {
    try {
        const response = await Product.create(productDetails);
        return response;
    } catch (error) {
        console.log('Error creating product:', error);
        throw error; // Propagate the error to be handled in the service layer
    }
}

async function getProductById(productId) {
    try {
        const product = await Product.findById(productId);
        return product;
    } catch (error) {
        console.log('Error fetching product by ID:', error);
        throw error; // Re-throw the error for the service layer to handle
    }
}

async function getAllProducts() {
    try {
        const products = await Product.find({});
        return products;
    } catch (error) {
        console.log('Error fetching all products:', error);
        throw error; // Re-throw the error for the service layer
    }
}

async function deleteProductById(productId) {
    try {
        const response = await Product.findByIdAndDelete(productId);
        return response;
    } catch (error) {
        console.log('Error deleting product by ID:', error);
        throw error; // Re-throw the error for the service layer
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    deleteProductById
};
