
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
    const response = await fetch(`https://api.api-ninjas.com/v1/dogs?name=${theDog}`, {
        method: "GET",
        headers: {'X-Api-Key': 'W4QcRkweApAznCOjcreL5Q==17fYNFns1O03uX69'},
            'Content-Type': 'application/json'
    });

    const responseObj = await response.json();
    const dogDetails = document.querySelector('.dog-details');
    dogDetails.innerHTML = `<img src="${responseObj[0].image_link}">`
    dogDetails.innerHTML += `<h1 class="dog-name">${responseObj[0].name}<h2>`
    dogDetails.appendChild(renderDogDetails(responseObj));
}

function renderDogDetails(dogDetails) {

    const ul = document.createElement('ul');
    ul.setAttribute('class', 'test');
    for(const key in dogDetails[0]) {
        if (key !== 'image_link' && key !== 'name') {
            const el = document.createElement('li');
            let label = key.replace(/_/g, ' ');
            label = toPascalCase(label.split(" "));
            el.innerHTML = `${label}: ${dogDetails[0][key]}`;
            ul.appendChild(el);
        }
    }
    return ul;
}

function toPascalCase(label) {

    const newLabel = [];
    
    label.forEach( str => {
        newLabel.push(str.charAt(0).toUpperCase() + str.slice(1));
    })
    
    return newLabel.join(" ");
}










