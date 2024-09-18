const { createProduct, getAllProductsData, getProductById, deleteProductById } = require('../services/productservice'); // Ensure these are correctly imported

async function addProduct(req, res) {
    try {
        const product = await createProduct({
            productName: req.body.productName,
            description: req.body.description,
            imagePath: req.file ? req.file.path : '', // Ensure Multer is setting the file path correctly
            price: req.body.price,
            category: req.body.category,
            inStock: req.body.inStock
        });

        return res.status(201).json({
            success: true,
            message: 'Successfully created the product',
            error: {},
            data: product
        });
    } catch (error) {
        console.error('Error creating product:', error);
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.reason || 'Internal server error',
            data: {},
            error: error.message || error
        });
    }
}

async function getProducts(req, res) {
    try {
        const response = await getAllProductsData();
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched the products',
            error: {},
            data: response
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.reason || 'Internal server error',
            data: {},
            error: error.message || error
        });
    }
}

async function getProduct(req, res) {
    try {
        const product = await getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
                data: {},
                error: {}
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched the product',
            error: {},
            data: product
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.reason || 'Internal server error',
            data: {},
            error: error.message || error
        });
    }
}

async function deleteProduct(req, res) {
    try {
        const response = await deleteProductById(req.params.id);
        if (!response) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
                data: {},
                error: {}
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Successfully deleted the product',
            error: {},
            data: response
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.reason || 'Internal server error',
            data: {},
            error: error.message || error
        });
    }
}

module.exports = {
    addProduct,
    getProducts,
    getProduct,
    deleteProduct
};
