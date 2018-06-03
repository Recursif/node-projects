const express = require('express');
const app = express();
const stylus = require('stylus');
const path = require('path')

app.use(stylus.middleware(process.argv[3]))
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.argv[2])

