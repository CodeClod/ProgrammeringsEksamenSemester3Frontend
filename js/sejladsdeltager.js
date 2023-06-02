console.log("KapsejladsDeltagerForm");

const urlCreateKapsejladsDeltager = 'http://localhost:8080/kapsejladsdeltager/create';
const urlGetKapsejladsdeltagereByKapsejlads = 'http://localhost:8080/kapsejladsdeltager/getAllByKapsejlads';

document.addEventListener('DOMContentLoaded', createFormEventListener);
let kapsejladsDeltagerCreateForm;

function createFormEventListener(){
    kapsejladsDeltagerCreateForm = document.getElementById("kapsejladsDeltagerForm");
    kapsejladsDeltagerCreateForm.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
    //Vi handler submit her, i stedet for default html behaviour
    event.preventDefault();
    const form = event.currentTarget;
    const url = form.action;
    console.log(form)
    console.log(url)
    //console.log(form === formKommune)
    try {
        const formData = new FormData(form)
        console.log(formData)
        const responseData = await postFormData(url, formData)

        // når vi har oprettet sognet
        alert(formData.get('navn') + ' er oprettet');

        const homeUrl = "/index";
        window.location.replace(homeUrl); //man kan ikke gøre det her indeni en submit button
        //window.location.href = homeUrl;


    } catch (error) {
        alert(error.message)
        console.log(error)
    }

}

function convertFormDataToJson(formData) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    console.log(formDataJsonString);
    return formDataJsonString;
}

async function postFormDataAsJson(url, jsonToSend) {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonToSend,
    };
    console.log("Calling URL: " + url);
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response.json();
}

async function updateDeltager(updatedDeltager) {
    const urlUpdateDeltager = `http://localhost:8080/deltagere/${updatedDeltager.kapsejladsDeltagerId}`;
    const fetchOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedDeltager)
    };

    try {
        const response = await fetch(urlUpdateDeltager, fetchOptions);
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        console.log('Deltager updated successfully');
    } catch (error) {
        alert('Error updating deltager: ' + error.message);
        console.error(error);
    }
}

async function deleteDeltager(deltagerId) {
    const urlDeleteDeltager = `http://localhost:8080/deltagere/${deltagerId}`;

    const fetchOptions = {
        method: 'DELETE'
    };

    try {
        const response = await fetch(urlDeleteDeltager, fetchOptions);
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        console.log('Deltager deleted successfully');
    } catch (error) {
        alert('Error deleting deltager: ' + error.message);
        console.error(error);
    }
}

/*
const deltagerTable = document.getElementById('deltagerTable')

async function createDeltagerTable(deltager) {
    const row = document.createElement('tr');
    const idCell = document.createElement('td');
    idCell.textContent = deltager.kapsejladsDeltagerId;
    idCell.value = deltager.kapsejladsDeltagerId;
    row.appendChild(idCell);

    const pointsInput = document.createElement('input');
    pointsInput.type = 'text';
    pointsInput.value = deltager.points;
    row.insertCell().appendChild(pointsInput);

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Opdater';
    updateButton.className = 'buttonupdate';
    updateButton.addEventListener('click', async function() {
        const updatedDeltager = {
            kapsejladsDeltagerId: idCell.value,
            points: pointsInput.value
        };
        await updateDeltager(updatedDeltager);
        fetchDeltagere();
    });
    row.insertCell().appendChild(updateButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Slet';
    deleteButton.className = 'buttondelete';
    deleteButton.addEventListener('click', async function() {
        const confirmation = confirm('Er du sikker på, at du vil slette denne deltager?');
        if (confirmation) {
            await deleteDeltager(deltager.kapsejladsDeltagerId);
            fetchDeltagere();
        }
    });
    row.insertCell().appendChild(deleteButton);

    deltagerTable.appendChild(row);
}

let lstDeltagere = [];
async function fetchDeltagere() {
    lstDeltagere = await fetchAny(urlGetKapsejladsdeltagereByKapsejlads);
    deltagerTable.innerHTML = '';
    lstDeltagere.forEach(createDeltagerTable);
}

function printDeltager(deltagerId, deltager) {
    console.log(deltagerId);
    console.log(deltager);
}

fetchDeltagere();
*/
