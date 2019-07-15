// JS file
navigation();
function navigation(){
    let names =[];

    
    const URL = "https://LystraZibiah.github.io/acme/js/acme.json";
    fetch(URL)
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('Json object from acme.json function:'); 
      console.log(data);
names=Object.keys(data);
console.log(names);
let stuff ="<li><a href= '#'>Home</a></li>";
for(i=0;i<names.length; i++){
  stuff+="<li><a href= '#'>" +names[i]+ "</a></li>";
}
console.log(stuff);
document.getElementById("content").innerHTML=stuff;
    }) 

    .catch(error => console.log('There was a acme.json error: ', error)) 
   } // end acme.jason function
   let links= document.getElementById("content");
  
  links.addEventListener('click', function(evt) {
 
    // Get navigation
   let navname = evt.target. innerHTML;
   let homepage= document.getElementById('home');
  let product = document.getElementById('product');
   switch (navname) {
     case"Home":
      homepage.setAttribute('class', ''); // removes the hide class
        product.setAttribute('class', 'hide'); // hides the status container
      break;
      default:
          const URL = "https://LystraZibiah.github.io/acme/js/acme.json";
          fetch(URL)
          .then(function(response){
            if(response.ok){ 
             return response.json(); 
            } 
            throw new ERROR('Response not OK.');
          })
          .then(function (data) { 
            // Let's see what we got back
            console.log('Json object from acme.json function:'); 
            console.log(data);
            let a =data[navname];
           
            let title = a.name;
            console.log(title);
            let p = a.path;
            console.log(p);
            let des= a.description;
            console.log(des);
            let man= a.manufacturer;
            console.log(man);
            let pr= a.price
            console.log(pr);
            let re =a.reviews;
            console.log(pr);

            document.getElementById('categoryN').innerHTML= title;
            document.getElementById('categoryI').setAttribute("src", p);
            document.getElementById('description').innerHTML=des;
            document.getElementById('made').innerHTML=man;
            document.getElementById('reviews').innerHTML=re;
            document.getElementById('price').innerHTML=pr;

     
          }) 
      
          .catch(error => console.log('There was a acme.json error: ', error)) 
          
          product.setAttribute('class', ''); // removes the hide class
          homepage.setAttribute('class', 'hide'); // hides the status container
        break;
   }
  })
