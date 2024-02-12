const { randomBytes } = require("crypto");
const commentModal = require("../modal/commentModal");
commentsByPostId = {};
// exports.getAllComment = async (req, res) => {
//   try {
//     const findComment = await commentModal.find();
//     console.log(findComment, "findComment");
//     console.log(commentsByPostId[req.params.id], "findCommentById1");
//     console.log(findComment[req.params.id], "findCommentById2");

//     res.send(commentsByPostId[req.params.id] || []);
//     // res.send(findComment || []);

//   } catch (err) {
//     console.log(err);
//     res.json({ message: "failed" });
//   }
// };
exports.getAllComment = async (req, res) => {
  try {
    console.log("working")
    const comments = await commentModal.findById(req.params.id);

    if (comments) {
      res.send(comments.commentsByPostId[req.params.id] || []);
    } else {
      res.send([]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve comments." });
  }
};
exports.createNewComment = async (req, res) => {
  try {
    console.log("working...");

    const commentId = randomBytes(4).toString("hex");
    const { content } = req.body;
    console.log(req.params.id, "req.params.id");
    const comment = await commentModal.findById(req.params.id);
    console.log(comment, "comment");
    if (!comment?.commentsByPostId[req.params.id]) {
      console.log("working...");
      // If comment with the given ID does not exist, create a new comment
      const newComment = new commentModal({
        _id: req.params.id,
        commentsByPostId: {
          [req.params.id]: [{ id: commentId, content }],
        },
      });
      console.log(newComment, "newComment");
      await newComment.save();

      res.status(201).json(newComment.commentsByPostId[req.params.id]);
    } else {
      console.log("else working...");

      // If comment with the given ID exists, add new comment it
      console.log(comment.commentsByPostId[req.params.id], "let sees");
      comment.commentsByPostId[req.params.id].push({ id: commentId, content });
      // console.log(comment.commentsByPostId[req.params.id],"let sees 2")
      console.log(comment, "comment");
      const commentAdded = new commentModal(comment);
      await commentAdded.save();
      res.status(201).json({message:"comment added"});

    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create or update comment." });
  }
};
// exports.createNewComment = async (req, res) => {
//   try {
//     const commentId = randomBytes(4).toString("hex");
//     const { content } = req.body;
//     console.log(content, "content");

//     const comments = commentsByPostId[req.params.id] || [];
//     // console.log(comments, "comments-1");

//     comments.push({ id: commentId, content });
//     // console.log(comments, "comments-2");

//     commentsByPostId[req.params.id] = comments;
//     console.log(commentsByPostId, "commentsByPostId");
//     // console.log(comments, "comments-3");
//     const commentCreate = await commentModal.create({
//       _id:req.params.id,
//       comment:commentsByPostId
//     })
//     // console.log(comments,"comments")
//     // res.status(201).send(comments);
//   } catch (err) {
//     console.log(err);
//     res.json({ message: "failed" });
//   }
// };
