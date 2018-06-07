var router = require('express').Router();

var pokemon = require('./../models/pokemon.js')

router.get('/', (req, res) => {
    // populate permet de répérer tout les pokemons plus leurs types associés
    pokemon.find({}).populate('types')
    .then(pokemons => {
        console.log(__dirname)
        res.render('../view/pokemons/index.html', {pokemons: pokemons})
    })
})

module.exports = router