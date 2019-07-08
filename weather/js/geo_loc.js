'use strict';


getGeoLocation();


// Call getLocation function, send locale

// Gets longitude and latitude of current location
function getGeoLocation() {
    const status = document.getElementById('status');
 status.innerHTML = 'Getting Location';

 // end getGeoLocation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
     const lat = position.coords.latitude;
     const long = position.coords.longitude;
     storage.setItem('lat',lat);
     storage.setItem('long', long);

   // Combine the values
     const locale = lat + "," + long;
     console.log(`Lat and Long are: ${locale}.`);
     getLocation(locale);
      })
   } else {
    status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
   } // end else
}
