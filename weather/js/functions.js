// JS file
const temp = 31;
const speed = 5;
buildWC(speed, temp);

var storage = window.localStorage;
// Set global variable for custom header required by NWS API
var idHeader = {
    headers: {
      "User-Agent": "Student Learning Project - zib15001@byui.edu"
    }
  };

 // Calculate the Windchill
 function buildWC(speed, temp) {
    const feelTemp = document.getElementById('feelTemp');
   
    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);
   
    // Round the answer down to integer
    wc = Math.floor(wc);
   
    // If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;
   
    // Display the windchill
    console.log(wc);
     wc = 'Feels like '+wc+'°F';
    feelTemp.innerHTML = wc;
    }
    
   const direction = "E"; 270;
   windDial(direction);
  
   // Wind Dial Function
function windDial(direction){6
   // Get the container
   const dial = document.getElementById("dial");
   console.log(direction);
   // Determine the dial class
   switch (direction){
    case "North":
    case "N":
     dial.setAttribute("class", "n"); //"n" is the CSS rule selector
     break;
    case "NE":
    case "NNE":
    case "ENE":
     dial.setAttribute("class", "ne");
     break;
    case "NW":
    case "NNW":
    case "WNW":
     dial.setAttribute("class", "nw");
     break;
    case "South":
    case "S":
     dial.setAttribute("class", "s");
     break;
    case "SE":
    case "SSE":
    case "ESE":
     dial.setAttribute("class", "se");
     break;
    case "SW":
    case "SSW":
    case "WSW":
     dial.setAttribute("class", "sw");
     break;
    case "East":
    case "E":
     dial.setAttribute("class", "e");
     break;
    case "West":
    case "W":
     dial.setAttribute("class", "w");
     break;
   }
  }


  let weatherconditions ="clear";
  let climate = getcondition(weatherconditions);
  console.log(climate);
// function of weatherconditions
  function getcondition(weatherconditions){
   // Get the container
   console.log(weatherconditions)
if(weatherconditions=="clear" || weatherconditions.includes("sunny") || weatherconditions.includes("nice")){
   return "clear";
}
else if(weatherconditions.includes("cloudy")||weatherconditions.includes("bluesky")||weatherconditions.includes("partly cloudy")){
   return "cloudy";
}
else if( weatherconditions.includes("rainy")||weatherconditions.includes("Thunderstorms")||weatherconditions.includes("drizzling")){
   return "rainy";
}
else if( weatherconditions.includes("snowy")||weatherconditions.includes("freezing")||weatherconditions.includes("cold")){
   return "snowy";
}
else{
return "foggy";
   }
}
changeSummaryImage(climate);
// function of image background
function changeSummaryImage(weatherconditions) {
   const box = document.getElementById("box");
   const small=document.getElementById("smallframe");
switch (weatherconditions){
   case "clear":
   box.setAttribute("class", "clear");
   small.setAttribute("class", "clear");
    break;
   case "cloudy":
   box.setAttribute("class", "clouds");
   small.setAttribute("class", "clouds");
   break;
   case "rainy":
    box.setAttribute("class", "rain");
    small.setAttribute("class", "rain");
    break;
   case "snowy":
   box.setAttribute("class", "snow");
   small.setAttribute("class", "snow");
    break;
   case "foggy":
   box.setAttribute("class", "fog");
   small.setAttribute("class", "fog");
   break;
 

}
}

const meters =1514.246 ;
convertMetersToFeet(meters);

 // Calculate the meters
 function convertMetersToFeet(meters) {
    console.log(meters);
    const feet = document.getElementById('elevation');
   
    // Compute the windchill
    let convert = meters * 3.28084;
    console.log(convert);
   
    // Round the answer down to integer
   convert = Math.floor(convert);
   // Display the windchill
    console.log(convert);
    feet.innerHTML = convert;
    }
  // Convert, Format time to 12 hour format
function format_time(hour) {

}
// Convert, Format time to 12 hour format
function format_time(hour) {
   if(hour > 23){ 
    hour -= 24; 
   } 
   let amPM = (hour > 11) ? "pm" : "am"; 
   if(hour > 12) { 
    hour -= 12; 
   } 
   if(hour == 0) { 
    hour = "12"; 
   } 
   return hour + amPM;
  }

  // Build the hourly temperature list
function buildHourlyData(nextHour,hourlyTemps) {
   // Data comes from a JavaScript object of hourly temp name - value pairs
   // Next hour should have a value between 0-23
   // The hourlyTemps variable holds an array of temperatures
   // Line 8 builds a list item showing the time for the next hour 
   // and then the first element (value in index 0) from the hourly temps array
    let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F </li>';
    // Build the remaining list items using a for loop
    for (let i = 1, x = hourlyTemps.length; i < x; i++) {
     hourlyListItems += '<li>' + format_time(nextHour+i) + ': ' + hourlyTemps[i] + '&deg;F </li>';
    }
    console.log('HourlyList is: ' +hourlyListItems);
    return hourlyListItems;
   }
   // Get the next hour based on the current time
