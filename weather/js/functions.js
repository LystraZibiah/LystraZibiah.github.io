// JS file
const temp = 31;
const speed = 5;
buildWC(speed, temp);

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
switch (weatherconditions){
   case "clear":
   box.setAttribute("class", "clear");
   break;
   case "cloudy":
   box.setAttribute("class", "clouds");
   break;
   case "rainy":
    box.setAttribute("class", "rain");
    break;
   case "snowy":
   box.setAttribute("class", "snow");
    break;
   case "foggy":
   box.setAttribute("class", "fog");
   break;
 

}
}

const meters =1514.246 ;
convertMetersToFeet(meters);

 // Calculate the meters
 function convertMetersToFeet(meters) {
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
