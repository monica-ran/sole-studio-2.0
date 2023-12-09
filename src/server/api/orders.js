const express = require("express");
const ordersRouter = express.Router();

const { requireUser } = require("./utils");
const {
    createOrder,
    findActiveOrder,
    updateOrder,
    addProductToActiveOrder,
    removeProductFromActiveOrder,
    getProductById,
} = require("../db");

ordersRouter.get("/cart", requireUser, async (req, res, next) => {
    try {
        let cart = await findActiveOrder(req.user.id);

        res.send(cart);
    } catch (err) {
        next(err);
    }
});

ordersRouter.post("/cart/product/:product_id", requireUser, async (req, res, next) => {
    try {
        const updatedCart = await addProductToActiveOrder({ product_id: req.params.product_id, user_id: req.user.id });
        res.send(updatedCart);
    } catch (err) {
        next(err);
    }
});

ordersRouter.delete("/cart/product/:product_id", requireUser, async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const { product_id } = req.params;
       
        const productToBeUpdated = await getProductById(product_id);
        console.log("test")
        if (!productToBeUpdated) {
            next({
                name: "NotFound",
                message: `No product by ID ${product_id}`,
            });
        } else {
            console.log("test2")
            const deletedProduct = await removeProductFromActiveOrder({user_id, product_id});
            console.log(deletedProduct)
            res.send({ ...deletedProduct });
        }
    } catch (err) {
        next(err);
    }
});

ordersRouter.patch("/checkout", requireUser, async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const activeOrder = await findActiveOrder(user_id);

        if (!activeOrder) {
            return res.status(404).send({ error: 'No active order found for the user.' });
        }
        const updatedOrder = await updateOrder({
            order_id: activeOrder.order_id,
            active_order: false, // Assuming marking the order as inactive
            total: calculateTotal(activeOrder), // Replace with your own logic for calculating the total
        });
        res.send({ message: 'Checkout successful', updatedOrder });
    } catch (err) {
        next(err);
    }
});

// Helper function to calculate the total (replace with your own logic)
const calculateTotal = (order) => {
    // Placeholder logic - summing up the product prices for simplicity
    return order.products.reduce((total, product) => total + product.price, 0);
};

module.exports = ordersRouter;
