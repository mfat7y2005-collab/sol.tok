// Q1 - User Model
module.exports=(sequelize,DataTypes)=>sequelize.define('User',{
 id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
 name:DataTypes.STRING,
 email:DataTypes.STRING,
 password:DataTypes.STRING,
 role:DataTypes.STRING
});