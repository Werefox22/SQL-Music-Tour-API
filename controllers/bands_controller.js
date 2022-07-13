const bands = require('express').Router()
const db = require('../models')
const { Band, Meet_Greet, Event, Set_Time } = db

const { Op } = require('sequelize')

// GET all bands
bands.get('/', async (req, res) => {
	try {
		let foundBands = await Band.findAll({
			order: [ ['available_start_time', 'ASC']],
			where: {
				name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
			}
		})
		res.status(200).json(foundBands)
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET one band
bands.get('/:name', async (req, res) => {
	try {
		let foundBand = await Band.findOne({
			where: { name: req.params.name },
			include: [
				{ 
					model: Meet_Greet,
					as: "meet_greets",
					include: {
						model: Event,
						as: "event"
					}
				}, 
				{
					model: Set_Time,
					as: "set_times"
				}
			]
		})
		res.status(200).json(foundBand)
	} catch (error) {
		res.status(500).json(error)
	}
})

// POST a band
bands.post('/', async (req, res) => {
	try {
		let newBand = await Band.create(req.body)
		res.status(200).json({
			message: 'Successfully created new band',
			data: newBand
		})
	} catch (error) {
		res.status(500).json(error)
	}
})

// UPDATE a band
bands.put('/:id', async (req, res) => {
	try {
		let updatedBand = await Band.update(req.body, {
			where: { band_id: req.params.id }
		})
		res.status(200).json({
			message: 'Successfully updated band'
		})
	} catch (error) {
		res.status(500).json(error)
	}
})

// DELETE a band
bands.delete('/:id', async (req, res) => {
	try {
		let deletedBands = await Band.destroy({
			where: { band_id: req.params.id }
		})
		res.status(200).json({
			message: `Successfully deleted ${deletedBands} band${deletedBands === 1 ? '' : 's'}`
		})
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = bands