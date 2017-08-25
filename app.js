const throng = require('throng');

const WORKERS = process.env.WEB_CONCURRENCY || 1;
var port = process.env.PORT
throng({
  workers: WORKERS,
  lifetime: Infinity
}, start);


function start(){
var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    passportLocal   = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    User            = require('./models/user'),
    cookieParser = require('cookie-parser'),
    methodOverride  = require("method-override"),
    seedDB	= require('./seed.js');



    
//======== ROUTTES OF PAGES    
var mapsRoutes = require("./routes/maps");
var indexRoutes = require("./routes/auth");
var thanksRoutes = require("./routes/thanks");
mongoose.connect('mongodb://writer:VegVH0Dfa9nLzEse@cluster0-shard-00-00-ig3pl.mongodb.net:27017,cluster0-shard-00-01-ig3pl.mongodb.net:27017,cluster0-shard-00-02-ig3pl.mongodb.net:27017/CarOne?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');



app.set('view engine','ejs');

app.use(bodyParser.urlencoded({
    extended:true,
    limit: '5mb',}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(require('cookie-session')({
  name: 'session',
  keys: ['carone1', 'carone2']
}))
//=========== AUTH SYSTEM PASSPORT
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(indexRoutes);
app.use(mapsRoutes);
app.use(thanksRoutes)
app.get('/',function(req,res){
    res.redirect('/login');
});



//======= Create the ports =====

app.listen(port,function(){
    console.log('Working Server.')
})

}
