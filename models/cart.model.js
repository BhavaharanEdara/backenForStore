const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
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
  productId:{
    type: mongoose.Schema.Types.ObjectId
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
  },
  quantity:{
    type:Number,
    required:true
  }
})

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart