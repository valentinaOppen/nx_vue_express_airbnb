import { createUser } from '../services/auth.service';
const User = require('../models/user.model');

exports.postAddUser = async (req, res, next) => {  
  const user = new User({      
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
  })

  try {
    const res = await createUser(user);
    res.josn({res});
  } catch (error) {
    next(error);
  }

  // user.save()
  // .then((result) => {
  //   console.log("result", result);
  //   res.send("User saved succesfully.")
  // })
  // .catch(err => {
  //   console.log("ERR", err)
  //   res.send("User couldn't be saved.", err)
  // })
}