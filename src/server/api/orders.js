const express = require("express");
const ordersRouter = express.Router();

const { requireUser } = require("./utils");
const {
    findActiveOrder,
    checkoutOrder,
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

// add product to the cart or add quantity to product
ordersRouter.post("/cart/product/:product_id", requireUser, async (req, res, next) => {
    try {
        const updatedCart = await addProductToActiveOrder({ product_id: req.params.product_id, user_id: req.user.id });
        res.send(updatedCart);
    } catch (err) {
        next(err);
    }
});

// remove one product with the quantity button
ordersRouter.delete("/cart/product/:product_id", requireUser, async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const { product_id } = req.params;
       
        const productToBeUpdated = await getProductById(product_id);

        if (!productToBeUpdated) {
            next({
                name: "NotFound",
                message: `No product by ID ${product_id}`,
            });
        } else {
            
            const deletedProduct = await removeProductFromActiveOrder({user_id, product_id});
           
            res.send({ ...deletedProduct });
        }
    } catch (err) {
        next(err);
    }
});

// remove the product completely from the cart with delete button or X
ordersRouter.delete("/cart/product/:product_id/removeAll", requireUser, async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const { product_id } = req.params;
       
        const productToBeUpdated = await getProductById(product_id);

        if (!productToBeUpdated) {
            next({
                name: "NotFound",
                message: `No product by ID ${product_id}`,
            });
        } else {
            
            const deletedProduct = await removeProductFromActiveOrder({user_id, product_id, removeAll:true});
           
            res.send({ ...deletedProduct });
        }
    } catch (err) {
        next(err);
    }
});

// to checkout an active order
ordersRouter.patch("/cart", requireUser, async(req, res, next) => {
    try {
       
    const activeOrder = await checkoutOrder({user_id:req.user.id})

    res.send(activeOrder)
        
    } catch (err) {
        next(err)
    }
})



module.exports = ordersRouter;
