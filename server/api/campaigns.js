const router = require('express').Router()
const {Campaign} = require('../db/models')
module.exports = router

router.get('/all', (req, res, next) => {
  Campaign.findAll({
    include: [{ all: true }]
  })
    .then(campaigns => res.json(campaigns))
    .catch(next)
})

router.get('/:campaignId', (req, res, next) => {
  Campaign.findOne({
    where: {
      id: req.params.campaignId
    },
    include: [{ all: true }]
  })
    .then(campaign => res.json(campaign))
    .catch(next)
})

router.post('/new', (req, res, next) => {
  Campaign.create(req.body)
    .then(newCampaign =>
      res.json(newCampaign))
    .catch(next)
})

router.put('/update', (req, res, next) => {
  let campaignId = Number(req.body.id)
  Campaign.findOne({
    where: { id: campaignId }
  })
    .then(foundCampaign =>
      foundCampaign.update(req.body)
    )
    .then(updatedCampaign => {
      res.json(updatedCampaign)
    })
    .catch(next)
})

router.delete('/:campaignId/delete', (req, res, next) => {
  Campaign.destroy({
    where: { id: req.params.campaignId }
  })
    .then(() => {
      res.status(204).send();
    })
    .catch(next)
})
