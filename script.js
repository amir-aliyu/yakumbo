// Function to display notifications
function displayNotification(message, type) {
    const notificationsDiv = document.getElementById('notifications');
    const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
    const alertHTML = `
      <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;

    // Append the new notification to the existing ones
    notificationsDiv.insertAdjacentHTML('beforeend', alertHTML);

    // Automatically hide each notification after 3 seconds
    const lastAlert = notificationsDiv.lastElementChild;
    setTimeout(() => {
        lastAlert.classList.remove('show');
        lastAlert.classList.add('fade');

        setTimeout(() => {
            lastAlert.remove();
        }, 1000); // Wait for fade out animation to complete
    }, 3000);
}



// Function to add a plant
document.getElementById('addPlantForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const plantName = document.getElementById('plantName').value;
    const wateringTime = document.getElementById('wateringTime').value;

    try {
        const response = await axios.post('/add-plant', {
            name: plantName,
            wateringTime: wateringTime
        });
        if (response.data.message) {
            displayNotification(response.data.message, 'success');
            document.getElementById('addPlantForm').reset();
            fetchPlants(); // Fetch and display updated plant list
        }
    } catch (error) {
        displayNotification('Error adding plant. Please try again.', 'danger');
    }
});

// Function to create delete button for a plant
function createDeleteButton(plantId) {
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-2', 'btn-delete');
    deleteBtn.textContent = 'Delete';
    deleteBtn.dataset.plantId = plantId; // Assign the plant ID to the button's dataset
    return deleteBtn;
}

// Function to delete a plant
async function deletePlant(plantId) {
    try {
        const response = await axios.delete(`/delete-plant/${plantId}`);
        if (response.data.message) {
            displayNotification(response.data.message, 'success');
            fetchPlants(); // Fetch and display updated plant list
        }
    } catch (error) {
        displayNotification('Error deleting plant. Please try again.', 'danger');
    }
}

// Function to fetch and display plants
async function fetchPlants() {
    try {
        const response = await axios.get('/get-plants');
        const plants = response.data;
        console.log('Plants:', plants);
        const plantsList = document.getElementById('plantsList');
        plantsList.innerHTML = '';

        plants.forEach((plant) => {
            const plantItem = document.createElement('li');
            plantItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            plantItem.textContent = `${plant.name} - Watering Time: ${plant.wateringTime}s`;

            const deleteBtn = createDeleteButton(plant.id); // Use the unique ID from the backend
            plantItem.appendChild(deleteBtn);

            plantsList.appendChild(plantItem);
        });
    } catch (error) {
        console.error('Error fetching plants:', error);
    }
}

// Add event listener for delete buttons
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-delete')) {
        const plantId = event.target.dataset.plantId;
        deletePlant(plantId);
    }
});

// Fetch and display plants when the page loads
window.addEventListener('load', fetchPlants);