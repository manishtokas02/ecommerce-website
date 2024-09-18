const Order = require("../schema/orderSchema");

async function createNewOrder(orderDetails) {
    try {
        const order = await Order.create(orderDetails);
        return order;
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            });
            throw new Error(errorMessageList.join(', '));
        }
        console.log(error);
        throw new Error('Internal Server Error');
    }
}

async function getOrdersByUserId(userId) {
    try {
        const orders = await Order.find({ user: userId }).populate('items.product');
        return orders;
    } catch (error) {
        console.log(error);
        throw new Error('Internal Server Error');
    }
}

async function getOrderById(orderId) {
            try {
                // Fetch the order and populate only the fields you need
                const order = await Order.findById(orderId)
                    .populate({
                        path: 'items.product',
                        select: 'productName productImage'  // Specify the fields you want to include
                    });
        
                return order;
            } catch (error) {
                console.log(error);
                throw new Error('Internal Server Error');
            }
        }
        

async function updateOrderStatus(orderId, status) {
    try {
        const order = await Order.findByIdAndUpdate(orderId, { status: status }, { new: true });
        console.log(order);
        return order;
    } catch (error) {
        console.log(error);
        throw new Error('Internal Server Error');
    }
}

module.exports = {
    createNewOrder,
    getOrderById,
    getOrdersByUserId,
    updateOrderStatus
};
