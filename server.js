// require('./database')()
const mongoose = require('mongoose');
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// var MongoClient = require('mongodb').MongoClient;
//
// var username = 'YOUR_USERNAME';
// var password = 'YOUR_PASSWORD';
// var hosts = 'iad2-c7-0.mongo.objectrocket.com:53889,iad2-c7-2.mongo.objectrocket.com:53889,iad2-c7-1.mongo.objectrocket.com:53889';
// var database = 'DOG';
// var options = '?replicaSet=e32099f5c50d45138556f82ad258847e';
// var connectionString = 'mongodb://' + username + ':' + password + '@' + hosts + '/' + database + options;
//
// MongoClient.connect(connectionString, function(err, db) {
//     if (db) {
//         db.close();
//     }
//     if (err) {
//         console.log('Error: ', err);
//     } else {
//         console.log('Connected!');
//         process.exit();
//     }
// });

mongoose.connect('mongodb://YOUR_USERNAME:YOUR_PASSWORD@iad2-c7-0.mongo.objectrocket.com:53889,iad2-c7-2.mongo.objectrocket.com:53889,iad2-c7-1.mongo.objectrocket.com:53889/DOG?replicaSet=e32099f5c50d45138556f82ad258847e')
const session = require('express-session')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))
// mongodb://YOUR_USERNAME:YOUR_PASSWORD@iad2-c7-0.mongo.objectrocket.com:53889,iad2-c7-2.mongo.objectrocket.com:53889,iad2-c7-1.mongo.objectrocket.com:53889/YOUR_DATABASE_NAME?replicaSet=e32099f5c50d45138556f82ad258847e
// Configures CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With, Origin, Accept');
    res.header('Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
require('./controllers/user-controller')(app)
require('./controllers/comments-controller')(app)

// const port = process.env.PORT;
//
// app.listen(port, () => {
//     console.log(`Listening on http://localhost:${port}/`);
// });
app.listen(4001)