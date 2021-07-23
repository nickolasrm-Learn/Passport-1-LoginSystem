const express = require('express')
const {login, logout} = require('../controllers/login')
const passport = require('../config/passport')

const router = express.Router()

router.post('/login', passport.authenticate('jwt', 
	{
		session: false,
		successRedirect: '/',
		failureRedirect: '/login'
	}), login)
router.post('/logout', passport.authenticate('jwt', 
	{
		session: false,
		failureRedirect: '/login',
		successRedirect: '/login'
	}), logout)

module.exports = router