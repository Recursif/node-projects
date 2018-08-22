
// AuthController.js
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config')

const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const User = require('../user/User')


const verifyToken = require('./verifyToken');

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

router.get('/me', verifyToken, (req, res, next) => {

    User.findById(decoded.id, (err, user) => {
        if (err) return res.status(500).send("There was a problem finding the user.")

        if (!user) return res.status(404).send("No user found.")

        res.status(200).send(user)
    })
})

// The default name for a token in the headers of an HTTP request is x-access-token. 

// If the token exists, the jwt.verify() method will be called.


router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send('Error on the server.')
        if (!user) return res.status(404).send('No user found.')

        var passwordIsValid = bcryptcompareSync(req.body.password, user.password)

        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })

        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        })

        res.status(200).send({ auth: true, token: token })
    })
})

// bcrypt compare Sync
// If they match we .sign() a token.

router.get('/logout', (req, res) => {
    res.status(200).send({ auth: false, token: null })
})

// Disclaimer: The logout endpoint is not needed. The act of logging out can solely be done through the client side.

// Do you have permision to be here?

/*
Middleware functions are functions that have access to the request object 
req, the response object res, and the next function in the 
app request response cycle. 

The next function is a function in the express router 
which, when invoked, executes the middleware suceeding the current middleware


Remember, authentication is the act of logging a user in. Authorization is the act of verifying the access rights of a user to interact with a resource.


*/





module.exports = router;






