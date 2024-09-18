const Cart = require('../schema/cartSchema');

async function createCart(userId) {
    try {
        const newCart = await Cart.create({ user: userId });
        return newCart;
    } catch (error) {
        throw new Error("Error creating cart: " + error.message);
    }
}

async function getCartByUserId(userId) {
    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');  // Populating product details
        return cart;
    } catch (error) {
        throw new Error("Error fetching cart: " + error.message);
    }
}

async function clearCart(userId) {
    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { user: userId },
            { $set: { items: [] } },  // Clear the items array
            { new: true }
        );
        return updatedCart;
    } catch (error) {
        throw new Error("Error clearing cart: " + error.message);
    }
}

module.exports = {
    createCart,
    getCartByUserId,
    clearCart  
};
