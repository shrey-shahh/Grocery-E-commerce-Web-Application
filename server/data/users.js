const mongoCollections = require("../config/mongoCollection");
const userCollection = mongoCollections.users;
const uuid = require("uuid");

const createUser = async (args) => {
    const users = await userCollection();
    const newUser = {};
    newUser._id = args._id;
    newUser.name = args.name;
    newUser.email = args.email;
    newUser.phoneNumber = args.phoneNumber;
    newUser.address = args.address;
    //Why Password
    newUser.cart = [];
    newUser.orders = [];
    newUser.reviews = [];
    newUser.createdAt = new Date();
    await users.insertOne(newUser);
    return newUser;
}

const getAllUsers = async () => {
    const users = await userCollection();
    const allUsers = await users.find({}).toArray();
    return allUsers;
}

const getUser = async (args) => {
    const users = await userCollection();
    const user = await users.findOne({ _id: args._id });
    return user;
}


module.exports = {
    createUser,
    getAllUsers,
    getUser
}