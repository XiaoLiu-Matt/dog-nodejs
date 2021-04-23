let database;
module.exports = () => {
    const mongoose = require("mongoose");
    // add your own uri below
    // const uri = "mongodb://localhost:27017/dogServer";
    // const uri = 'mongodb://YOUR_USERNAME:YOUR_PASSWORD@iad2-c7-0.mongo.objectrocket.com:53889,iad2-c7-2.mongo.objectrocket.com:53889,iad2-c7-1.mongo.objectrocket.com:53889/DOG?replicaSet=e32099f5c50d45138556f82ad258847e'
    const uri = 'mongodb+srv://GradingQuiz:O7FmSoskBr7JNSZs@cluster0.kvuf3.mongodb.net/DOG?retryWrites=true&w=majority'
    if (database) {
        return;
    }
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    database = mongoose.connection;
    database.once("open", async () => {
        console.log("Connected to database");
    });
    database.on("error", () => {
        console.log("Error connecting to database");
    });
};
