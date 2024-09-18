const { getCart, addToCart,removeFromCart ,clearCart} = require("../services/cartService");

async function getCartByUser(req, res) {
    try {
        const userId = req.user.id;

        const cart = await getCart(userId);
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
                error: { message: "No cart found for this user" },
                data: {}
            });
        }

        // Calculate total price
        let totalPrice = 0;
        cart.items.forEach(item => {
            totalPrice += item.product.price * item.quantity;
        });

        // Return only the necessary details
        const cartItems = cart.items.map(item => ({
            productName: item.product.productName,
            productImage: item.product.productImage,
            quantity: item.quantity,
            price: item.product.price
        }));

        return res.status(200).json({
            success: true,
            message: "Successfully fetched the cart",
            error: {},
            data: {
                items: cartItems,
                totalPrice: totalPrice
            }
        });
    } catch (error) {
        console.error("Error fetching cart:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the cart",
            error: error.message || "Internal Server Error",
            data: {}
        });
    }
}

async function addProductToCart(req, res) {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;

        const cart = await addToCart(userId, productId);

        // Calculate total price
        let totalPrice = 0;
        const cartItems = cart.items.map(item => {
            const itemTotalPrice = item.product.price * item.quantity;
            totalPrice += itemTotalPrice;

            return {
                productName: item.product.productName,
                productImage: item.product.productImage,
                quantity: item.quantity,
                price: item.product.price
            };
        });

        return res.status(200).json({
            success: true,
            message: "Successfully added product to cart",
            error: {},
            data: {
                items: cartItems,
                totalPrice: totalPrice
            }
        });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while adding the product to the cart",
            error: error.message || "Internal Server Error",
            data: {}
        });
    }
}
async function removeProductFromCart(req, res) {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;
        const quantityToRemove = parseInt(req.body.quantity, 10); // Assuming quantity is sent in the request body

        if (isNaN(quantityToRemove) || quantityToRemove <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid quantity",
                error: {},
                data: {}
            });
        }

        const cart = await removeFromCart(userId, productId, quantityToRemove);

        // Calculate total price after removal
        let totalPrice = 0;
        const cartItems = cart.items.map(item => {
            const itemTotalPrice = item.product.price * item.quantity;
            totalPrice += itemTotalPrice;

            return {
                productName: item.product.productName,
                productImage: item.product.productImage,
                quantity: item.quantity,
                price: item.product.price
            };
        });

        return res.status(200).json({
            success: true,
            message: "Successfully removed product from cart",
            error: {},
            data: {
                items: cartItems,
                totalPrice: totalPrice
            }
        });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while removing the product from the cart",
            error: error.message || "Internal Server Error",
            data: {}
        });
    }
}
async function clearCartForUser(req, res) {
    try {
        const userId = req.user.id;

        const cart = await clearCart(userId);

        return res.status(200).json({
            success: true,
            message: "Successfully cleared the cart",
            error: {},
            data: {
                items: cart.items, // It should return an empty array
                totalPrice: 0 // Total price should be zero since the cart is empty
            }
        });
    } catch (error) {
        console.error("Error clearing cart:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while clearing the cart",
            error: error.message || "Internal Server Error",
            data: {}
        });
    }
}


module.exports = {
    getCartByUser,
    addProductToCart,
    removeProductFromCart,
    clearCartForUser
};
