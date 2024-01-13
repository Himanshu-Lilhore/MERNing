let id = 3;


async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Function to update and save data to the server
async function updateAndSaveData(updatedData) {
    try {
        await fetch('http://localhost:3000/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData, null, 2),
        });
        console.log('Data updated and saved successfully');
    } catch (error) {
        console.error('Error updating and saving data:', error);
    }
}


// Example usage
async function main() {
    // Read data from the server
    const cardsData = await fetchData();

    if (cardsData) {
        console.log('Original Data:', cardsData);

        // Modify the data
        cardsData.cards.push({
            "id": id++,
            "title": titleInput,
            "content": contentInput,
            "timestamp": "2023-01-03T10:45:00Z"
        });

        console.log('Modified Data:', cardsData);

        // Save the updated data back to the server
        await updateAndSaveData(cardsData);
    }
}

// // Trigger the main function when the script loads
// document.addEventListener('DOMContentLoaded', main);




let notesContainer = document.querySelector("#notes");

let titleField = document.querySelector('#createTitle');
let contentField = document.querySelector('#createContent');
let createBtn = document.querySelector('#createBtn');

let titleInput;
let contentInput;

createBtn.addEventListener('click', () => {
    let titleEle = document.createElement('span');
    let lineEle = document.createElement('div');
    let contentEle = document.createElement('span');
    let cardEle = document.createElement('div');
    
    titleInput = titleField.value;
    contentInput = contentField.value;
    
    if(titleInput !== '')
    {
        titleEle.textContent = titleInput;
        contentEle.textContent = contentInput;

        // Storing new card data
        main();
        
        // Showing the card on screen
        titleEle.classList.add('cardTitle');
        contentEle.classList.add('cardContent');
        lineEle.classList.add('cardLine');
        cardEle.classList.add('card');
        
        cardEle.appendChild(titleEle);
        cardEle.appendChild(lineEle);
        cardEle.appendChild(contentEle);
        
        notesContainer.appendChild(cardEle);
        
        titleField.value = '';
        contentField.value = '';
        
        titleField.classList.remove('border-red-500', 'border-2');
    }
    else
    {
        titleField.classList.add('border-red-500', 'border-2');
    }
})


