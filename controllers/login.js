const{StatusCodes, ReasonPhrases} = require('http-status-codes')
const {compareSync} = require('bcrypt')
const jwt = require('jsonwebtoken')

const {validEmail, validPassword} = require('./misc/util')
const users = require('./users')
const passport = require('../config/passport')

module.exports = {
	/**
	 * Logs the user in if the request contains a valid email and password
	 * @param {Request} req 
	 * @param {Response} res 
	 * @returns {Response}
	 */
	login: async (req, res) => {
		const body = req.body
		if (validEmail(body) && validPassword(body))
		{
			const email = body.email,
				password = body.password,
				user = await users.show(email)

			if (user)
			{
				if(compareSync(password, user.password))
				{
					const token = jwt.sign({id: user.id}, passport.SECRET)
					return res.status(StatusCodes.OK)
						.cookie('token', token, 
							{
								httpOnly: true,
								sameSite: true
							})
						.send(ReasonPhrases.OK)
				}
				else
					return res.status(StatusCodes.UNAUTHORIZED)
						.send(ReasonPhrases.UNAUTHORIZED)
			}
			else
				return res.status(StatusCodes.NOT_FOUND)
					.send(ReasonPhrases.NOT_FOUND)
		}
		else
			return res.status(StatusCodes.BAD_REQUEST)
				.send(StatusCodes.BAD_REQUEST)
	},

	/**
	 * Logs the user out if logged in and redirects it to the login page
	 * @param {Request} req 
	 * @param {Response} res 
	 * @returns {Response}
	 * NOT IMPLEMENTED YET
	 */
	logout: async (req, res) => {
		res.clearCookie('token')
	}
}