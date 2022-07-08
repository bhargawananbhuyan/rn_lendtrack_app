require('dotenv').config()
const express = require('express')
const { connect } = require('mongoose')

const startApp = async () => {
	const app = express()
	const port = process.env.PORT || 5000

	// database connection
	await connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => console.log('connected to database.'))
		.catch((e) => console.log(e.message))

	// middlewares
	app.use(express.json())
	app.use(require('cors')({ origin: '*' }))

	// routes
	app.use('/api/auth', require('./routes').authRoutes)

	await new Promise((resolve) => app.listen(port, resolve))
	console.log(`listening to app on port ${port}...`)
}

startApp()
