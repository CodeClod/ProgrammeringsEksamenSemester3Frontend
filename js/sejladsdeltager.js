console.log("KapsejladsDeltagerForm");

const urlCreateKapsejladsDeltager = 'http://localhost:8080/kapsejladsdeltager/create';


document.addEventListener('DOMContentLoaded', createFormEventListener);
document.addEventListener('DOMContentLoaded', loadKapsejladsDeltagers);
let kapsejladsDeltagerCreateForm;

function createFormEventListener(){
    kapsejladsDeltagerCreateForm = document.getElementById("kapsejladsDeltagerForm");
    kapsejladsDeltagerCreateForm.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
    //Vi handler submit her, i stedet for default html behaviour
    event.preventDefault();
    const form = event.currentTarget;
    const url = urlCreateKapsejladsDeltager;
    console.log(form)
    console.log(url)

    try {
        const formData = new FormData(form)
        console.log(formData)
        const responseData = await postFormData(url, formData)
        console.log(responseData);
        alert("Sejlbåd tilføjet til kapsejlads");

    } catch (error) {
        alert(error.message)
        console.log(error)
    }
}

async function postFormData(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries())
    const currentlySelectedBoat = sejlbådSelect.selectedIndex;
    const linje = sejlbådSelect[currentlySelectedBoat]
    plainFormData.sejlbåd = linje.value
    console.log(plainFormData)
    const formDataJsonString = JSON.stringify(plainFormData)
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: formDataJsonString
    }
    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }
    return response.json();
}
function loadKapsejladsDeltagers() {
    var kapsejladsId = document.getElementById("kapsejladsTableSelect").value;

    fetch("http://localhost:8080/kapsejladsdeltager/getAllByKapsejladsId/" + kapsejladsId)
        .then(response => response.json())
        .then(data => {
            var table = document.getElementById("kapsejladsDeltagerTable");
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            // Populate the table with the fetched KapsejladsDeltagers
            data.forEach(kapsejladsDeltager => {
                var row = table.insertRow();
                row.insertCell().textContent = kapsejladsDeltager.sejlbåd.navn;
                row.insertCell().textContent = kapsejladsDeltager.points;
                row.insertCell().textContent = kapsejladsDeltager.placering;
                // Add more cells as needed for additional columns
            });
        })
        .catch(error => console.error('Error:', error));
}

const kapsejlsDeltagerList = document.getElementById("kapsejladsTableSelect");

kapsejlsDeltagerList.addEventListener(onchange, loadKapsejladsDeltagers);
