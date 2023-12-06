const express = require("express");

const requireUser = (req, res, next) => {
    if (!req.user) {
        res.status(401);
        next({
            name: "MissingUserError",
            message: "You must be logged in to perform this action",
        });
    } else {
        next();
    }
};

const requireAdmin = (req, res, next) => {
    console.log(req.user);
    if (!req.user) {
        res.status(401);
        next({
            name: "MissingUserError",
            message: "You must be logged in as Admin to access this resource",
        });
    } else if (!req.user.admin) {
        res.status(403);
        next({
            name: "MissingAdminError",
            message: "You do not have permission to access this resource",
        });
    } else {
        next();
    }
};

module.exports = {
    requireUser,
    requireAdmin,
};
