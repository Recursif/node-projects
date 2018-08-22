
// AuthController.js
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config')

const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const User = require('../user/User')


router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())



router.post('/register', (req, res) => {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8)

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    }, (err, user) => {
        if (err) return res.status(500).send("There was a problem registering the user.")
        // create a token 

        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        })

        res.status(200).send({ auth: true, token: token })
    })

})

/*
The jwt.sign() method takes a payload and the secret key defined in config.js as parameters.

It creates a unique string of characters representing the payload. In our case, the payload is an object containing only the id of the user.
*/

router.get('/me', (req, res) => {
    var token = req.headers['x-access-token']

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' })

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })

        User.findById(decoded.id, (err, user) => {
            if (err) return res.status(500).send("There was a problem finding the user.")

            if (!user) return res.status(404).send("No user found.")

            res.status(200).send(user)
        })
    })
})

// The default name for a token in the headers of an HTTP request is x-access-token. 

// If the token exists, the jwt.verify() method will be called.


router.post('/login', (req, res) => {
    
})



module.exports = router;






