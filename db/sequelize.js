const Sequelize = require('sequelize')
const config = require('../config/sequelize'),
	User = require('../models/user')

const connection = new Sequelize(config)

User.init(connection)

module.exports = connection