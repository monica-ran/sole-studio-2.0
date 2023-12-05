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

module.exports = {
    createProduct,
};
