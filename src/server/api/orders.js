const express = require('express');
const ordersRouter = express.Router();

const { requireUser } = require("./utils");
const { createOrder, findActiveOrder, updateOrder, addProductToActiveOrder, removeProductFromActiveOrder } = require("../db");

// Get Cart
ordersRouter.get("/cart", requireUser, async (req, res, next) => {
    try {
        const cart = await findActiveOrder();
        if (cart) {
            res.send(cart);
        } else {
            // Assuming createOrder is an asynchronous function, await its completion
            const newCart = await createOrder();
            
            // Send the newly created cart in the response
            res.send(newCart);
        }

    } catch (err) {
        next(err);
    }
});

// Create Order (POST)
ordersRouter.post("/cart", requireUser, async (req, res, next) => {
    try {
        const newCart = await createOrder(req.body);
        res.status(201).send(newCart);
    } catch (err) {
        next(err);
    }
});

// Update Order (PATCH)
ordersRouter.patch("/cart", requireUser, async (req, res, next) => {
    try {
        const updatedOrder = await updateOrder(req.body);
        res.send(updatedOrder);
    } catch (err) {
        next(err);
    }
});

// Add Product to Active Order (POST)
ordersRouter.post("/cart/products", requireUser, async (req, res, next) => {
    try {
        const orderProduct = await addProductToActiveOrder(req.body);
        res.status(201).send(orderProduct);
    } catch (err) {
        next(err);
    }
});

// Remove Product from Active Order (DELETE)
ordersRouter.delete("/cart/products", requireUser, async (req, res, next) => {
    try {
        const orderProduct = await removeProductFromActiveOrder(req.body);
        res.send(orderProduct);
    } catch (err) {
        next(err);
    }
});

module.exports = ordersRouter;