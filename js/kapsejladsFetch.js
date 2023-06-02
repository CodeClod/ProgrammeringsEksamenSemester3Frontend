


const urlGetKapsejlads = 'http://localhost:8080/kapsejladsInOrder'; // Replace with the appropriate endpoint for fetching Kapsejlads entities
const kapsejladsSelect = document.getElementById('kapsejladsSelect');

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
            option.textContent = kapsejlads.navn; // Replace with the appropriate property for displaying the Kapsejlads name
            kapsejladsSelect.appendChild(option);
        });
    } catch (error) {
        console.error(error);
    }
}

fetchKapsejlads();