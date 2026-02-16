// Q3 - Comment Model
module.exports=(sequelize,DataTypes)=>{
 const Comment=sequelize.define('Comment',{
   id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
   text:DataTypes.TEXT
 });
 Comment.associate=({User,Post})=>{
   Comment.belongsTo(User);
   Comment.belongsTo(Post);
 };
 return Comment;
}