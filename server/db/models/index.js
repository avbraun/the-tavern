const User = require('./user')
const Campaign = require('./campaign')
const Character = require('./character')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// Campaign.belongsToMany(User, {through: 'campaign_players'});
// User.belongsToMany(Character, {through: 'user_characters'});

// User.hasMany(Character)
// // User.hasMany(Campaign)
// // Campaign.hasMany(User)
// Character.belongsTo(User)
// Character.belongsTo(Campaign)
// Campaign.hasMany(Character)

User.hasMany(Character)
User.belongsToMany(Campaign, {through: 'campaign_users'})
Campaign.belongsToMany(User, {through: 'campaign_users'})
Character.belongsTo(User)
Character.belongsTo(Campaign)
Campaign.hasMany(Character)


/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Campaign,
  Character
}
