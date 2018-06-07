var router = require('express').Router();

var pokemon = require('./../models/pokemon')

router.get('/', (req, res) => {
    // populate permet de répérer tout les pokemons plus leurs types associés
    pokemon.find({}).populate('types')
    .then(pokemons => {
        res.render('pokemons/index.html', {pokemons: pokemons})
    })
})

module.exports = router