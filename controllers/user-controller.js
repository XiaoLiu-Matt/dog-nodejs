
const user = require("../dao/user")
const bodyParser = require('body-parser')
module.exports = (app) => {
    app.post('/api/signup', bodyParser.json(), async (req, res) => {
        try {
            const result = await user.createUser({
                userName: req.body.userName,
                password: req.body.password,
                role : req.body.role,
                comments: []
            });
            res.send(result);
        } catch (err) {
            console.log(err)
        }
    });

    app.get('/api/users/:name/:password', async (req, res) => {
        try {
            const result = await user.findUserByNameAndPassword(req.params.name, req.params.password);
            res.send(result);
        } catch (err) {
            console.log(err)
        }
    });

    //for checking your data
    app.get('/api/users', async (req, res) => {
        try {
            const result = await user.findUsers();
            res.send(result);
        } catch (err) {
            console.log(err)
        }
    })

}