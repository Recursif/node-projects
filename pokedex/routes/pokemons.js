const path = require('path')
const router = require('express').Router()

const pokemon = require('./../models/pokemon.js')

router.get('/', (req, res) => {
    // populate permet de répérer tout les pokemons plus leurs types associés
    pokemon.find({}).populate('types')
    .then(pokemons => {
        res.render(path.join(__dirname, '../views/pokemons/index.html'), {pokemons: pokemons})
    })
})

router.get('/:id', (req, res) => {
    pokemon.findById(res.params.id).populate('types').then(pokemon => {
        res.render('pokemons/show.html', {pokemon: pokemon})
    },
    err => res.status(500).send(err))
})

module.exports = router