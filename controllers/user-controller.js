
const user = require("../dao/user")
module.exports = (app) => {
    app.post('/api/users/signup', async (req, res) => {
            user.createUser({
                userName: req.body.userName,
                password: req.body.password,
                role : req.body.role
            }).then((actualUser) => {
                if(actualUser) {
                    req.session['profile'] = actualUser
                    res.send(actualUser)
                } else {
                    res.send("0")
                }
            })
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

    app.post('/api/users/logout', (req, res) => {
        req.session.destroy();
        res.send("200");
    } );

    app.post("/api/users/profile", (req, res) => {
        if(req.session['profile']) {
            const currentUser = req.session['profile']
            res.send(currentUser)
            console.log('currentuser in post', currentUser)
        } else {
            res.send({})
        }
    });


    app.put("/api/users/profile", (req, res) => {
        if(req.session['profile']) {
            const currentUser = req.session['profile']
            req.session['profile'] = req.body
            console.log("req body is:", req.body)
            // console.log(req.body.currentUser)
            res.send(req.body)
            user.updateUserByName(req.body.userName,req.body)

        } else {
            res.send({})
        }
    });



    app.get('/api/users/profile/:name', async (req, res) => {
        console.log("this is get name function")
        try {

            console.log(req.params.name)
            const result = await user.findUserByName(req.params.name);
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