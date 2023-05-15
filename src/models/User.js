const {Schema, model} = require("../utilities/db") // import Schema & model

// User Schema
const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    pekerjaan: {type: String, required: true},
    namaLengkap: {type: String, required: true},
})

// User model
const User = model("User", UserSchema)

module.exports = User