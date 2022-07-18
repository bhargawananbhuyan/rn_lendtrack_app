const Transaction = require('../models/Transaction')

const addTransactionController = async (req, res) => {
	const { transactionType, secondParty, amount, dateOfSettlement } = req.body
	console.log(req.body)

	const newTransaction = new Transaction({
		userId: req.user._id,
		transactionType,
		secondParty,
		amount,
		dateOfSettlement
	})

	try {
		const savedTransaction = await newTransaction.save()
		return res.status(201).json({ data: savedTransaction })
	} catch (error) {
		res.json({ error })
	}
}

const getOneTransactionController = async (req, res) => {
	try {
		const transaction = await Transaction.findOne({ _id: req.params.id })
		return res.status(200).json({ data: transaction })
	} catch (error) {
		res.json({ error })
	}
}

const getAllTransactionController = async (req, res) => {
	try {
		const allTransactions = await Transaction.find({ userId: req.user._id }).sort({
			createdAt: -1,
		})
		return res.status(200).json({ data: allTransactions })
	} catch (error) {
		res.json({ error })
	}
}

const updateTransactionController = async (req, res) => {
	try {
		const updatedTransaction = await Transaction.findOneAndUpdate(
			{ _id: req.params.id },
			req.body,
			{ new: true }
		)
		return res.status(200).json({ data: updatedTransaction })
	} catch (error) {
		res.json({ error })
	}
}

const deleteTransactionController = async (req, res) => {
	try {
		const transactionToDelete = await Transaction.findOneAndDelete({ _id: req.params.id })
		return res.status(200).json({ data: transactionToDelete })
	} catch (error) {
		res.json({ error })
	}
}

module.exports = {
	addTransactionController,
	getOneTransactionController,
	getAllTransactionController,
	updateTransactionController,
	deleteTransactionController,
}
