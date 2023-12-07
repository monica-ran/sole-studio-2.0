
const express = require('express');
const ordersRouter = express.Router()

const { requireUser } = require("./utils")
const { createOrder, findActiveOrder, updateOrder, addProductToActiveOrder, removeProductFromActiveOrder} = require("../db")
 

ordersRouter.post("/:orderId/products/:productsId", addProductToOrder)

const addProductToActiveOrder = (req, res, next) => {

}

















