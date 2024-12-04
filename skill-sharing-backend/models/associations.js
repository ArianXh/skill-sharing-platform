const User = require('./User');
const Skills = require('./Skills');
const Review = require('./Review');
const Categories = require('./Categories');
const Transactions = require('./Transactions');
const Post = require('./Post');
const Comment = require('./Comment');
const Tag = require('./Tag'); 
const Availability = require('./Availability');  

// Define associations here
User.hasMany(Skills, { foreignKey: 'user_id', as: 'skills' });
Skills.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Review, { foreignKey: 'user_id', as: 'reviews' });
Skills.hasMany(Review, { foreignKey: 'skill_id', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'user_id', as: 'user'});
Review.belongsTo(Skills, { foreignKey: 'skill_id', as: 'skill' });

Categories.hasMany(Skills, { foreignKey: 'category_id', as: 'skills' });
Skills.belongsTo(Categories, { foreignKey: 'category_id', as: 'categories' });


/////////////////////////////// TRANSACTIONS ///////////////////////////////
User.hasMany(Transactions, { as: 'buyerTransactions', foreignKey: 'buyer_id' });
User.hasMany(Transactions, { as: 'sellerTransactions', foreignKey: 'seller_id' });
Transactions.belongsTo(User, { as: 'buyer', foreignKey: 'buyer_id' });
Transactions.belongsTo(User, { as: 'seller', foreignKey: 'seller_id' });

Skills.hasMany(Transactions, { foreignKey: 'skill_id' });
Transactions.belongsTo(Skills, { foreignKey: 'skill_id', as: 'skill'});


/////////////////////////////// COMMUNITY ///////////////////////////////
User.hasMany(Post, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'user_id' });

Post.hasMany(Comment, { foreignKey: 'post_id', onDelete: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

User.hasMany(Comment, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

// Optional: Post and Tag many-to-many relationship
if (Tag) {
    Post.belongsToMany(Tag, { through: 'PostTags', foreignKey: 'post_id' });
    Tag.belongsToMany(Post, { through: 'PostTags', foreignKey: 'tag_id' });
}


/////////////////////////////// BOOKING SESSIONS /////////////////////////////// 

Skills.hasMany(Availability, { foreignKey: 'skill_id', as: 'availabilities' });
Availability.belongsTo(Skills, { foreignKey: 'skill_id', as: 'skill' });





module.exports = { User, Skills, Review, Categories, Post, Comment, Tag, Availability };
