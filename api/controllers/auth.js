const { genSalt, hash, compare } = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const registerUserController = async (req, res) => {
	const { fullName, email, password } = req.body

	const existingUser = await User.findOne({ email })
	if (existingUser) return res.status(400).json({ error: 'user already registered' })

	const newUser = new User({
		fullName,
		email,
		password: await hash(password, await genSalt(10)),
	})

	try {
		const savedUser = await newUser.save()
		res.status(201).json({ data: savedUser })
	} catch (error) {
		res.json({ error })
	}
}

const loginUserController = async (req, res) => {
	const { email, password } = req.body

	try {
		const existingUser = await User.findOne({ email })
		if (!existingUser) return res.status(400).json({ error: "user doesn't exist" })

		const passwordMatched = await compare(password, existingUser.password)
		if (!passwordMatched) return res.status(400).json({ error: 'invalid password' })

		const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET, {
			expiresIn: '1d',
		})
		res.status(200).json({ data: token })
	} catch (error) {
		res.status(500).json({ error: 'server error' })
	}
}

const getUserController = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user._id })
		return res.status(200).json({ data: user })
	} catch (error) {
		res.json({ error })
	}
}

module.exports = { registerUserController, loginUserController, getUserController }
