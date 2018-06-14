
const mongoose = require('mongoose')

var typeSchema = new mongoose.Schema({
    name: String,
    color: {
        type: String,
        default: "red"
    }
})


typeSchema.virtual("pokemons", {
    ref: "Pokemon",
    localField: "_id",
    foreignField: "types"
})

var Type = mongoose.model("Type", typeSchema)


module.exports = Type


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
