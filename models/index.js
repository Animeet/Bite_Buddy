const User = require('./User');
const Business = require('./Business');
const Subscribe = require('./Subscribe');
const Favorite = require('./Favorite');

User.hasOne(Business, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Business.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Favorite);
Favorite.belongsTo(User);

module.exports = {
  User,
  Business,
  Subscribe
};
