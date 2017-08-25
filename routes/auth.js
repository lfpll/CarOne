var express = require("express"),
    router  = express.Router(),
    passport= require("passport"),
    User    = require("../models/user.js");
    

//======== INITIAL PAGE ROUTE =======

router.get('/',function(req, res) {
    res.redirect('/secret');
});

//=========LOGGED ROUTE ============

router.get('/secret',isLoggedin,function(req, res) {
    res.render('secret');
});


// ======== LOGIN ROUTE =============

router.get('/login',function(req,res){
    res.render('login');
});

router.post("/login", passport.authenticate('local',
{ 
    successRedirect:'/secret',
    failureRedirect:'/login'
}),function(req, res) {
});

//========REGISTER ROUTE=============

router.get('/register',function(req, res) {
    res.render('/register');
});

router.post('/register',function(req,res){
    req.body.password;
    var newUser = new User ({ username: req.body.username});
    User.register(newUser, req.body.password,function(err,user){
        if(err)
        {
            console.log(err);
            return res.redirect('/login');
        }
        passport.authenticate("local")(req,res, function(){
            res.redirect("/secret");
        });
    });
});
// ====== FUNCTION THAT SEE'S IF THE USER IS LOGGED

function isLoggedin(req,res,next){
  if(req.isAuthenticated()){
      return next();
  }  
  res.redirect('/login')
};

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});

module.exports = router;
