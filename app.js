var express = require("express"),
mongoose = require('mongoose'),
passport = require('passport'),
bodyParser = require('body-parser'),
LocalStrategy = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose"),
Resource = require("./models/resource"),
User = require("./models/user");

mongoose.connect("mongodb+srv://shreshth1234:shreshth1234@cluster0.m3big.mongodb.net/auth?retryWrites=true&w=majority");

 var app = express();
 app.set('view engine','ejs');
 app.use(express.static(__dirname+'/public'));

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
 res.render("home" ,{status : req.isAuthenticated()});
});

app.get("/secret",isLoggedIn,function(req,res){
  console.log(req.user);
 	res.render("secret");
});

app.post('/secret',isLoggedIn,function(req,res){
  // res.send(req.user._id);
    var data1 = {
      type : req.body.type1 ,
      amount : req.body.amount1,
      city : req.body.city1,
      location : req.body.location1,
      owner_id : req.user._id
    };
    var data2 = {
      type : req.body.type2 ,
      amount : req.body.amount2,
      city : req.body.city2,
      location : req.body.location2,
      owner_id : req.user._i3
    };
    var data3 = {
      type : req.body.type3 ,
      amount : req.body.amount3,
      city : req.body.city3,
      location : req.body.location3,
      owner_id : req.user._id
    };
    var data4 = {
      type : req.body.type4 ,
      amount : req.body.amount4,
      city : req.body.city4,
      location : req.body.location4,
      owner_id : req.user._id
    };

    Resource.create(data1 , function(err , data){
      if(err){
          console.log('we have a error');
          res.redirect("/");
        }
        else{
          console.log(data);
          Resource.create(data2 , function(err , data){
            if(err){
                console.log('we have a error');
                res.redirect("/");
              }
              else{
                console.log(data);

                Resource.create(data3 , function(err , data){
                  if(err){
                      console.log('we have a error');
                      res.redirect("/");
                    }
                    else{
                      console.log(data);

                      Resource.create(data4 , function(err , data){
                        if(err){
                            console.log('we have a error');
                            res.redirect("/");
                          }
                          else{
                            console.log(data);

                            res.redirect("/");
                          }
                      });
                    }
                });
              }
          });
        }
    });


  // var newResource = {
  //   name:req.body.name,
  //   image:req.body.image,
  //   description:req.body.description,
  //   author:req.user
  // };
  // Campgrounds.create(newCamp,function(err,campgrounds){
  //   if(err){
  //     console.log('we have a error');
  //   }
  //   else{
  //     //console.log(campgrounds);
  //     res.redirect('/campgrounds');
  //   }
  // })
});

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

app.get("/search",function(req,res){
  var results = [];
  res.render("search" ,{results : [
    [{
    location : " - " ,
    amount : " - " ,
    type : " NO RECORDS ",
    owner_id : {
      username : " - "
    }
  }]
]});
});

app.post("/search",function(req,res){
  var results = [];
  var count = 0;
  if(!req.body.data){
    res.render("search" ,{results : [
        [{
        location : " - " ,
        amount : " - " ,
        type : " NO RECORDS ",
        owner_id : {
          username : " - "
        }
      }]
  ]});
  }else{
    req.body.data.forEach(function(value){
      Resource.find({type : value , city : req.body.city}).populate('owner_id').exec(function(err,result){
        count++;
        if(err){
          console.log('we have a error')
        }
        else{
          if(result.length != 0)
              var x = results.push(result);
          //console.log("in in " + count);
          if(count == req.body.data.length){
            console.log(results);
            if(results.length == 0){
              res.render("search" ,{results : [
                [{
                location : " - " ,
                amount : " - " ,
                type : " NO RECORDS ",
                owner_id : {
                  username : " - "
                }
              }]
            ]});
            }else{
              res.render( "search" , {results:results});
            }
          }
        }
      });
      //console.log("in" + count);
    });
  }

  //console.log("out " + count);

  //res.render("/search" , {results : results});
  //res.send(req.body);
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
