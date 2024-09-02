// models/index.js
const User = require('./User');
const Skills = require('./Skills');

// A User can have many Skills
User.hasMany(Skills, {
    foreignKey: 'user_id',
    as: 'skills' // Alias for accessing related skills
});

// A Skill belongs to a single User
Skills.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

module.exports = {
    User,
    Skills,
};
