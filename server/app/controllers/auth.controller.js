var bcrypt = require("bcryptjs")

const db = require("../models")
const User = db.user
const Role = db.role

const Op = db.Sequelize.Op

const sendVerificationEmail = require("../helper/mail.helper")

exports.checkEmail = (req, res) => {
    User.findOne({
        where: {
            email: req.query.email
        }
    })
    .then (user => {
        if (user) {
            return res.status(200).send({
                status: "fail",
                message: "Failed! Email is already in use!"
            })
        }
        res.status(200).send({
            status: "success",
            message: "Valid! The email don't exists"
        })
    })
    .catch (err => {
        res.status(500).send({ message: err.message});
    })
}


exports.signup = (req, res) => {
    User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    .then( user => {
        if(req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or] : req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({ message: "El usuario fue registrado exitosamente!" })
                })
            })
        } else {
            user.setRoles([1]).then(() => {
                res.send({ message: "El usuario fue registrado exitosamente!" })
            })
        }
        console.log(user);
        // sendVerificationEmail(req.body.email,bcrypt.encodeBase64(user.id + ))
    })
    .catch(err => {
        res.status(500).send({ message: err.message })
    })
}

