/**
 * Verifies if a request body has a valid email field
 * @param {Request Body} body 
 * @returns {Boolean}
 */
function validEmail(body)
{
	const email = body.email
	if (email && typeof email == 'string')
	{
		const split = email.split('@')
		if (split.length == 2 && split[0].length > 0
			&& split[1].length > 0) 
			return true
	}
	return false
}

/**
 * Verifies if a request body has a valid password field
 * @param {Request Body} body 
 * @returns {Boolean}
 */
function validPassword(body)
{
	const password = body.password
	if (password && typeof password == 'string'
		&& password.length >= 8) return true
	else return false
}

/**
 * Verifies if a request body has a valid username field
 * @param {Request Body} body 
 * @returns {Boolean}
 */
function validUsername(body)
{
	const username = body.username
	if (username && typeof username == 'string'
		&& username.length >= 3) return true
	else return false
}

module.exports = {
	validEmail,
	validPassword,
	validUsername
}