const mongoose = require("mongoose")

const addressSchema = mongoose.Schema({
  address:{
    type:String,
    required: true
  },
  phone:{
    type:String,
    required:true
  },
  city:{
    type: String,
    required: true
  },
  state:{
    type:String,
    required: true
  },
  pinCode:{
    type:Number,
    required:true
  }
})

const Address = mongoose.model("Address", addressSchema);

module.exports = Address