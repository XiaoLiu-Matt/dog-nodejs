const mongoose = require("mongoose")
const commentsSchema = mongoose.Schema({
    // _id: String,
    userName: String,
    dogId: String,
    comment: String
}, {collection: "comments"})

const commentModel = mongoose
    .model("CommentsModel", commentsSchema)

const createComment = (commentObj) =>
    commentModel.create(commentObj)

const deleteComment = (commentId) =>
    commentModel.deleteOne({_id: commentId})

const updateComment = (commentId, newComment) =>
    commentModel.updateOne({_id: commentId},
{$set: {comment: newComment}})

const findCommentsByUserName = (userName) =>
    commentModel.find({userName:userName})

const findCommentsByDogId = (dogId) =>
    commentModel.find({dogId: dogId})

const findCommentById = (commentId) =>
    commentModel.findById(commentId)
module.exports = { createComment, deleteComment, updateComment, findCommentsByUserName, findCommentsByDogId, findCommentById}
