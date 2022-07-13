'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Band extends Model {
		static associate({ Meet_Greet }) {
			Band.hasMany(Meet_Greet, {
				foreignKey: "band_id",
				as: "meet_greets"
			})
		}
	}
	Band.init({
		band_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
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
		tableName: 'bands',
		timestamps: false
	});
	return Band;
};