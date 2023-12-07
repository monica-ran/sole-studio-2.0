const db = require("./client");

const createOrder = async ({ user_name, order_Date, order_status }) => {
    try {
        const {
            rows: [order],
        } = await db.query(
            `
        INSERT INTO orders(user_name, order_Date, order_status)
        VALUE($1, $2, $3)
        RETURNING *
        `[(user_name, order_Date, order_status)]
        );
        return order;
    } catch (err) {
        throw err;
    }
};

const findActiveOrder = async (user_id) => {
    try {
        const {
            rows: [order],
        } = await db.query(
            `
        SELECT * FROM orders
        WHERE user_id = $1 
        AND active_order = true
        `,
            [user_id]
        );
        return order;
    } catch (err) {
        throw err;
    }
};

const updateOrder = async ({order_id, active_order, total}) => {
    try {
        const {
            rows: [order],
        } = await db.query(
            `
            UPDATE orders
            SET active_order=$2, total=$3
            WHERE order_id = $1
            RETURNING *;
        `,
            [order_id, active_order, total]
        );
        return order;
    } catch (err) {
        throw err;
    }
}

const addProductToActiveOrder = async ({user_id, product_id}) => {
    try {
        const activeOrder = await findActiveOrder(user_id)
        const {
            rows: [orderProduct],
        } = await db.query(
            `
            INSERT INTO order_product(order_id, product_id)
            VALUE($1, $2)
            RETURNING *
        `,
            [activeOrder.order_id, product_id]
        );
        return orderProduct;
    } catch (err) {
        throw err;
    }
}

const removeProductFromActiveOrder = async ({user_id, product_id}) => {
    try {
        const activeOrder = await findActiveOrder(user_id)
        const {
            rows: [orderProduct],
        } = await db.query(
            `
            DELETE FROM order_product(order_id, product_id)
            WHERE order_id = $1 
            AND product_id = $2
            RETURING *
        `,
            [activeOrder.order_id, product_id]
        );
        return orderProduct;
    } catch (err) {
        throw err;
    }

}
module.exports = {
    createOrder,
    findActiveOrder,
    updateOrder,
    addProductToActiveOrder,
    removeProductFromActiveOrder,
};
