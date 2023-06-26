const express = require("express");
const { randomBytes } = require("crypto");
const cors =require("cors")

const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(cors())
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});
app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");

  const { content } = req.body;
console.log(content,"content")

  const comments = commentsByPostId[req.params.id] || [];
  console.log(comments, "comments-1");

  comments.push({ id: commentId, content });
  console.log(comments, "comments-2");

  commentsByPostId[req.params.id] = comments;
  console.log(commentsByPostId, "commentsByPostId");
  console.log(comments, "comments-3");

    res.status(201).send(comments);
});
app.listen(4001, () => {
  console.log("listening at port 4001");
});
