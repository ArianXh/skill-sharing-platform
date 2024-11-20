const User = require('./User');
const Skills = require('./Skills');
const Review = require('./Review');
const Categories = require('./Categories');

// Define associations here
User.hasMany(Skills, { foreignKey: 'user_id', as: 'skills' });
Skills.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Review, { foreignKey: 'user_id', as: 'reviews' });
Skills.hasMany(Review, { foreignKey: 'skill_id', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'user_id', as: 'user'});
Review.belongsTo(Skills, { foreignKey: 'skill_id', as: 'skill' });

Categories.hasMany(Skills, { foreignKey: 'category_id', as: 'skills' });
Skills.belongsTo(Categories, { foreignKey: 'category_id', as: 'categories' });

module.exports = { User, Skills, Review, Categories };
