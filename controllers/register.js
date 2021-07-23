const {StatusCodes, ReasonPhrases} = require('http-status-codes')
const users = require('./users'),
	{validEmail, validUsername, validPassword} = require('./misc/util')

module.exports = {
	/**
	 * Registers a new user if it doesn't conflict with another
	 * @param {Request} req 
	 * @param {Response} res 
	 * @returns {Response}
	 */
	register: async (req, res) => {
		const body = req.body
		if (validEmail(body) && validPassword(body) && validUsername(body))
		{
			const email = body.email
			if (await users.show(email) == null)
			{
				users.store(body.username, body.email, body.password)
				return res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED)
			}
			else
				return res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT)
		}
		else
			return res.status(StatusCodes.BAD_REQUEST)
				.send(ReasonPhrases.BAD_REQUEST)
	}
}