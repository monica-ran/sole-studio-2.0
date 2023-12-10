const db = require("./client");

const createOrder = async ({ user_id, order_date }) => {
    try {
        if (!order_date) order_date = new Date().toISOString();
        let active_order = true;
        const {
            rows: [order],
        } = await db.query(
            `
            INSERT INTO orders(user_id, order_date, active_order)
            VALUES($1, $2, $3)
            RETURNING *
        `,
            [user_id, order_date, active_order]
        );
        return order;
    } catch (err) {
        throw err;
    }
};

const findActiveOrder = async (user_id) => {
    try {
        const response = await db.query(
            `
            SELECT * FROM orders
            WHERE user_id = $1 
            AND active_order = 'true'
        `,
            [user_id]
        );
        let order = response.rows[0];
        if (!order) {
           order = await createOrder({ user_id });
        }

        const productResponse = await db.query(
            `
            SELECT op.product_id, p.name, p.description, p.price, p.size, p.image_url 
            FROM order_product op
            JOIN products p on op.product_id = p.id
            WHERE op.order_id = $1
        `,
            [order.id]
        );

        //add prices to get total
        let total = 0;
        productResponse.rows.forEach((product) => (total += Number(product.price)));

        //group products to get quantity
        let products = {};
        productResponse.rows.forEach((product) => {
            let productId = product.product_id;
            if (!products[productId]) {
                products[productId] = {
                    ...product,
                    quantity: 0,
                };
            }
            products[productId].quantity++;
        });
        products = Object.values(products);

        return { ...order, products, total: Math.round(total * 100) / 100 };
    } catch (err) {
        throw err;
    }
};

const checkoutOrder = async ({ user_id }) => {
    try {
        let { id, total } = await findActiveOrder(user_id);

        await db.query(
            `
            UPDATE orders
            SET active_order=false, total=$2
            WHERE id = $1
            RETURNING *;
        `,
            [id, total]
        );

        let activeOrder = await findActiveOrder(user_id);

        return activeOrder;
    } catch (err) {
        throw err;
    }
};

const addProductToActiveOrder = async ({ user_id, product_id }) => {
    try {
        let activeOrder = await findActiveOrder(user_id);

        await db.query(
            `
            INSERT INTO order_product(order_id, product_id)
            VALUES($1, $2)
            RETURNING *
        `,
            [activeOrder.id, product_id]
        );

        activeOrder = await findActiveOrder(user_id);

        return activeOrder;
    } catch (err) {
        throw err;
    }
};

const removeProductFromActiveOrder = async ({ user_id, product_id, removeAll }) => {
    try {
        let activeOrder = await findActiveOrder(user_id);

        const removeAllQuery = "DELETE FROM order_product WHERE order_id = $1 AND product_id = $2 RETURNING *";

        const removeOneQuery = `
            DELETE FROM order_product WHERE id IN (
                SELECT id FROM order_product 
                WHERE order_id = $1 AND product_id = $2
                LIMIT 1
            ) RETURNING *
        `;

        await db.query(removeAll ? removeAllQuery : removeOneQuery, [activeOrder.id, product_id]);

        activeOrder = await findActiveOrder(user_id);

        return activeOrder;
    } catch (err) {
        next(err);
    }
};

// // function added
// const calculateTotal = (order) => {
//     // Use reduce to sum up the prices of all products in the order
//     const total = order.products.reduce((acc, product) => acc + product.price, 0);
    
//     // not sure how to round the total to 2 decimal places
//     return Math.round(total * 100) / 100;
// };



module.exports = {
    createOrder,
    findActiveOrder,
    checkoutOrder,
    addProductToActiveOrder,
    removeProductFromActiveOrder,
    calculateTotal,
};
