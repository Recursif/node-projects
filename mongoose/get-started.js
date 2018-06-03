var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));



/*
With Mongoose, everything is derived from a Schema.
Let's get a reference to it and define our kittens.
*/

db.once('open', function() {
  var kittySchema = mongoose.Schema({
    name: String
  })

  // Compiling Schema into a Model
  var Kitten = mongoose.model('Kitten', kittySchema);

  // A model is a class with which we construct documents.
  var silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'

  // NOTE: methods must be added to the schema before compiling it with mongoose.model()
  kittySchema.methods.speak = function () {
    var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  }
  var Kitten = mongoose.model('Kitten', kittySchema);

  var fluffy = new Kitten({ name: 'fluffy' });
  fluffy.speak(); // "Meow name is fluffy"


  // Save to MongoDB
  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
  });

  // Access all the kitten
  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  })

  // Find all the kitten that name begin with by fluff
  Kitten.find({ name: /^fluff/ }, callback);
})
