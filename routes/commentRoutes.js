const express = require("express");
const { getAllComment, createNewComment } = require("../controller/commentController");

const router = express.Router();

router.route("/get/comments/:id").get(getAllComment);
router.route("/create/comments/:id").post(createNewComment);

module.exports = router;