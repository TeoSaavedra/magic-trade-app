const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = (email, code) => {
    const msg = {
        to: email, // Change to your recipient
        from: process.env.EMAIL_USER, // Change to your verified sender
        subject: 'Verifica tu email -- MTG Gems',
        text: "Hola! Porfavor verifica tu e-mail ingresando al siguiente link: " + process.env.CLIENT_ORIGIN + "/verify/" +  code + " Muchas Gracias!",
        html: "Hola, Bienvenido a <strong>MTG Gems</strong>!<br><br>Porfavor verifica tu e-mail ingresando al siguiente link:<br><br>" + process.env.CLIENT_ORIGIN + "/verify/" +  code + "<br><br>Muchas Gracias!",
    }
    sgMail.send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
            console.error(error.response.body)
        })
}