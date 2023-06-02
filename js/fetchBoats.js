let lstBoats;
const urlGetBoats = 'http://localhost:8080/sejlbåde';
const sejlbådSelect = document.getElementById("sejlbådSelect")
async function fetchBoats() {
    lstBoats = await fetchAny(urlGetBoats);
    /// bådTable.innerHTML = '';
    lstBoats.forEach(fillBoatSelect);
}

function fillBoatSelect(boat) {
    const el = document.createElement("option");
    el.textContent = boat.navn;
    el.value = boat.sejlbådId; // Set the sejlbådId as the value
    el.dataset.boat = JSON.stringify(boat); // Store the boat object as a data attribute
    sejlbådSelect.appendChild(el);
}


fetchBoats();