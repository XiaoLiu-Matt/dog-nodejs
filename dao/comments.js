const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;

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
    commentModel.find({_id:ObjectId(commentId)})

const findComments = async () => {
    return commentModel.find();
};
module.exports = { createComment, deleteComment, updateComment, findComments,findCommentsByUserName, findCommentsByDogId, findCommentById}
