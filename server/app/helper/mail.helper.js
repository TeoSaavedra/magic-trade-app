var nodemailer = require("nodemailer")
const config = require("../config/mail.config.js")

exports.sendVerificationEmail = (email, code) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: config
    })

    var message = {
        from: config.user,
        to: email,
        subject: "Test",
        text: "Test Text " + code,
        html: "<p>HTML version of the message</p>"
      };
}

