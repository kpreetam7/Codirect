var mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");
var UserSchema = new mongoose.Schema({
	username: String,
	admin : {
    type: Boolean,
    default: false
} ,
	isValid : {
    type: Boolean,
    default: false
},
	name : String,
	password: String
});

UserSchema.plugin(passportLocalMongoose); // gives import functionalities
module.exports= mongoose.model("User",UserSchema);
