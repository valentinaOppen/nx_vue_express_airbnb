const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db:any = {};
db.mongoose = mongoose;
db.user = require("./user.model");
module.exports = db;

export {}