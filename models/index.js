const User = require('./User');
const Business = require('./Business');
const Subscribe = require('./Subscribe');

User.hasOne(Business, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });

Business.belongsTo(User, {
    foreignKey: 'user_id',
  });  

module.exports = {
    User,
    Business,
    Subscribe
};
