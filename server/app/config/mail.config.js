module.exports = {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    serviceClient: process.env.EMAIL_USERID,
    privateKey: process.env.EMAIL_PKEY,
}