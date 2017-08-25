alert('funfando')

function watchCurrentPosition() {
  var positionTimer = navigator.geolocation.watchPosition(
      function (position) {
          setMarkerPosition(
              currentPositionMarker,
              position
          );
      });
  }

  function setMarkerPosition(marker, position) {
                marker.setPosition(
                    new google.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude)
                );
            }

function setCurrentPosition(pos) {
  currentPositionMarker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(
          pos.coords.latitude,
          pos.coords.longitude
      ),
      title: "Current Position"
  });


function locError(error) {
            // the current position could not be located
            alert("The current position could not be found!");
        }
function displayAndWatch(position) {
    // set current position
    console.log(position)
    setCurrentPosition(position);
    // watch position
    watchCurrentPosition();
}
function initLocationProcedure() {
    initMap();
    console.log(navigator.geolocation)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayAndWatch, locError);
    } else {
        alert("Your browser does not support the Geolocation API");
    }
}