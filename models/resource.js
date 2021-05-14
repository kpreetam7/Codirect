var mongoose = require('mongoose');

var resourceSchema = new mongoose.Schema({
  type:String,
  location:String,
  amount:String,
  city : String,
  owner_id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
  }
});
module.exports = mongoose.model('Resource',resourceSchema);
