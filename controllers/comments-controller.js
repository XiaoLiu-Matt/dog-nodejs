const commentsDao = require("../dao/comments")

module.exports = (app) => {

    app.post('/api/dogs/:dogId/comments', (req, res) =>
        commentsDao.createComment({
            userName:req.body.userName,
            dogId: req.params.dogId,
            comment:req.body.comment
        })
            .then(comment => {
                res.send(comment)
            }))

    app.delete("/api/users/:userName/comments/:commentId", (req, res) =>
        commentsDao.deleteComment(req.params.userName, req.params.commentId)
            .then(comment => res.json(comment))
    )

    app.put("/api/comments/:commentId", (req, res) =>
        commentsDao.updateComment(req.params.commentId, req.body.comment)
            .then(comment => res.json(comment))
    )

    app.get('/api/users/:userName/comments', (req, res) =>
        commentsDao.findCommentsByUserName(req.params.userName)
            .then(comments => res.json(comments)))

    app.get('/api/dogs/:dogId/comments', (req, res) =>
        commentsDao.findCommentsByDogId(req.params.dogId)
            .then(comments => res.json(comments)))
}