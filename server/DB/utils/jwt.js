const jwt = require('jsonwebtoken');


const createToken = (userId, permission) => {
    const token = jwt.sign({ _id: userId, permission }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
    return token;
}

const checkToken = (token) => jwt.verify(token, process.env.TOKEN_SECRET)

module.exports = { createToken, checkToken };