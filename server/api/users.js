const router = require('express').Router()
const {User, Campaign} = require('../db/models')
module.exports = router

// Retrieve current user
router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

// Retrieve all users
router.get('/all', (req, res, next) => {
  User.findAll({
    include: [{ all: true }]
  })
    .then(users => res.json(users))
    .catch(next)
})
