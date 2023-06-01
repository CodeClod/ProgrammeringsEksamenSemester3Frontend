console.log("appointmentForm")

const urlCreateSejlbåd = 'http://localhost:8080/createSejlbåd';
const urlGetBoats = 'http://localhost:8080/sejlbåde';

document.addEventListener('DOMContentLoaded', createFormEventListener);
let sejlbådCreateForm;

function createFormEventListener(){
    sejlbådCreateForm = document.getElementById("sejlbådForm");
    sejlbådCreateForm.addEventListener("submit", handleFormSubmit);
}
async function handleFormSubmit(event) {
    //Vi handler submitten her i stedet ofr default html behaviour
    event.preventDefault();
    const formData = new FormData(sejlbådCreateForm);
    console.log(formData);
    const jsonToPost = convertFormDataToJson(formData)
    console.log(jsonToPost)
    try {
        const responseData = await postFormDataAsJson(urlCreateSejlbåd, jsonToPost);
        console.log(responseData)

    } catch (error) {
        alert(error.message);
        console.error(error);
    }
    fetchBoats();
}

function convertFormDataToJson(formData) {
    // Laver formData fra sejlbåd-form til JSON
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    console.log(formDataJsonString);
    return formDataJsonString
}

async function postFormDataAsJson(url, jsonToSend) {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonToSend,
    };
    console.log("kald url=" + url)
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response.json();
}

// Update boat function
async function updateBoat(updatedBoat) {
    const urlUpdateBoat = `http://localhost:8080/sejlbåd/${updatedBoat.sejlbådId}`;
    const fetchOptions = {
        method: 'PUT', // Use the appropriate HTTP method for updating data (PUT, PATCH, etc.)
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedBoat)
    };

    try {
        const response = await fetch(urlUpdateBoat, fetchOptions);
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        console.log('Boat updated successfully');
    } catch (error) {
        alert('Error updating boat: ' + error.message);
        console.error(error);
    }
}

// Delete Boat Function
async function deleteBoat(boatId) {
    const urlDeleteBoat = `http://localhost:8080/sejlbåd/${boatId}`;

    const fetchOptions = {
        method: 'DELETE'
    };

    try {
        const response = await fetch(urlDeleteBoat, fetchOptions);
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        console.log('Boat deleted successfully');
    } catch (error) {
        alert('Error deleting boat: ' + error.message);
        console.error(error);
    }
}

/// Fill table with Boats

const urlGetProducts = 'http://localhost:8080/sejlbåde'
const bådTable = document.getElementById('bådTable')

async function createBoatTable(boat) {
    const row = document.createElement('tr');
    // Non-changeable idCell for entity (We don't change the id of the entity, because well... new entities/boats get new id automatically)
    const idCell = document.createElement('td');
    idCell.textContent = boat.sejlbådId;
    idCell.value = boat.sejlbådId;
    row.appendChild(idCell);
    // Name in text input form
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = boat.navn;
    row.insertCell().appendChild(nameInput);
    // Dropdown select with the 3 boat-type options
    const typeSelect = document.createElement('select');
    const option1 = document.createElement('option');
    option1.value = 'Længere end 40fod';
    option1.textContent = 'Længere end 40fod';
    typeSelect.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = 'Mellem 25-40fod';
    option2.textContent = 'Mellem 25-40fod';
    typeSelect.appendChild(option2);

    const option3 = document.createElement('option');
    option3.value = 'Mindre end 25fod';
    option3.textContent = 'Mindre end 25fod';
    typeSelect.appendChild(option3);

    typeSelect.value = boat.bådtype;
    row.insertCell().appendChild(typeSelect);

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Opdater';
    updateButton.className = 'buttonupdate';
    updateButton.addEventListener('click', async function() {
        const updatedBoat = {
            sejlbådId: idCell.value,
            navn: nameInput.value,
            bådtype: typeSelect.value
        };
        await updateBoat(updatedBoat);
        fetchBoats(); // Refresh the table after updating the boat
    });
    row.insertCell().appendChild(updateButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Slet';
    deleteButton.className = 'buttondelete';
    deleteButton.addEventListener('click', async function() {
        const confirmation = confirm('Er du sikker på, at du vil slette denne båd?');
        if (confirmation) {
            await deleteBoat(boat.sejlbådId);
            fetchBoats(); // Refresh the table after deleting the boat
        }
    });
    row.insertCell().appendChild(deleteButton);

    bådTable.appendChild(row);
}

let lstBoats = []
async function fetchBoats() {
    lstBoats = await fetchAny(urlGetBoats);
    bådTable.innerHTML = '';
    lstBoats.forEach(createBoatTable);
}

function printBoat(boatid, boat) {
    console.log(boatid)
    console.log(boat)
}

fetchBoats();







