//order.js

let orders = [];

function getOrder(id) {
    return orders.find(order => order.id === id);
}

function postOrder(order) {
    order.id = Date.now();
    orders.push(order);
    return order;
}

function patchOrder(id, updatedOrder) {
    let order = getOrder(id);
    if (!order) {
        return null;
    }

    Object.assign(order, updatedOrder);
    return order;
}

function getAllOrders() {
    return orders;
}

function getSingleOrder(id) {
    let order = getOrder(id);
    if (!order) {
        return null;
    }

    return { order };
}

module.exports = {
    getOrder,
    postOrder,
    patchOrder,
    getAllOrders,
    getSingleOrder
};