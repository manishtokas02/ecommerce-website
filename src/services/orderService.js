const { getCartByUserId, clearCart } = require("../repositories/cartRepositories");
const { findUser } = require("../repositories/userRepository");
const { createNewOrder, getOrdersByUserId, getOrderById, updateOrderStatus } = require("../repositories/orderRepositories");

async function createOrder(userId, paymentMethod) {
    const cart = await getCartByUserId(userId);
    const user = await findUser({ _id: cart.user });

    if (!cart) {
        throw new Error("Cart not found");
    }

    if (cart.items.length === 0) {
        throw new Error("Cart is empty, please add some items to the cart");
    }

    const orderObject = {
        user: cart.user,
        items: cart.items.map(cartItem => ({
            product: {
                _id: cartItem.product._id,
                productName: cartItem.product.productName,  // Only include necessary fields
                productImage: cartItem.product.productImage  // Only include necessary fields
            },
            quantity: cartItem.quantity
        })),
        status: "ORDERED",
        totalPrice: cart.items.reduce((total, cartItem) => total + cartItem.quantity * cartItem.product.price, 0),
        address: user.address,
        paymentMethod
    };

    const order = await createNewOrder(orderObject);

    if (!order) {
        throw new Error("Internal Server Error: Order could not be created");
    }

    await clearCart(userId);

    return order;
}

async function getAllOrdersCreatedByUser(userId) {
    const orders = await getOrdersByUserId(userId);

    if (!orders) {
        throw new Error("Orders not found");
    }

    return orders;
}

async function getOrderDetailsById(orderId) {
    const order = await getOrderById(orderId);

    if (!order) {
        throw new Error("Order not found");
    }

    return order;
}

async function updateOrder(orderId, status) {
    const order = await updateOrderStatus(orderId, status);

    if (!order) {
        throw new Error("Order not found or status update failed");
    }

    return order;
}

module.exports = {
    createOrder,
    getAllOrdersCreatedByUser,
    getOrderDetailsById,
    updateOrder
};
