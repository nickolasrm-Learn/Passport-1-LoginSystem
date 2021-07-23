const {genSalt, hashSync} = require('bcrypt'),
	User = require('../models//user')
const SALT_ROUNDS = 10

module.exports = {
	/**
	 * Stores a new user into the users table
	 * @param {String[255]} username 
	 * @param {String[255]} email 
	 * @param {String} password 
	 * @returns {User}
	 */
	store: async (username, email, password) => {
		const salt = genSalt()
		const encrypted = hashSync(password, SALT_ROUNDS)
		return await User.create({username, email, password: encrypted})
	},

	/**
	 * Gets a user from the user table by its email
	 * @param {String[255]} email 
	 * @returns {User} or null
	 */
	show: async (email) => {
		return await User.findOne({where: {email}})
	},

	/**
	 * Gets a user from the user table by its id
	 * @param {Int} id 
	 * @returns {User} or null
	 */
	show_by_id: async (id) => {
		return await User.findOne({where: {id}})
	}
}