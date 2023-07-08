const express = require("express");
const { getAllComment, createNewComment } = require("../controller/commentController");

const router = express.Router();

router.route("/posts/:id/comments").get(getAllComment);
router.route("/posts/:id/comments").post(createNewComment);

module.exports = router;