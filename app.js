var express = require("express"),
mongoose = require('mongoose'),
passport = require('passport'),
bodyParser = require('body-parser'),
LocalStrategy = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose"),
User = require("./models/user");

mongoose.connect("mongodb+srv://shreshth1234:shreshth1234@cluster0.m3big.mongodb.net/auth?retryWrites=true&w=majority");

 var app = express();
 app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));
 app.use(require("express-session")({
 	secret :"Rusty is the best and cutest dog in the world",
 	resave : false,
 	saveUninitialized : false
 }));

 app.use(passport.initialize());
 app.use(passport.session());
 passport.use(new LocalStrategy(User.authenticate()));
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());

//=============
 //Routes
//===========

 app.get("/",function(req,res){
 	res.render("home");
 });

 app.get("/secret",isLoggedIn,function(req,res){
 	res.render("secret");
 })

//Auth Routes

//show sign up form
app.get("/register",function(req,res){
	res.render("register");
});

//handling user sign up
app.post("/register",function(req,res){
	User.register(new User({username: req.body.username}),req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render('register');
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/secret");
		});
	});
});

//show login form
app.get("/login",function(req,res){
	res.render("login");
});

//handling login
app.post("/login",passport.authenticate("local",{
	successRedirect : "/secret",
	failureRedirect : "/login"
}),function(req,res){});

app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

app.listen(process.env.PORT||3000,function(){
 	console.log("server staterd...");
 });
