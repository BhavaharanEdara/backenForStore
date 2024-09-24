const mongoose = require("mongoose")

const wishlistSchema = mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  image:{
    type:String,
    required:true
  },
  productId:{
    type: mongoose.Schema.Types.ObjectId
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

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist