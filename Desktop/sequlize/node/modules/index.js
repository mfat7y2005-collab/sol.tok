// Q0 - Database Connection
const {Sequelize,DataTypes}=require('sequelize');
const sequelize=new Sequelize({dialect:'sqlite',storage:'database.sqlite'});

// Import Models
const User=require('./user')(sequelize,DataTypes);
const Post=require('./post')(sequelize,DataTypes);
const Comment=require('./comment')(sequelize,DataTypes);

// Relations
Post.associate({User,Comment});
Comment.associate({User,Post});

sequelize.sync();
module.exports={sequelize,User,Post,Comment};
