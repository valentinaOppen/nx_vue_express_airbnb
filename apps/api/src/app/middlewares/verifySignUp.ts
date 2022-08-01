// const db = require("../models");
// const User = db.user;

// const checkDuplicateUsernameOrEmail = (req, res, next) => {
//   db.user.findOne({ username: req.body.username }).exec((err, user) => {
//     if(err) {
//       res.status(500).send({message: err});
//       return;
//     }
//     if(user) {
//       res.status(400).send({message: "Failed"})
//     }
//   })
// }