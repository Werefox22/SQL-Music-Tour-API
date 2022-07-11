const bands = require('express').Router()
const db = require('../models')
const { Band } = db

bands.get('/', async (req, res) => {
	try {
		let foundBands = await Band.findAll()
		res.status(200).json(foundBands)
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = bands