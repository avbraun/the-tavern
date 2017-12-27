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

// // Add user to campaign
// router.put('/update', (req, res, next) => {
//   let campaignId = Number(req.body.campaignId)
//   Campaign.findOne({
//     where: { id: campaignId }
//   })
//     .then(foundCampaign =>
//       foundCampaign.update({
//         userId:
//       })
//     )
// })
