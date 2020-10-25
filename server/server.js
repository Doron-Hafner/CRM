const Sequelize = require('Sequelize');
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const port = 5000
const api = require('./routes/api')

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', api)

app.listen (process.env.PORT || port, () =>
    console.log(`Server is up and running on port: ${port}`))