const path = require('path')
const router = require('express').Router()

const Pokemon = require('./../models/Pokemon')
const Type = require('./../models/Type')


router.get('/', (req, res) => {
    // populate permet de répérer tout les pokemons plus leurs types associés
    Pokemon.find({}).populate('type')
    .then(pokemons => {
        res.render(path.join(__dirname, '../views/pokemons/index.html'), { pokemons: pokemons })
    })
})

// endpoint est l'url du formulaire à appeler
router.get('/new', (req, res) => {
    Type.find({}).then(types => {
        var pokemon = new Pokemon()
        res.render('pokemons/edit.html', { pokemon: pokemon, types: types, endpoint: '/' })
    })
})

router.get('/edit/:id', (req, res) => {
    Type.find({}).then(types => {
        Pokemon.findById(req.params.id).then(pokemon => {
            res.render('pokemons/edit.html', { pokemon: pokemon, types: types, endpoint: '/' + pokemon._id.toString() })
        })
    })
})

router.get('/:id', (req, res) => {
    Pokemon.findById(req.params.id).populate('types').then(pokemon => {
        res.render('pokemons/show.html', { pokemon: pokemon })
    },
    err => res.status(500).send(err))
})

router.post('/:id?', (req, res) => {
    new Promise((resolve, reject) => {
        if (req.params.id) {
            /* Cherche le pokemon correspondant à l'id envoyer en paramètre
            puis soit ça trouve et resolve avec le pokemon stocker en db
            soit il ne trouve pas et reject la promise */
            Pokemon.findById(req.params.id).then(resolve, reject)
        } else {
            // Si aucun id est envoyé on va juste créer un nouveau pokemon
            resolve(new Pokemon())
        }
    }).then(pokemon => {
        pokemon.name = req.body.name
        pokemon.description = req.body.description
        pokemon.number = req.body.number
        pokemon.types = req.body.types 

        if (req.file) pokemon.picture = req.file.filename

        return pokemon.save()
    }).then(() => {
        res.redirect('/')
    }).catch(err => {console.log(err)})
})



module.exports = router

/* 
Object qui va représenter un opération qui est asynchrone et
qui donc à un résultat qui peut venir à n'importe quelle moment
*/