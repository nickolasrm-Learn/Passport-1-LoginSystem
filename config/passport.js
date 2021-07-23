const passport = require('passport')
const JWTStrategy = require('passport-jwt').Strategy

const users = require('../controllers/users')

// Should be in an env
const SECRET = 'MySuperSecretKey'

passport.use(new JWTStrategy({
	jwtFromRequest: (req) => {
		if(req.cookies)
			return req.cookies['jwt']
		else
			return null
	},
	secretOrKey: SECRET
}, async (payload, next) => {
	const user = users.show_by_id(payload.id)
	if(user)
		next(null, user)
	else
		next(StatusCodes.NOT_FOUND, false)
}))

module.exports = passport
module.exports.SECRET = SECRET