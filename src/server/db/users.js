const db = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const createUser = async ({ first_name = "first", last_name = "last", email, password }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const {
            rows: [user],
        } = await db.query(
            `
        INSERT INTO users(first_name, last_name, email, password)
        VALUES($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`,
            [first_name, last_name, email, hashedPassword]
        );

        return user;
    } catch (err) {
        throw err;
    }
};

const getUser = async ({ email, password }) => {
    if (!email || !password) {
        return;
    }
    try {
        const user = await getUserByEmail(email);
        if (!user) return;
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if (!passwordsMatch) return;
        delete user.password;
        return user;
    } catch (err) {
        throw err;
    }
};

const getAllUsers = async () => {
    try {
        const { rows } = await db.query(`
        SELECT id, first_name, last_name, email FROM users;
         `)

         return rows;
    } catch (error) {
        throw error
    }
}

async function getUserById(id) {
    // first get the user
    try {
        const {
            rows: [user],
        } = await client.query(
            `
        SELECT *
        FROM users
        WHERE id = $1;
      `,
            [id]
        );
        // if it doesn't exist, return null
        if (!user) return null;
        // if it does:
        // delete the 'password' key from the returned object
        // delete user.password;
        return user;
    } catch (error) {
        throw error;
    }
}

const getUserByEmail = async (email) => {
    try {
        const {
            rows: [user],
        } = await db.query(
            `
        SELECT * 
        FROM users
        WHERE email=$1;`,
            [email]
        );

        if (!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    getUserByEmail,
    getUserById,
};
