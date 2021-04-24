require('./database')()

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const session = require('express-session')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))

// Configures CORS
// var cors = require('cors');
// app.use(cors());
app.use(function (req, res, next) {
    // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Origin', 'https://dog-react-client.herokuapp.com');
    res.header('Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With, Origin, Accept');
    res.header('Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
require('./controllers/user-controller')(app)
require('./controllers/comments-controller')(app)

const port = process.env.PORT || 4001;

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});
