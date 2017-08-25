<!--  BUTTTONNNNS ROUT -->

app.get("/racesNow",function(req,res){
	res.render("butRoutes/racesNow")
})

app.get("/racesOld",function(req,res){
	res.render("rbutRoutes/racesOld")
})
// ============================

app.get("/cupons",function(req,res){
	res.render("butRoutes/cupons")
})
// =============================== TWO TOGETHER ?????????

app.get("/locals",function(req,res){
	res.render("butRoutes/locals")
})

//===============================
app.get("/perfil",function(req,res){
	req.findById(req.params.id).populate('comments').populate("Friends").exec(err,User){
		if(err){
			res.redirect("/");
		}
		else{
			res.render("butRoutes/perfil/:id",{User:User})
		}
}
})

//===============================
app.get("/discRest",function(req,res){
	res.render("butRoutes/discRest")
})

app.get("/discShows",function(req,res){
	res.render("butRoutes/discShows")
})

app.get("/discMalls",function(req,res){
	res.render("butRoutes/discMalls")
})

app.get("/discCine",function(req,res){
	res.render("butRoutes/discCine")
})

app.get("/discEvents",function(req,res){
	res.render("butRoutes/discEvents")
})


