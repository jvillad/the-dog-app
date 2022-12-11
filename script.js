
const dogNames = document.querySelector('#dog-names');

async function init () {

    // api call to get all the dog breeds
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    
    const responseObj = await response.json();
 
    const listOfDogs = Object.keys(responseObj.message);
    
    populateOption(listOfDogs);
}

function populateOption(dogs) {

    dogs.forEach( dog => {
        dogNames.innerHTML += `<option value="${dog}">${dog}</option>`
    });

}

init();

dogNames.addEventListener('change', (ev) => {
    
    getDogDetails(ev.target.value);

})

async function getDogDetails(theDog) {

    // const resp = await fetch ()

    const response = await fetch(`https://api.api-ninjas.com/v1/dogs?name=${theDog}`, {
        method: "GET",
        headers: {'X-Api-Key': 'W4QcRkweApAznCOjcreL5Q==17fYNFns1O03uX69'},
            'Content-Type': 'application/json'
    });

    const responseObj = await response.json();
    const dogDetails = document.querySelector('.dog-details');
    // const keys = Object.keys(responseObj[0])
    console.log(Object.keys(responseObj[0]));

    dogDetails.innerHTML = `<img src="${responseObj[0].image_link}">`
    
    for(const item in responseObj[0]) {
        
    }
    
       
}

function renderDogDetails(dogDetails) {

}










