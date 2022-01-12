var Buffer = require('buffer').Buffer;

exports.encode = (user) => {
    return Buffer.from(user.get('id') + "@" + user.get('createdAt')).toString('base64')
}

exports.decode = (code) => {
    return Buffer.from(code,'base64').toString('ascii')
}
