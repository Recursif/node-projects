var router = require('express').Router();

var pokemon = require('./../models/pokemon')

router.get('/', (req, res) => {
    pokemon.find({}).populate
})

module.exports = router