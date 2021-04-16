
const user = require("../dao/user")
module.exports = (app) => {
    app.post('/api/users/signup', async (req, res) => {
        try {
            const result = await user.createUser({
                userName: req.body.userName,
                password: req.body.password,
                role : req.body.role,
                comments: []
            });
            req.session['profile'] = result
            res.send(result);
        } catch (err) {
            console.log(err)
        }
    });

    app.post('/api/users/login', (req, res) => {
        const credentials = req.body;
        user.findUserByCredentials(credentials)
            .then((actualUser) => {
                if(actualUser) {
                    req.session['profile'] = actualUser
                    res.send(actualUser)
                } else {
                    res.send("0")
                }
            })
    } );

    app.post("/api/users/profile", (req, res) => {
        if(req.session['profile']) {
            const currentUser = req.session['profile']
            res.send(currentUser)
        } else {
            res.send({})
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