
const mongoose = require('mongoose')

var typeSchema = new mongoose.Schema({
    name: String,
    color: {
        type: String,
        default: 'red'
    }
})


typeSchema.virtual('pokemons', {
    ref: 'pokemon',
    localField: '_id',
    foreignField: 'types'
})

var type = mongoose.model('type', typeSchema)


module.exports = type


/*
Defini un virtual pokemon qui est une ref
création d'une relation many to many entre
les pokemons et les types 
un type peut avoir plusieurs pokemon et vice versa

ce la nous permet de faire type.pokemon pour récuper la
liste des pokemon de ce type

type.pokemons recupère tout les pokemon dont le champ type 
contient l'id du type en question
 */
