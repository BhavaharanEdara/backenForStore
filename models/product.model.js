const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  image:{
    type:String,
    required:true
  },
  price:{
    type: Number,
    required: true
  },
  discount:{
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  rating:{
    type:Number,
    min:0,
    max:5,
    required: true
  },
    category:{
    type:String,
    required: true
  }
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product