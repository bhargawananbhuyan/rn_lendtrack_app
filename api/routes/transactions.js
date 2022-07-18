const router = require('express').Router()
const {
	addTransactionController,
	getAllTransactionController,
	getOneTransactionController,
	updateTransactionController,
	deleteTransactionController,
} = require('../controllers/transactions')
const verifyUser = require('../middlewares/verifyUser')

router.get('/', verifyUser, getAllTransactionController)

router.get('/:id', verifyUser, getOneTransactionController)

router.post('/', verifyUser, addTransactionController)

router.put('/:id', verifyUser, updateTransactionController)

router.delete('/:id', verifyUser, deleteTransactionController)

module.exports = router
