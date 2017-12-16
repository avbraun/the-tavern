const Sequelize = require('sequelize')
const db = require('../db')

const Campaign = db.define('campaign', {
  name: Sequelize.STRING,
  version: Sequelize.STRING,
  type: Sequelize.STRING,
  dm: Sequelize.STRING,
  description: Sequelize.TEXT,
  whenLast: Sequelize.TEXT,
  groupLoot: Sequelize.TEXT,
})

module.exports = Campaign
