
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title: String,
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
})

// To add additional keys later, use the Schema#add method.

/*
The permitted SchemaTypes are:

String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
*/
