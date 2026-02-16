// Q2 - Post Model
module.exports=(sequelize,DataTypes)=>{
 const Post=sequelize.define('Post',{
   id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
   title:DataTypes.STRING,
   content:DataTypes.TEXT
 });
 Post.associate=({User,Comment})=>{
   Post.belongsTo(User);
   Post.hasMany(Comment);
 };
 return Post;
}