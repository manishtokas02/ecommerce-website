const { getCartByUserId } = require("../repositories/cartRepositories");
const { getProductById } = require("../repositories/productRepositories");

async function getCart(userId) {
    const cart = await getCartByUserId(userId);
    if (!cart) {
        throw new Error('Cart not found');
    }
    return cart;
}

async function addToCart(userId, productId) {
    // Get the user's cart
    let cart = await getCartByUserId(userId);

    // Fetch the product details
    const product = await getProductById(productId);

    // Check if the product exists and is in stock
    if (!product) {
        throw new Error("Product not found");
    }

    if (!product.inStock) {
        throw new Error("Product not available in stock");
    }

    // Check if the product is already in the cart
    let existingProduct = cart.items.find(item => item.product._id.toString() === productId);

    if (existingProduct) {
        // If the product exists in the cart, increment the quantity
        existingProduct.quantity += 1;
    } else {
        // If the product is not in the cart, add it with complete details
        cart.items.push({
            product: {
                _id: product._id,
                productName: product.productName,
                productImage: product.productImage,
                price: product.price
            },
            quantity: 1
        });
    }

    // Save the updated cart
    await cart.save();

    return cart;
}
async function removeFromCart(userId, productId, quantityToRemove) {
    const cart = await getCartByUserId(userId);

    if (!cart) {
        throw new Error("Cart not found");
    }

    const itemIndex = cart.items.findIndex(item => item.product._id.toString() === productId);

    if (itemIndex === -1) {
        throw new Error("Product not found in cart");
    }

    const item = cart.items[itemIndex];

    if (item.quantity <= quantityToRemove) {
        // Remove the item if the quantity to remove is greater than or equal to the current quantity
        cart.items.splice(itemIndex, 1);
    } else {
        // Decrease the quantity of the item
        item.quantity -= quantityToRemove;
    }

    await cart.save();

    return cart;
}
async function clearCart(userId) {
    const cart = await getCartByUserId(userId);
    if (!cart) {
        throw new Error("Cart not found");
    }

    // Clear the items in the cart
    cart.items = [];

    // Save the cart
    await cart.save();

    return cart;
}


module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    clearCart
};
