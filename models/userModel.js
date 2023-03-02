const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
  },
  birthDate: {
    type: String  ,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
