
const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  foodId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  cuisine: {
    type: String,
    required: true,
    trim: true
  },
  ingredients: {
    type: [String],
    required: true,
    validate: {
      validator: value => value.length > 0,
      message: "Phai co it nhat mot nguyen lieu"
    }
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: Number.isInteger,
      message: "So luong phai la so nguyen"
    }
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("Food", foodSchema, "foods");
