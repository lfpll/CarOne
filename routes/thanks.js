var express     = require("express"),
    router      = express.Router(),
    bodyParser  = require('body-parser'),
    Race        = require('../models/race');
    User 		= require('../models/user');


router.post('/finalRoute/:id',function(req,res){
	var id = req.params.id
	Race.findByIdAndRemove(id, function(err,data){
		if(err){
			console.log(err)
		}
		else{
			console.log('sucess')

		}
	})
		res.redirect('/thanks')
	
});

router.get('/thanks',function(req,res){
	res.render('thanks.ejs')
})

router.get("/perfil",function(req, res) {
    User.findById(req.user.id,function(err,foundUser){
        if(err){
          res.redirect("/");  
        }
        else{
    res.render("profile", {foundUser: foundUser});
        }
    });
});


router.get("/perfil/edit",function(req, res) {
    User.findById(req.user.id,function(err,foundUser){
        if(err){
          res.redirect("/");  
        }
        else{
    res.render("editProfile", {foundUser: foundUser});
        }
    });
});


router.put("/perfil/edit",function(req, res) {
    User.findByIdAndUpdate(req.user.id,req.body.user,function(err, updateUser){
        if(err){
            res.redirect("/");
        }
        else{
            res.redirect("/perfil");
            console.log(updateUser)
        }
	});
});


module.exports = router;