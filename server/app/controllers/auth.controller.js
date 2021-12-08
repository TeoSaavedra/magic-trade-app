const db = require("../models");
// const config = require("../config/auth.config")
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

exports.verifyEmail = (req, res) => {
    User.findOne({
        where: {
            email: req.query.email
        }
    })
    .then (user => {
        if (user) {
            return res.status(404).send({
                message: "Failed! Email is already in use!"
            });
        }
        res.status(200).send({
            message: "Valid! The email don't exists"
        });
    })
    .catch (err => {
        res.status(500).send({ message: err.message});
    });
};
