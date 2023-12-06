const express = require('express');
const router = express.Router();

const requireUser = (req, res, next) => {
 if (!req.user) {
    res.status(401);
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action"
    });
 }

 next();
}

const requireAdmin = (req, res, next) => {
 if (!req.user) {
     return res.status(401).json({ error: 'You must be logged in to access this resource' });
 }

 if (!req.user.isAdmin) {
     return res.status(403).json({ error: 'You do not have permission to access this resource' });
 }

 next();
};

module.exports = {
 requireUser,
 requireAdmin,
};