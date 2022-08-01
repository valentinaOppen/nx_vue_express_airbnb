const User = require('../models/user.model');

exports.postAddUser = (req, res, next) => {

  const user = new User({
    username: 'name4',
    email: 'mail',
    password: '2asd',
  })

  console.log("USER", user);

  user.save().then(result => {
    console.log("result", result);
  }).catch(err => {
    console.log("ERR", err)
  })
}