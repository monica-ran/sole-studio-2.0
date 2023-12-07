
const express = require('express');
const ordersRouter = express.Router()

const { requireUser } = require("./utils")
const { createOrder, findActiveOrder, updateOrder, addProductToActiveOrder, removeProductFromActiveOrder} = require("../db")
 

ordersRouter.get("/cart", requireUser, async (req, res, next) => {
    try {
       const cart = await findActiveOrder();
       if (cart) {
        res.send(cart)
       } else {
        createOrder()
       }

    }catch (err) {
        next (err)
    }
})





module.exports = ordersRouter;