var bcrypt = require("bcryptjs")

const db = require("../models")
const User = db.user
const Role = db.role

const Op = db.Sequelize.Op

const sendVerificationEmail = require("../helper/mail.helper")
const base64 = require("../helper/base64.helper")

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
                    res.send({ message: "El usuario fue registrado exitosamente! Revisa tu e-mail para verificar tu cuenta" })
                })
            })
        } else {
            user.setRoles([1]).then(() => {
                res.send({ message: "El usuario fue registrado exitosamente! Revisa tu e-mail para verificar tu cuenta" })
            })
        
        }
        const code = base64.encode(user)
        sendVerificationEmail(req.body.email, code)
    })
    .catch(err => {
        res.status(500).send({ message: err.message })
    })
}

exports.verifyUser = (req, res) => {
    const code = base64.decode(req.body.hash)
    const id = code.split('@')[0]
    User.findByPk(id)
    .then( user => {
        if (user) {
            if (user.active) {
                return res.status(200).send({
                    status: "fail",
                    message: "El usuario ya fue verificado!"
                })
            }
            user.active = true
            return user.save().then( () => {
                res.status(200).send({
                    status: "success",
                    message: "El usuario fue verificado exitosamente!"
                })
            })
            .catch(err => {
                res.status(500).send({ message: err.message })
            })
        }
        res.status(200).send({
            status: "fail",
            message: "El usuario no fue verificado!"
        })
    })
    .catch(err => {
        res.status(500).send({ message: err.message })
    })
}

