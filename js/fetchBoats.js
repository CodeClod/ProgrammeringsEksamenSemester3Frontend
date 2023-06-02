let lstBoats;
const urlGetBoats = 'http://localhost:8080/sejlbåde';
const sejlbådSelect = document.getElementById("sejlbådSelect")
async function fetchBoats() {
    lstBoats = await fetchAny(urlGetBoats);
    /// bådTable.innerHTML = '';
    lstBoats.forEach(fillBoatSelect);
}

function fillBoatSelect(boat) {
    const el = document.createElement("option")
    el.textContent = boat.navn
    el.value = boat // role.roleId
    sejlbådSelect.appendChild(el)
}


fetchBoats();