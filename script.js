// Fetch the pets data from the JSON file
fetch('adoptme_pets.json')
    .then(response => response.json())
    .then(pets => {
        // Display pets in the grid
        displayPetGrid(pets);
    })
    .catch(error => console.log('Error fetching pets:', error));

// Function to display pets in the grid
function displayPetGrid(pets) {
    const petGrid = document.getElementById('pet-grid');
    petGrid.innerHTML = ''; // Clear any previous pets
    pets.forEach(pet => {
        const petDiv = document.createElement('div');
        petDiv.classList.add('pet-image');
        petDiv.innerHTML = `
            <img src="${pet.img}" alt="${pet.name}" data-id="${pet.id}" />
            <p>${pet.name}</p>
            <p><strong>Base Value:</strong> $${pet.base_value}</p>
        `;
        petGrid.appendChild(petDiv);

        // Add click listener to select a pet
        petDiv.querySelector('img').addEventListener('click', () => selectPet(pet));
    });
}

// Function to handle pet selection
let selectedPet = null;
function selectPet(pet) {
    selectedPet = pet;
    showModifiers(pet);
}

// Function to show the available modifiers and their values
function showModifiers(pet) {
    const modifiersContainer = document.getElementById('modifiers-container');
    modifiersContainer.innerHTML = `
        <p><strong>Modifiers for ${pet.name}:</strong></p>
        <button id="fly">Fly (+$${pet.fly_value})</button>
        <button id="ride">Ride (+$${pet.ride_value})</button>
        <button id="neon">Neon (+$${pet.neon_value})</button>
        <button id="mega">Mega (+$${pet.mega_value})</button>
        <p><strong>Total Value: $<span id="total-value">${pet.base_value}</span></strong></p>
    `;

    // Add event listeners for each modifier button
    document.getElementById('fly').addEventListener('click', () => updateTotalValue(pet, 'fly'));
    document.getElementById('ride').addEventListener('click', () => updateTotalValue(pet, 'ride'));
    document.getElementById('neon').addEventListener('click', () => updateTotalValue(pet, 'neon'));
    document.getElementById('mega').addEventListener('click', () => updateTotalValue(pet, 'mega'));
}

// Function to update the total value based on selected modifiers
function updateTotalValue(pet, modifier) {
    let totalValue = pet.base_value;

    if (modifier === 'fly') totalValue += pet.fly_value;
    if (modifier === 'ride') totalValue += pet.ride_value;
    if (modifier === 'neon') totalValue += pet.neon_value;
    if (modifier === 'mega') totalValue += pet.mega_value;

    // Update the total value displayed on the page
    document.getElementById('total-value').textContent = totalValue;
}
// Assume petsData is from items.js
function createPetCard(pet) {
    const card = document.createElement('div');
    card.classList.add('pet-option');

    const name = document.createElement('div');
    name.className = 'pet-name';
    name.textContent = pet.name;

    const value = document.createElement('div');
    value.className = 'pet-value';
    value.textContent = `Base Value: $${pet.baseValue}`;

    card.appendChild(name);
    card.appendChild(value);

    // Add click event
    card.addEventListener('click', () => {
        addPetToOffer(pet); // You define this
        closePetMenu();     // Optional
    });

    return card;
}

function populatePetGrid() {
    const petGrid = document.getElementById('pet-grid');
    petGrid.innerHTML = '';

    petsData.forEach(pet => {
        const petCard = createPetCard(pet);
        petGrid.appendChild(petCard);
    });
}

// Call this on open
document.getElementById('add-pet-btn').addEventListener('click', () => {
    document.getElementById('pet-selection-menu').classList.remove('hidden');
    populatePetGrid();
});
