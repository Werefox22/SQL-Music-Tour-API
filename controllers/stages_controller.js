const stages = require('express').Router()
const db = require('../models')
const { Stage } = db

const { Op } = require('sequelize')

// GET all stages
stages.get('/', async (req, res) => {
	try {
		let foundStages = await Stage.findAll({
			where: {
				stage_name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
			}
		})
		res.status(200).json(foundStages)
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET one stage
stages.get('/:name', async (req, res) => {
	try {
		let foundStage = await Stage.findOne({
			where: { stage_name: req.params.name }
		})
		res.status(200).json(foundStage)
	} catch (error) {
		res.status(500).json(error)
	}
})

// POST a stage
stages.post('/', async (req, res) => {
	try {
		let newStage = await Stage.create(req.body)
		res.status(200).json({
			message: 'Successfully created new stage',
			data: newStage
		})
	} catch (error) {
		res.status(500).json(error)
	}
})

// UPDATE a stage
stages.put('/:id', async (req, res) => {
	try {
		let updatedStage = await Stage.update(req.body, {
			where: { stage_id: req.params.id }
		})
		res.status(200).json({
			message: 'Successfully updated stage'
		})
	} catch (error) {
		res.status(500).json(error)
	}
})

// DELETE a stage
stages.delete('/:id', async (req, res) => {
	try {
		let deletedStages = await Stage.destroy({
			where: { stage_id: req.params.id }
		})
		res.status(200).json({
			message: `Successfully deleted ${deletedStages} stage${deletedStages === 1 ? '' : 's'}`
		})
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = stages