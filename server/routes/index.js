const Router = require('express')
const router = new Router()
const orderRouter = require('./orderRouter.js')
const userRouter = require('./userRouter.js')

router.use('/user', userRouter)
router.use('/order', orderRouter)

module.exports = router