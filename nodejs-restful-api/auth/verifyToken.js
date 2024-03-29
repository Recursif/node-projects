
const jwt = require('jsonwebtoken')
const config = require('../config')

function verifyToken(req, res, next) {
    var token = res.headers['x-access-token']

    if (!token) return res.status(403).send({ auth: false, message: 'Not token provided.' })

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err)
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
        // if everything good, save to request for use in other routes
        req.userId = decoded.id
        next()
    })

}


module.exports = verifyToken