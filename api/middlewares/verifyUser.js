const { verify } = require('jsonwebtoken')

const verifyUser = (req, _, next) => {
	const token = req.headers['auth_token']
	if (!token) throw new Error('no token')
	verify(token?.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
		if (err) throw new Error('invalid token')
		req.user = user
		next()
	})
}

module.exports = verifyUser
