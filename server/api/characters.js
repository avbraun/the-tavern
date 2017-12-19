const router = require('express').Router()
const {User, Campaign, Character } = require('../db/models')
module.exports = router

// Retrieve all characters
router.get('/all', (req, res, next) => {
  Character.findAll({
    include: [{ all: true }]
  })
    .then(users => res.json(users))
    .catch(next)
})

router.post('/new', (req, res, next) => {
  Character.create(req.body)
    .then(newCharacter =>
      res.json(newCharacter))
    .catch(next)
})
