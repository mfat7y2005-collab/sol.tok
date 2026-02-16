const express=require('express');
const app=express();
app.use(express.json());
const db=require('./models');
const {User,Post,Comment}=db;

// ===========================
// Q1 - Create User With Validation
// ===========================
app.post("/users", async (req, res) => {
  const { name, email, password, role } = req.body;
  const exists = await User.findOne({ where: { email } });
  if (exists) return res.json({ message: "email already exists" });

  const bcrypt=require("bcrypt");
  const hash = bcrypt.hashSync(password, 10);
  const user = await User.create({ name, email, password: hash, role });
  res.json({ message: "user created", user });
});

// ===========================
// Q2 - Find User by Email
// ===========================
app.get("/users/email/:email", async (req, res) => {
  const user = await User.findOne({ where: { email: req.params.email } });
  if (!user) return res.json({ message: "user not found" });
  res.json({ role: user.role });
});

// ===========================
// Q3 - Get User by PK Without Role
// ===========================
app.get("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["role"] }
  });
  res.json(user);
});

// ===========================
// Q4 - Create Post
// ===========================
app.post("/posts", async (req, res) => {
  const { title, content, userId } = req.body;
  const post = await Post.create({ title, content, userId });
  res.json({ message: "post created", post });
});

// ===========================
// Q5 - Delete Post Only if Owner
// ===========================
app.delete("/posts/:id", async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.json({ message: "post not found" });

  if (post.userId != req.body.userId)
    return res.json({ message: "Not allowed" });

  await post.destroy();
  res.json({ message: "post deleted" });
});

// ===========================
// Q6 - Get All Posts + Comments Count
// ===========================
app.get("/posts", async (req, res) => {
  const posts = await Post.findAll({ include: [User, Comment] });
  res.json(posts);
});

// ===========================
// Q7 - Create Bulk Comments
// ===========================
app.post("/comments/bulk", async (req, res) => {
  const comments = await Comment.bulkCreate(req.body.comments);
  res.json({ message: "comments created", comments });
});

// ===========================
// Q8 - Update Comment by ID (Owner only)
// ===========================
app.put("/comments/:id", async (req, res) => {
  const comment = await Comment.findByPk(req.params.id);
  if (comment.userId != req.body.userId)
    return res.json({ message: "not allowed" });

  comment.text = req.body.text;
  await comment.save();
  res.json({ message: "comment updated" });
});

// ===========================
// Q9 - Search Comments Containing Word
// ===========================
const {Op}=require("sequelize");
app.get("/comments/search", async (req, res) => {
  const comments = await Comment.findAll({
    where: { text: { [Op.like]: `%${req.query.text}%` } }
  });
  res.json({ count: comments.length, comments });
});

// ===========================
// Q10 - Last 3 Comments on Post
// ===========================
app.get("/comments/recent/:postId", async (req, res) => {
  const comments = await Comment.findAll({
    where: { postId: req.params.postId },
    limit: 3,
    order: [["createdAt", "DESC"]]
  });
  res.json(comments);
});

// ===========================
// Q11 - Comment by PK with User + Post
// ===========================
app.get("/comments/info/:id", async (req, res) => {
  const comment = await Comment.findByPk(req.params.id, {
    include: [User, Post]
  });
  res.json({ comment });
});

db.sequelize.sync();
app.listen(3000,()=>console.log("Running..."));
