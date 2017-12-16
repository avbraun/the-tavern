const router = require('express').Router()
const {Campaign} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Campaign.findAll()
    .then(campaigns => res.json(campaigns))
    .catch(next)
})

router.get('/:campaignId', (req, res, next) => {
  Campaign.findOne({
    where: {
      id: req.params.campaignId
    }
  })
    .then(campaign => res.json(campaign))
    .catch(next)
})
