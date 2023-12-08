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



module.exports = ordersRouter;
