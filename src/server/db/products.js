const db = require("./client");

const createProduct = async ({ name, description, price, image_url }) => {
    try {
        const {
            rows: [products],
        } = await db.query(
            `
        INSERT INTO products(name, description, price, image_url)
        VALUES($1, $2, $3, $4)
        RETURNING *`,
            [name, description, price, image_url]
        );

        return products;
    } catch (err) {
        throw err;
    }
};

const getAllProducts = async () => {
    try {
        const { rows } = await db.query(`
        SELECT * FROM products
        `);
console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};

const getProductById = async (productId) => {
    try {
        const {
            rows: [product],
        } = await db.query(
            `
        SELECT * FROM products WHERE id = $1
        `,
            [productId]
        );

        return product;
    } catch (error) {
        throw error;
    }
};

const updateProduct = async ({ id, name, description, price, image_url }) => {
    try {
        const {
            rows: [product],
        } = await db.query(
            `
        UPDATE products 
        SET name=$1, description=$2, price=$3, image_url=$4
        WHERE id = $5
        RETURNING *;
        `,
            [name, description, price, image_url, id]
        );

        return product;
    } catch (error) {
        throw error;
    }
};

const deleteProduct = async (productId) => {
    try {
        await db.query(
            `
        DELETE FROM products WHERE id = $1
        `,
            [productId]
        );

        return;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
