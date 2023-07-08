const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    _id: { type: String },
    commentsByPostId: { type: Object }
});

module.exports = mongoose.model("Comment", commentSchema);