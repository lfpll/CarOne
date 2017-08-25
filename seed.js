var mongoose = require("mongoose");
var User = require("./models/user");

var data = [{
    image: '/images/pexels-photo-289704.jpg',
    cord: {
        'lat': -25.44225,
        'lng': -49.282274
    },
    username: 'beatriz01',
    password: 'luiz28',
    conf: false
}, {
    image: '/images/pexels-photo-175977.jpg',
    cord: {
        'lat': -25.440623,
        'lng': -49.278326
    },
    username: 'gil101',
    password: 'luiz28',
    conf: false
}, {
    image: '/images/portrait-woman-girl-blond-157967.jpg',
    cord: {
        'lat': -25.432555,
        'lng': -49.254411
    },
    username: 'vitoria123',
    password: 'luiz28',
    conf: false
}, {
    image: '/images/pexels-photo-175904.jpg',
    cord: {
        'lat': -25.436176,
        'lng': -49.253515
    },
    username: 'giancarlo09',
    password: 'luiz28',
    conf: false
}, {
    image: '/images/pexels-photo-211997.jpg',
    cord: {
        'lat': -25.438862,
        'lng': -49.250398
    },
    username: 'yandra01',
    password: 'luiz28',
    conf: false
}, {
    image: '/images/drive-people-man-model-46232.jpg',
    cord: {
        'lat': -25.439776,
        'lng': -49.241413
    },
    username: 'acel02',
    password: 'luiz28',
    conf: false
}, {
    image: '/images/girl-dandelion-yellow-flowers-160699.jpg',
    cord: {
        'lat': -25.440135,
        'lng': -49.276932
    },
    username: 'analie609',
    password: 'luiz28',
    conf: false
}, {
    image: '/images/man-person-hat-fur.jpg',
    cord: {
        'lat': -25.438848,
        'lng': -49.277676
    },
    username: 'weslarney_cardoso01',
    password: 'luiz28',
    conf: false
}, {
    image: '/images/pexels-photo-173370.jpg',
    cord: {
        'lat': -25.438335,
        'lng': -49.2724
    },
    username: 'ulisses177',
    password: 'luiz28',
    conf: false
}, {
    image: '/images/pexels-photo-27411.jpg',
    cord: {
        'lat': -25.428052,
        'lng': -49.26458
    },
    username: 'aylane_silva1',
    password: 'luiz28',
    conf: false
}, {
    image: '/images/pexels-photo-179763.jpg',
    cord: {
        'lat': -25.430071,
        'lng': -49.268735
    },
    username: 'ericson_real',
    password: 'luiz28',
    conf: false
}, {
    image: '/images/pexels-photo.jpg',
    cord: {
        'lat': -25.440735,
        'lng': -49.276823
    },
    username: 'quincasborba',
    password: 'luiz28',
    conf: false
}, {
    image: '/images/pexels-photo-144474.jpg',
    cord: {
        'lat': -25.443148,
        'lng': -49.284964
    },
    username: 'helena',
    password: 'luiz28',
    conf: false
}, {
    image: '/images/smile-color-laugh-black-157907.jpg',
    cord: {
        'lat': -25.439743,
        'lng': -49.2759
    },
    username: 'd_ursula',
    password: 'luiz28',
    conf: false
}, {
    image: '/images/pexels-photo-230621.jpg',
    cord: {
        'lat': -27.44087,
        'lng': -49.2752
    },
    username: 'padremelchior',
    password: 'luiz28',
    conf: false
}, {
    image: '/images/woman-face-curly-hair-157920.jpg',
    cord: {
        'lat': -25.436215,
        'lng': -49.27237
    },
    username: 'eugenia',
    password: 'luiz28',
    conf: false
}, {
    image: '/images/people-homeless-male-street-165845.jpg',
    cord: {
        'lat': -25.437253,
        'lng': -49.274874
    },
    username: 'tiocosme',
    password: 'luiz28',
    conf: false
}, {
    image: '/images/man-people-space-desk.jpg',
    cord: {
        'lat': -25.440295,
        'lng': -49.273728
    },
    username: 'escobar',
    password: 'luiz28',
    conf: false
}, {
    image: '/images/pexels-photo-325682.jpg',
    cord: {
        'lat': -25.429355,
        'lng': -49.279593
    },
    username: 'drbacamarte',
    password: 'luiz28',
    conf: false
}]


  
function seedDB(){
   //Remove all campgrounds
         //add a few campgrounds
        User.remove({}, function(err){
        data.forEach(function(seed){
            User.create(seed, function(err, user){
                if(err){
                    console.log(err)
                } else {
                    user.save(user)
                    console.log('sucesso')
                    //create a comment
                }
            });
        });
})
    //add a few comments
}

module.exports = seedDB;
/*
$(document).ready(function() 
{
    console.log(<%=driverPassCords.waypoints[0].location.lat%>)
    initLocationProcedure();
    if(i<<%=driverPassCords.waypoints%>.length()){
    dest = <%=driverPassCords.waypoints%>[i].location;
    i = ++i
    }
    else
    {
    dest = <%=driverPassCords.destination%>;
    }
    if(google.maps.geometry.spherical.computeDistanceBetween(myPosition,dest)<200){
    if (dest =<%=driverPassCords.destination%>){
      alert('Chegamos rapaziada');
      finishedRace();
    }
    else{
      alert('Uhuuu bora fazer uns migos');
    }
    } 
    i = ++i
});



/*function finishedRace(){
      $.post('/finishedRace',{
      data: JSON.stringify(<%=driverPassCords%>),
      dataType:"json"
    });
    }*/
