const router = require('express').Router()
const {
	registerUserController,
	loginUserController,
	getUserController,
} = require('../controllers/auth')
const verifyUser = require('../middlewares/verifyUser')

router.post('/register', registerUserController)
router.post('/login', loginUserController)
router.get('/user', verifyUser, getUserController)

module.exports = router
