


let pageNav = document.getElementById('links');
let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('page');

pageNav.addEventListener('click',function(evt){
 
  // Get the city name 
 let CityName = evt.target. innerHTML;
 switch (cityName) {
   case "Franklin":
      case"Greenville":
      case "Springfield":
        evt.preventDefault();
      break;
 }

let weatherURL = "https://LystraZibiah.github.io/weather/weather.json";
//fetchData(weatherURL);
//function fetchData(weatherURL){
  //let cityName = 'Greenville'; // The data we want from the weather.json file
  fetch(weatherURL)
  .then(function(response) {
  if(response.ok){
  return response.json();
  }
  throw new ERROR('Network response was not OK.');
  })
  .then(function(data){
    // Check the data object that was retrieved
    console.log(data);
    // data is the full JavaScript object, but we only want the greenville part
    // shorten the variable and focus only on the data we want to reduce typing
    let g = data[cityName];

    // ************ Get the content ******************************

    // Get the location data
    let locName = g.City;
    let locState = g.State;
    let elevation = g.Elevation;
    let longitude= g.Longitude;
    let latitude= g.Latitude;
    let zip =g.Zip;
    console.log(zip);
    // Put them together
    let fullName = locName+', '+locState;
    // See if it worked
    console.log('fullName is: '+fullName);

    // Get the temperature data
        let high =g.High;
        let low =g.Low;
        let temp =g.Temp;
        let precip=g.Precip;
        console.log(temp);
    // Get the wind data 
    let wind =g.Wind;
    let direction= g.Direction;
    let gusts =g.Gusts;
    console.log(wind);

    // Get the current conditions

let cur = g.Summary;
    // Get the hourly data 
    let hour = g.Hourly;
    console.log(hour);

    // ************ Display the content ******************************
    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.getElementById('title');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(fullName);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    // When this is done the title should look something like this:
    // Greenville, SC | The Weather Site

    // Set the Location information
    // Get the h1 to display the city location
    let contentHeading = document.getElementById('place');
    contentHeading.innerHTML = fullName;
    convertMetersToFeet(elevation);
    document.getElementById("longitude").innerHTML= "Longitude : " + longitude;
    document.getElementById("latitude").innerHTML="Latitude : " + latitude;
    document.getElementById("zip").innerHTML="Zip :" + zip;

    
    // The h1 in main h1 should now say "Greenville, SC"

    // Set the temperature information
    document.getElementById("curTemp").innerHTML= temp;
    buildWC(wind,temp);
    document.getElementById("direction").innerHTML=direction;
    document.getElementById("gusts").innerHTML=gusts;
   


    // Set the wind information

    document.getElementById("miles").innerHTML= wind;
    windDial(direction);
    // Set the current conditions information

document.getElementById("summary").innerHTML=cur;
let climate = getcondition(cur);
 changeSummaryImage(climate);
    // Set the hourly temperature information
    
    document.getElementById("scrollbar").innerHTML=buildHourlyData(nextHour,hour);

    // Change the status of the containers
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusContainer.innerHTML = 'Sorry, the data could not be processed.';
  })

//}...ends function
})