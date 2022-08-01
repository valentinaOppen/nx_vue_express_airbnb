const mongoose = require("mongoose");
// const User = mongoose.model(
//   "User",
//   new mong.Schema({
//     username: String,
//     email: String,
//     password: String
//   })
// );
// module.exports = User;

const schema = mongoose.Schema;
const userSchema = new schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);