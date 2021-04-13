let database;
module.exports = () => {
    const mongoose = require("mongoose");
    // add your own uri below
    const uri = "mongodb://localhost:27017/dogServer";
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
