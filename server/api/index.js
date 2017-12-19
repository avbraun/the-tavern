const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/campaigns', require('./campaigns'))
router.use('/characters', require('./characters'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
