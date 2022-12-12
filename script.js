
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
    
    if (ev.target.value !== 'select') {
        getDogDetails(ev.target.value);
    }
})

async function getDogDetails(theDog) {

    const response = await fetch(`https://api.api-ninjas.com/v1/dogs?name=${theDog}`, {
        method: "GET",
        headers: 
            {'X-Api-Key': 'W4QcRkweApAznCOjcreL5Q==17fYNFns1O03uX69'},
            'Content-Type': 'application/json'
    });

    const responseObj = await response.json();
    
    if(responseObj.length !== 0) {
        const dogBreed = document.querySelector('.dog-breed');
        const breedDetails = document.querySelector('.breed-details')
        dogBreed.innerHTML = `<h1>Dog Breed: <span class="breed-name">${responseObj[0].name}</span><h1>`
        dogBreed.innerHTML += `<img src="${responseObj[0].image_link}">`
        breedDetails.innerHTML = `<h1 class="breed-details">Breed Details<h1>`
        breedDetails.appendChild(renderBreedDetails(responseObj));
    } else {
        alert('Try again, breed does not exist.');
    }
}

function renderBreedDetails(dogDetails) {

    const ul = document.createElement('ul');
    ul.setAttribute('class', 'dog-details');
    for(const key in dogDetails[0]) {
        if (key !== 'image_link' && key !== 'name') {
            const el = document.createElement('li');
            let label = key.replace(/_/g, ' ');
            label = toPascalCase(label.split(" "));
            el.innerHTML = `${label}: <span class="breed-info">${dogDetails[0][key]}</span>`;
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










