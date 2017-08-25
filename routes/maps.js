var express = require("express"),
    router = express.Router(),
    User = require("../models/user.js"),
    bodyParser = require('body-parser'),
    async = require('async'),
    Race = require('../models/race');


router.use(bodyParser.urlencoded({
    extended: true,
    limit: '5mb',
}));

router.post('/userMap', function(req, res) {
    //Get the driver route
    var driverCordsTime = JSON.parse(req.body.data);
    //Get the users near the driver (not working, future use look for the region)
    gettingRegion().then(function(userList) {
        //Send the user to the function that calculate the distance and give the 10 nearest
        var passengerList = nearPassengers(driverCordsTime.cords, userList)
        //Sort the users by the nearest ones
        passengerList.sort(function(a, b) {
            return parseFloat(a.distance) - parseFloat(b.distance);
        });
        //Avoiding memory leak
        driverCordsTime = null
        //Send the list of the users
        res.send(passengerList);

    })
    // getting the regions from the users

});

router.post("/finalRoute", function(req, res) {
    var passData = []
	console.log("rodou");
    //Get the data from passengers and driver, like ids and cordinates
    var driverPassCords = JSON.parse(req.body.data)

    //List os the users that the driver invited
    driverPassCords['userId'].forEach(function(passId) {
        //A assyncronous function, first if get a list of the users data by their id's
        User.findById(passId).then(function(user) {
            passData.push(user)
            //Needed because assyncronous function,
            if (passData.length == driverPassCords['userId'].length) {

                function wayAndImage(passData) {
                    //getting the passengers cordinates
                    var imgWay = {}
                    var image = []
                    var waypoints = []
                    passData.forEach(function(passengerData) {
                        var waypoint = {
                            'location': passengerData.cord,
                            'stopover': true
                        };
                        var img = {
                            'image': passengerData.image
                        };
                        waypoints.push(waypoint)
                        image.push(img)
                        imgWay = {
                            "image": image,
                            "waypoints": waypoints
                        }
                    });
                    var waypoint = null;
                    var image = null;
                    var images = null;
                    var waypoins = null;
                    return imgWay
                }
                //Create the Waypoints on the list to be sent
                var wayimg = wayAndImage(passData)
                passData = null
                driverPassCords['waypoints'] = wayimg.waypoints
                driverPassCords['images'] = wayimg.image
                if (driverPassCords.waypoints.length > 0) {
                    User.findById(req.user._id, function(err, driver) {
                        //getting the driver id
                        driverPassCords['driverId'] = driver._id
                        //again assyncronous (TO BE OPTIMIZED, READ PROMISE LIBRARY)
                        if (driverPassCords['driverId'] = driver._id) {
                            //create a model race of the race to the database with the data from passenger and driver
                            Race.create(driverPassCords, function(err, newlyCreated) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    //redirect to the page of the race, CREATE A VALUE ON RACE TO NOT BE ACESSED WHEN THE RACE IS OVER=====
                                    if (newlyCreated._id != undefined) {
                                        console.log("finalRoute/" + newlyCreated._id)
                                        string = "finalRoute/" + newlyCreated._id
                                        var waypoints = null
                                        var passData = null
                                        var driverPassCords = null
                                        res.json({
                                            "redirect": string
                                        })
                                    }
                                }
                            });
                        }
                    });
                }
            }
        })
    })
});



router.get("/finalRoute/:id", function(req, res) {
    Race.findById(req.params.id, function(err, driverPassCords) { //.exec find the arguments 
        if (err) {
            res.redirect('/')
            console.log('err')
            } else {
            //render show template with that campgroundy)
            res.render("rota.ejs", {
                driverPassCords: driverPassCords
            });
        }
    })
});

/*router.post("/deleteRoute",function(req,res){
    pssIds = req.body.data
    confAndCancelRc(pssIds);
    User.findById(req.params.id,function(err,driver){
        driver.Save({ 'conf': false })  
    });
    res.redirect('/')
});*/

//In the future the function for selection the passengers at the regions that the driver passes
function gettingRegion() {
    var usersPromise = new Promise(function(resolve, reject) {
        User.find({}, function(err, response) {
            if (err) {
                return reject(err);
            }
            resolve(response);
        })
    })
    return usersPromise
}


//Calculate the distance between passenger and driverCords
function haverSine1(latPass, lngPass, driverCords) {
    var distances = []
    var latPass = Number(latPass)
    var lngPass = Number(lngPass)
    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    }
    // km
    driverCords.forEach(function(cord) {
        var x1 = cord.lat - latPass;
        var dLat = x1.toRad();
        var x2 = cord.lng - lngPass;
        var dLon = x2.toRad();
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(latPass.toRad()) * Math.cos((cord.lat).toRad()) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        if (isFinite(c)) {
            distances.push(c)
        }
    })
    var R = 6371;
    var minDist = Math.min.apply(null, distances);
    if (isFinite(minDist) && minDist != 'undefined') {
        var Final = minDist * R;
        var minDist = null
        var distances = null
        return (Final);
    }
}

function nearPassengers(driverCords, userList) {
    //Create two list's one for capturing a object(id,distance) other for capturing distance for comparison
    //Loop true the users list
    //Compare to find the 10 nearest passengers from the driver route
    //push the 10 first users than remove the most far one's
    var passengerList = [];
    var listDistances = [];

    userList.forEach(function(user) {
        var lat = user.cord.lat
        var lng = user.cord.lng
        var passDist = haverSine1(lat, lng, driverCords) * 1000
        if (isFinite(passDist)) {
            var Max = Math.max.apply(null, listDistances);
            if (listDistances.length >= 10 && Max > passDist) {
                var index = listDistances.indexOf(Max);
                var passDist = Math.round(passDist * 1.3)
                user['distance'] = passDist
                listDistances.splice(index, 1, passDist)
                passengerList.splice(index, 1, user);
            } else if (listDistances.length < 10) {
                listDistances.push(passDist * 1.3)
                var passDist = Math.round(passDist)
                user['distance'] = passDist
                passengerList.push(user);
            }
        }

    })
    var listDistances = null
    return passengerList;

}

//Function that say to the passengers that they got a ride

module.exports = router;
