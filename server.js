require('./database')()

const express = require('express')
const app = express()

// Configures CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});
require('./controllers/user-controller')(app)
// app.get('/test', async (req, res) => {
//     try {
//         res.send('hello world');
//     } catch (err) {
//         console.log(err)
//     }
// })
app.listen(4001)