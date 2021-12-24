/*
 Import from libraries 
*/
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

// Module require
const {
    mongodbConnectionString,
    mongodbOptions,
    port,
    levelEnv
} = require('./config/index');
const router = require('./routes/index.js')
const {
    migrateDatabase
} = require('./helper/migrate.database')
const {
    sendOtp
} = require('./helper/mail')

// Connect Database
mongoose.connect(mongodbConnectionString, mongodbOptions, error => {
    if (error) {
        console.log("Mongo not connected");
    } else {
        console.log("Mongo connected");
    }
});

// Setup server options
const app = express()
app.use(express.json());
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}))

// Register route table
app.use('/', router);


(async () => {
    if (levelEnv.toUpperCase() === 'PRODUCTION') {
        /*
         Do some thing here such as Migration database , cronjob 
        */
        console.log('This is PRODUCTION MODE');
    }
    await migrateDatabase()
    app.listen(port, () => {
        console.log(`Server Start on: ${port}`)
    })
})()