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
      res.json(newCharacter)
    })
    .catch(next)
})

router.put('/update', (req, res, next) => {
  let characterId = Number(req.body.id)
  Character.findOne({
    where: { id: characterId }
  })
    .then(foundCharacter =>
      foundCharacter.update(req.body)
    )
    .then(updatedCharacter => {
      res.json(updatedCharacter);
    })
    .catch(next)
})

router.delete('/:characterId/delete', (req, res, next) => {
  let characterId = Number(req.params.characterId)
  Character.destroy({
    where: { id: characterId}
  })
    .then(() => {
      res.status(204).send()
    })
    .catch(next)
})
