// DEPENDENCIES
const express = require('express')
const app = express()
const { Sequelize } = require('sequelize')

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const db = require('./models')
db.sequelize.sync({ force: true })

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

// Use controllers
const bandsController = require('./controllers/bands_controller.js')
app.use('/bands', bandsController)
const eventsController = require('./controllers/events_controller.js')
app.use('/events', eventsController)
const stagesController = require('./controllers/stages_controller.js')
const { sequelize } = require('./models/index.js')
app.use('/stages', stagesController)

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})