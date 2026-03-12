const mongoose = require("mongoose");

const conversionSchema = new mongoose.Schema({

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  originalFile:String,

  convertedFile:String,

  format:String

},{timestamps:true});

module.exports = mongoose.model(
  "Conversion",
  conversionSchema
);