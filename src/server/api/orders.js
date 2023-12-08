const express = require("express");
const ordersRouter = express.Router();

const { requireUser } = require("./utils");
const { createOrder, findActiveOrder, updateOrder, addProductToActiveOrder, removeProductFromActiveOrder } = require("../db");

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
        await removeProductFromActiveOrder(req.params.productId);
        res.send();
    } catch (error) {
        next(error);
    }
});

module.exports = ordersRouter;
