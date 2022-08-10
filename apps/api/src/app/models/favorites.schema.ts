import { string } from "yup";

const mongoose = require("mongoose");

const schema = mongoose.Schema;
const favoritesSchema = new schema({  
  lng: {type: Number, required: true},
  lat: {type: Number, required: true},
  name: {type: String, required: true},
  userId: {type: String, required: true}
});

module.exports = mongoose.model('places-favorites', favoritesSchema);

export {}