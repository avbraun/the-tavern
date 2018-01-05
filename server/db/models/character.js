const Sequelize = require('sequelize')
const db = require('../db')

const Character = db.define('character', {
  name: Sequelize.STRING,
  race: Sequelize.STRING,
  charClass: Sequelize.STRING,
  alignment: Sequelize.STRING,
  description: Sequelize.TEXT
})

module.exports = Character
