const events = require('express').Router()
const db = require('../models')
const { Event } = db

const { Op } = require('sequelize')

// GET all events
events.get('/', async (req, res) => {
	try {
		let foundEvents = await Event.findAll({
			order: [ ['date', 'ASC']],
			where: {
				name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
			}
		})
		res.status(200).json(foundEvents)
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET one event
events.get('/:id', async (req, res) => {
	try {
		let foundEvent = await Event.findOne({
			where: { event_id: req.params.id }
		})
		res.status(200).json(foundEvent)
	} catch (error) {
		res.status(500).json(error)
	}
})

// POST an event
events.post('/', async (req, res) => {
	try {
		let newEvent = await Event.create(req.body)
		res.status(200).json({
			message: 'Successfully created new event',
			data: newEvent
		})
	} catch (error) {
		res.status(500).json(error)
	}
})

// UPDATE an event
events.put('/:id', async (req, res) => {
	try {
		let updatedEvents = await Event.update(req.body, {
			where: { event_id: req.params.id }
		})
		res.status(200).json({
			message: `Successfully updated ${updatedEvents} event${updatedEvents === 1 ? '' : 's'}`
		})
	} catch (error) {
		res.status(500).json(error)
	}
})

// DELETE an event
events.delete('/:id', async (req, res) => {
	try {
		let deletedEvents = await Event.destroy({
			where: { event_id: req.params.id }
		})
		res.status(200).json({
			message: `Successfully deleted ${deletedEvents} event${deletedEvents === 1 ? '' : 's'}`
		})
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = events