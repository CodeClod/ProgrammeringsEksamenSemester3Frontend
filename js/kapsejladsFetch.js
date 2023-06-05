


const urlGetKapsejlads = 'http://localhost:8080/kapsejladsInOrder'; // Replace with the appropriate endpoint for fetching Kapsejlads entities
const kapsejladsSelect = document.getElementById('kapsejladsSelect');
const kapsejladsTableSelect = document.getElementById("kapsejladsTableSelect");

async function fetchKapsejlads() {
    try {
        const response = await fetch(urlGetKapsejlads);
        if (!response.ok) {
            throw new Error('Error fetching Kapsejlads entities');
        }
        const data = await response.json();
        data.forEach((kapsejlads) => {
            const option = document.createElement('option');
            option.value = kapsejlads.kapsejladsId;
            option.textContent = kapsejlads.navn;
            kapsejladsSelect.appendChild(option);
        });
    } catch (error) {
        console.error(error);
    }
}

async function fetchKapsejladsTable() {
    try {
        const response = await fetch(urlGetKapsejlads);
        if (!response.ok) {
            throw new Error('Error fetching KapsejladsTableSelect entities');
        }
        const data = await response.json();
        data.forEach((kapsejlads) => {
            const htmlOptionElement = document.createElement('option');
            htmlOptionElement.value = kapsejlads.kapsejladsId;
            htmlOptionElement.textContent = kapsejlads.navn;
            kapsejladsTableSelect.appendChild(htmlOptionElement);
        });
    } catch (error) {
        console.error(error);
    }
}

fetchKapsejlads();
fetchKapsejladsTable();