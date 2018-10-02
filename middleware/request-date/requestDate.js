var express = require('express')
var app = express()

var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.get('/', function (req, res) {
  var responseText = 'Hello World!\n'
  responseText += 'Requested at: ' + req.requestTime + ''
  res.send(responseText)
})

app.listen(3000, () => {
  console.log("serveur lancé sur le port 3000")
})