var express = require("express"),
mongoose = require('mongoose'),
passport = require('passport'),
bodyParser = require('body-parser'),
LocalStrategy = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose"),
Resource = require("./models/resource"),
User = require("./models/user");

mongoose.connect("mongodb+srv://ksraj:kumarpreetam1@cluster0.rh6hqmf.mongodb.net/?retryWrites=true&w=majority");

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
  //console.log(req.user);
  Resource.find({owner_id : req.user._id} , function(err, result) {
    if (err){
      console.log("error in finding result");
      res.render("secret" , {result : []});
    }
    else{
      console.log(result);
      res.render("secret" , {result : result});
    }
  });
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
      owner_id : req.user._id
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
    var data5 = {
      type : req.body.type5 ,
      amount : req.body.amount5,
      city : req.body.city5,
      location : req.body.location5,
      owner_id : req.user._id
    };
    var data6 = {
      type : req.body.type6 ,
      amount : req.body.amount6,
      city : req.body.city6,
      location : req.body.location6,
      owner_id : req.user._id
    };
    var data7 = {
      type : req.body.type7 ,
      amount : req.body.amount7,
      city : req.body.city7,
      location : req.body.location7,
      owner_id : req.user._id
    };
    var data8 = {
      type : req.body.type8 ,
      amount : req.body.amount8,
      city : req.body.city8,
      location : req.body.location8,
      owner_id : req.user._id
    };
    var data9 = {
      type : req.body.type9 ,
      amount : req.body.amount9,
      city : req.body.city9,
      location : req.body.location9,
      owner_id : req.user._id
    };
    var data10 = {
      type : req.body.type10 ,
      amount : req.body.amount10,
      city : req.body.city10,
      location : req.body.location10,
      owner_id : req.user._id
    };

    var data_arr = [data1 , data2 ,data3 , data4 , data5 , data6 , data7 , data8 , data9 ,data10];
    var count = 0;
    data_arr.forEach(function(data){
      Resource.find({type : data.type , owner_id : req.user._id} , function(err , val){
        if(val.length == 0){ // doesnt exist in database
          if(data.amount != ""  && data.amount != "0"){
            Resource.create(data , function(err , val){
                if(err){
                  console.log(err);
                  res.redirect('/');
                }else{
                  console.log(val);
                  if(count == data_arr.length-1){
                    res.redirect("/secret");
                  }
                  count++;
                }
              });
          }else{
            if(count == data_arr.length - 1){
              res.redirect("/secret");
            }
            count++;
          }
        }else{ // it already exist in database
          if(data.amount == "" || data.amount == "0"){
            Resource.deleteMany({type : data.type , owner_id : req.user._id},function(err,obj){
              if(err){
                console.log(err);
                res.redirect("/secret");
              }
              console.log("doc deleted");
              if(count == data_arr.length - 1){
                res.redirect("/secret");
              }
              count++;
            });
          }else{
            var myquery = { type : data.type , owner_id : req.user._id };
            var newvalues = { $set: {type : data.type, amount : data.amount , city : data.city , location : data.location , owner_id : data.owner_id } };
            Resource.updateOne(myquery, newvalues, function(err,obj) {
              if (err) {
                console.log(err);
                res.redirect("/secret");
              }
              console.log("1 document updated");
              if(count == data_arr.length - 1){
                res.redirect("/secret");
              }
              count++;
            });
          }
        }
      });
    });



    // if(data.amount != "" ){
    //   Resource.create(data , function(err , val){
    //     if(err){
    //       console.log(err);
    //       res.redirect('/');
    //     }else{
    //       console.log(val);
    //       if(count == data_arr.length-1){
    //         res.redirect("/secret");
    //       }
    //     }
    //   });
    // }else{
    //   if(count == data_arr.length -1){
    //     res.redirect("/secret");
    //   }
    // }
    // count++;



    //
    // Resource.create(data1 , function(err , data){
    //   if(err){
    //       console.log('we have a error');
    //       res.redirect("/");
    //     }
    //  else{
    //       console.log(data);
    //       Resource.create(data2 , function(err , data){
    //         if(err){
    //             console.log('we have a error');
    //             res.redirect("/");
    //           }
    //        else{
    //             console.log(data);
    //
    //             Resource.create(data3 , function(err , data){
    //               if(err){
    //                   console.log('we have a error');
    //                   res.redirect("/");
    //              }
    //                 else{
    //                   console.log(data);
    //
    //                   Resource.create(data4 , function(err , data){
    //                     if(err){
    //                         console.log('we have a error');
    //                         res.redirect("/");
    //                       }
    //                       else{
    //                         console.log(data);
    //                         res.redirect("/");
    //                       }
    //                   });
    //                 }
    //             });
    //           }
    //       });
    //     }
    // });


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
