const express = require("express");
const productsRouter = express.Router();

const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../db");

const { requireAdmin } = require("./utils")

productsRouter.get("/", async (req, res, next) => {
    try {
        console.log("testing")
        const products = await getAllProducts();
console.log("testing2")
        res.send(products);
    } catch (error) {
        next(error);
    }
});

productsRouter.get("/:productId", async (req, res, next) => {
    try {
        const product = await getProductById(req.params.productId);
        res.send(product);
    } catch (error) {
        next(error);
    }
});

productsRouter.post("/", requireAdmin, async (req, res, next) => {
    try {
        const product = await createProduct(req.body);
        res.send(product);
    } catch (error) {
        next(error);
    }
});

productsRouter.patch("/:productId", requireAdmin, async (req, res, next) => {
    try {
        let product = await getProductById(req.params.productId);
        if (!product) throw `No product with ID ${productId} was found.`;
        product = { ...product, ...req.body };
        const updatedProduct = await updateProduct(product);
        res.send(updatedProduct);
    } catch (error) {
        next(error);
    }
});

productsRouter.delete("/:productId", requireAdmin, async (req, res, next) => {
    try {
        await deleteProduct(req.params.productId);
        res.send();
    } catch (error) {
        next(error);
    }
});

module.exports = productsRouter;
