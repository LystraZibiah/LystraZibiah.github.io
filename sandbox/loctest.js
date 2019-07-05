'use strict';


getGeoLocation();

var storage = window.localStorage;
// Set global variable for custom header required by NWS API
var idHeader = {
    headers: {
      "User-Agent": "Student Learning Project - zib15001@byui.edu"
    }
  };
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
   // Combine the values
     const locale = lat + "," + long;
     console.log(`Lat and Long are: ${locale}.`);
     getLocation(locale);
      })
   } else {
    status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
   } // end else
}
// Gets location information from the NWS API
function getLocation(locale) {
    const URL = "https://api.weather.gov/points/" + locale; 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('Json object from getLocation function:'); 
      console.log(data);
      // Store data to localstorage 
      storage.setItem("locName", data.properties.relativeLocation.properties.city); 
      storage.setItem("locState", data.properties.relativeLocation.properties.state); 
   
      // Next, get the weather station ID before requesting current conditions 
      // URL for station list is in the data object 
      let stationsURL = data.properties.observationStations; 
      // Call the function to get the list of weather stations
      getStationId(stationsURL); 
     }) 
    .catch(error => console.log('There was a getLocation error: ', error)) 
   } // end getLocation function
   // Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) { 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(stationsURL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getStationId function:'); 
      console.log(data);
    
      // Store station ID and elevation (in meters - will need to be converted to feet) 
      let stationId = data.features[0].properties.stationIdentifier; 
      let stationElevation = data.features[0].properties.elevation.value; 
      console.log('Station and Elevation are: ' + stationId, stationElevation); 
   
      // Store data to localstorage 
      storage.setItem("stationId", stationId); 
      storage.setItem("stationElevation", stationElevation); 
   
      // Request the Current Weather for this station 
      getWeather(stationId);
     }) 
    .catch(error => console.log('There was a getStationId error: ', error)) 
   } // end getStationId function
   // Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) { 
    // This is the URL for current observation data 
    const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getWeather function:'); 
      console.log(data);
    
      // Store weather information to localStorage 
      storage.setItem("elavtion",data.properties.elevation.value); 
      storage.setItem("max",data.properties.maxTemperatureLast24Hours.value); 
      storage.setItem("min",data.properties.minTemperatureLast24Hours.value); 
      storage.setItem("temprature",data.properties.temperature.value); 
      storage.setItem("windchill",data.properties.windChill.value); 
      storage.setItem("winddirection",data.properties.windDirection.value);
      storage.setItem("windspeed",data.properties.windSpeed.value);
      storage.setItem("windGusts",data.properties.windGust.value);
      // Build the page for viewing 
      getHourly();
     }) 
    .catch(error => console.log('There was a getWeather error: ', error)) 
   } // end getWeather function
  //Hourly function
  function getHourly() { 
      const URL= "https://api.weather.gov/gridpoints/PIH/125,87/forecast/hourly";
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getHourly function:'); 
      console.log(data);

      // Store data to hourly data
      storage.setItem("hour1",data.properties.periods[0].temperature); 
      storage.setItem("hour2",data.properties.periods[1].temperature); 
      storage.setItem("hour3",data.properties.periods[2].temperature); 
      storage.setItem("hour4",data.properties.periods[3].temperature); 
      storage.setItem("hour5",data.properties.periods[4].temperature); 
      storage.setItem("hour6",data.properties.periods[5].temperature);
      storage.setItem("hour7",data.properties.periods[6].temperature);
      storage.setItem("hour8",data.properties.periods[7].temperature);
      storage.setItem("hour9",data.properties.periods[8].temperature);
      storage.setItem("hour10",data.properties.periods[9].temperature);
      storage.setItem("hour11",data.properties.periods[10].temperature);
      storage.setItem("hour12",data.properties.periods[11].temperature);
      storage.setItem("hour13",data.properties.periods[12].temperature);
      
      var listhours = [];
      var i;
      for(i=0; i < 13; i++){
          listhours+= data.properties.periods[i].temperature + ", ";
      }
      storage.setItem("hour", listhours);
    //   getting forecast
    getForecast();
    })
    .catch(error => console.log('There was a getStationId error: ', error)) 
   } // end getStationId function
   
      // Request the Current Weather for this station 

   function getForecast() { 
    const URL= "https://api.weather.gov/gridpoints/PIH/125,87/forecast";
  // NWS User-Agent header (built above) will be the second parameter 
  fetch(URL, idHeader) 
  .then(function(response){
    if(response.ok){ 
     return response.json(); 
    } 
    throw new ERROR('Response not OK.');
  })
  .then(function (data) { 
    // Let's see what we got back
    console.log('From getForecast function:'); 
    console.log(data);

     // Store Forecast
storage.setItem("high",data.properties.periods[0].temperature); 
storage.setItem("low",data.properties.periods[1].temperature); 
   
})
     
.catch(error => console.log('There was a getForecast error: ', error))
} // end getStationId function