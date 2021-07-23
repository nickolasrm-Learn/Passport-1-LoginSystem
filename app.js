const db = require('./db/sequelize')

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')

const passport = require('./config/passport')

const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')
const indexRouter = require('./routes/index')

const port = 3000

const app = express()

// Using cookie parser in order to read cookies
app.use(cookieParser())

//Added passport
app.use(passport.initialize())

// Make it accept json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Setting a static folder for serving static files
app.use(express.static(path.join(__dirname, 'public')))

// Routers
app.use(indexRouter)
// Added login and register routes
// This routes are used for logging into the system and to register a new user
app.use(loginRouter)
app.use(registerRouter)

module.exports = app.listen(port, () => {
    console.log(`Listening on ${port}`)
})
module.exports.db = db