let date = new Date(); 
let nextHour = date.getHours() + 1;

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
      // // storage.setItem("hour1",data.properties.periods[0].temperature); 
      // storage.setItem("hour2",data.properties.periods[1].temperature); 
      // storage.setItem("hour3",data.properties.periods[2].temperature); 
      // storage.setItem("hour4",data.properties.periods[3].temperature); 
      // storage.setItem("hour5",data.properties.periods[4].temperature); 
      // storage.setItem("hour6",data.properties.periods[5].temperature);
      // storage.setItem("hour7",data.properties.periods[6].temperature);
      // storage.setItem("hour8",data.properties.periods[7].temperature);
      // storage.setItem("hour9",data.properties.periods[8].temperature);
      // storage.setItem("hour10",data.properties.periods[9].temperature);
      // storage.setItem("hour11",data.properties.periods[10].temperature);
      // storage.setItem("hour12",data.properties.periods[11].temperature);
      // storage.setItem("hour13",data.properties.periods[12].temperature);
      
      var listhours = [];
      var i;
      for(i=0; i < 13; i++){
          listhours[i]= data.properties.periods[i].temperature;
      }
      storage.setItem("hour", listhours);
      
   let hour =buildHourlyData(nextHour,listhours);
   storage.setItem("time", hour);

   console.log(hour)

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
storage.setItem("speed",data.properties.periods[0].windSpeed); 
   buildPage();
})
     
.catch(error => console.log('There was a getForecast error: ', error))
} // end getStationId function

function dial(direction) {
   if(direction < 45){ 
    direction = "N"; 
   }
   
   else if (direction > 16 && direction  <= 75) {
      dicrection = "NE";
   }
   else if (direction >76  && direction <=125 ) {
      direction = "E";
   }
        
   else if (direction > 126 && direction  <= 155) {
      dicrection = "SE";
   }
   else if (direction >156  && direction <= 195) {
      direction = "S";
   }
   else if (direction >196  && direction <= 250) {
         direction = "SW";
   }
    else if (direction >251  && direction <= 280) {
            direction = "W"
      }
      else if (direction >281  && direction <= 320) {
         direction = "NW";
   }
    else {
      direction = " N"
      }
   return direction;
   }
   function convert(temprature){
 let x = temprature * 9 / 5 + 32;
 return x.toFixed(0);
   }

  
  

           




function buildPage(){
   // Task 1 - Feed data to WC, Dial, Image, Meters to feet and hourly temps functions
   convertMetersToFeet(storage.getItem('elavtion'));
   // function fro Windchill
   buildWC(storage.getItem('windspeed'),convert(storage.getItem('temprature')));
   //function for dial
   let wind = dial(Number(storage.getItem('winddirection')));
     windDial(wind);
     console.log(wind);
   let celcius = convert(storage.getItem('temprature')) + "&deg;F";
  console.log(celcius);
  document.getElementById('curTemp').innerHTML=celcius;
//   hourly data
document.getElementById('scrollbar').innerHTML=storage.getItem('time');







// ************ Display the content ******************************
let city = storage.getItem("locName");
let state = storage.getItem("locState");
let local = city + ", " +state;

    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.getElementById('title');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(local);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    // When this is done the title should look something like this:
    // Greenville, SC | The Weather Site

    // Set the Location information
    // Get the h1 to display the city location
    let contentHeading = document.getElementById('place');
    contentHeading.innerHTML = local;
    
    
   // Task 2 - Populate location information
    document.getElementById('longitude').innerHTML="Longtitude: " +Number(storage.getItem('long')).toFixed(0);
    document.getElementById('latitude').innerHTML="Latitude: " +Number(storage.getItem('lat')).toFixed(0);


   // Task 3 - Populate weather information
   
   document.getElementById('red').innerHTML= storage.getItem('high');
   
    document.getElementById('blue').innerHTML= storage.getItem('low');
   
    document.getElementById('miles').innerHTML= storage.getItem('windspeed');
   
    document.getElementById('direction').innerHTML= "Dicrection:"+ wind; 
   
    document.getElementById('gusts').innerHTML= "Gusts:"+ storage.getItem('speed');
   
   
  
    
   // Task 4 - Hide status and show main
   let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('page');

   contentContainer.setAttribute('class', ''); // removes the hide class
   statusContainer.setAttribute('class', 'hide'); // hides the status container

}

 
