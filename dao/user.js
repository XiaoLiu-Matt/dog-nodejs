const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const UserSchema = new Schema({
    userName: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    role : String
});
// This model is mapping to MongoDB 'user' collection
const UserModel = model('User', UserSchema, 'userInfo');
// const test = new UserModel({userName:'1',password:'1'})
// test.save(function (err) {
//     if (err) return err;
//     // saved!
// });
const createUser = async (user_instance) => {
   if( await findUserByName(user_instance.userName) == null)
    {
        return UserModel.create(user_instance);
    }
   return null

}

const findUserByName = async (userName) => {
    const filter = { userName };
    return UserModel.findOne(filter);
};

const findUsers = async () => {
    return UserModel.find();
};

const findUserByNameAndPassword = async (userName, password) => {
    const filter = { userName, password };
    return UserModel.findOne(filter);
};

const findUserByCredentials = (credetials) => {
    return UserModel.findOne({
        userName: credetials.userName,
        password: credetials.password
    })
    // return usersModel.find({username})
}

const updateUserByName = async (userName, updated_info) => {
    const filter = { userName };
    return UserModel.findOneAndUpdate(filter, updated_info);
};

module.exports = { createUser,findUserByName,findUserByNameAndPassword, findUsers, updateUserByName, findUserByCredentials}


// Example:
// const user_instance = { userName: 'TestUser', password: 'passw0rd' };
// createUser(user_instance); # Insert User into db
// updateUserByName('TestUser', {password: '123'}); # Update user information
