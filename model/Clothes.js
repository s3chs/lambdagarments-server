const mongoose = require("mongoose");

const ClothesSchema = new mongoose.Schema({
  images: [{ type: String }],
  name: String,
  size: String,
  brand: String,
  pittopit: String,
  coltobot: String,
  description: String,
});

const ClothesModel = mongoose.model("clothes", ClothesSchema);

module.exports = ClothesModel; // use this object to interact with (CRUD)
