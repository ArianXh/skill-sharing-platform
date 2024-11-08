const User = require('./User');
const Skills = require('./Skills');
const Review = require('./Review');

// Define associations here
User.hasMany(Skills, { foreignKey: 'user_id', as: 'skills' });
Skills.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Review, { foreignKey: 'user_id', as: 'reviews' });
Skills.hasMany(Review, { foreignKey: 'skill_id', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'user_id' });
Review.belongsTo(Skills, { foreignKey: 'skill_id' });

module.exports = { User, Skills, Review };
