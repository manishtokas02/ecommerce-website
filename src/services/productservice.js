const cloudinary = require('../config/cloudinaryConfig');
const ProductRepository = require('../repositories/productRepositories');
const fs = require('fs/promises');

async function createProduct(productDetails) {
            const imagePath = productDetails.imagePath; 
            let productImage = '';
        
            if (imagePath) {
                try {
                    const cloudinaryResponse = await cloudinary.uploader.upload(imagePath); 
                    productImage = cloudinaryResponse.secure_url;
        
                    // Delete local image after successful upload
                    await fs.unlink(imagePath); 
                } catch (error) {
                    console.error('Error uploading to Cloudinary:', error);
                    throw { reason: 'Image upload failed', statusCode: 500 }; 
                }
            }
        
            const product = await ProductRepository.createProduct({
                ...productDetails,
                productImage: productImage || '',
            });
        
            if (!product) {
                throw { reason: 'Unable to create product', statusCode: 500 };
            }
        
            return product;
        }
        
        async function getProductById(productId) {
            const product = await ProductRepository.getProductById(productId);
            if (!product) {
                throw { reason: 'Product not found', statusCode: 404 };
            }
            return product;
        }
        
        async function getAllProductsData() {
            const products = await ProductRepository.getAllProducts();
            if (!products || products.length === 0) {
                throw { reason: 'No products found', statusCode: 404 };
            }
            return products;
        }
        
        async function deleteProductById(productId) {
            const deletedProduct = await ProductRepository.deleteProductById(productId);
            if (!deletedProduct) {
                throw { reason: 'Product not found', statusCode: 404 };
            }
            return deletedProduct;
        }
        
        module.exports = {
            createProduct,
            getProductById,
            deleteProductById,
            getAllProductsData,
        };