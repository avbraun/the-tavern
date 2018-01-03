const router = require('express').Router()
const { Character } = require('../db/models')
module.exports = router

// Retrieve all characters
router.get('/all', (req, res, next) => {
  Character.findAll({
    include: [{ all: true }]
  })
    .then(users => res.json(users))
    .catch(next)
})

// Create new character
router.post('/new', (req, res, next) => {
  Character.create(req.body)
    .then(newCharacter => {
      console.log('newCharacter: ', newCharacter);
      res.json(newCharacter)
    })
    .catch(next)
})

// Update character
router.put('/update', (req, res, next) => {
  let characterId = Number(req.body.id)
  Character.findOne({
    where: { id: characterId }
  })
    .then(foundCharacter =>
      foundCharacter.update({
        id: characterId,
        userId: Number(req.body.userId),
        campaignId: Number(req.body.campaignId)
      })
    )
    .then(updatedCharacter => {
      console.log('api updated char: ', updatedCharacter)
      res.json(updatedCharacter);
    })
    .catch(next)
})
