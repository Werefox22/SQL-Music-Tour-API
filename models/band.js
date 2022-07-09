const { Sequelize, DataTypes, Model } = require('sequelize')

class Band extends Model{}

Band.init({
	band_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	genre: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	available_start_time: {
		type: DataTypes.DATE,
		allowNull: false
	},
	end_time: {
		type: DataTypes.DATE,
		allowNull: false
	}
}, {
	sequelize,
	modelName: 'Band',
	tableName: 'band',
	timestamps: false
})

module.exports = Band