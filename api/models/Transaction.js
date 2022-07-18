const { model, Schema } = require('mongoose')

module.exports = model(
	'Transaction',
	new Schema({
		userId: {
			type: String,
			required: true,
		},
		transactionType: {
			type: Number,
			required: true,
		},
		secondParty: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	})
)
