let db;
let SQL;


document.addEventListener('DOMContentLoaded', () => {
    const script = document.createElement('script');
    script.src = 'sql-wasm.js';
    SQL = window.SQL;
    db = new SQL.Database();

    script.onload = function () {
        console.log('SQL.js loaded:', SQL);

        // Check if SQL object is available
        if (typeof SQL !== 'undefined') {
            // SQL.js is available, create a new database
            const db = new SQL.Database();
            console.log('Database created:', db);


            // Your other code that relies on the SQL object
            // Create 'cards' table
            const createTableQuery = `
            CREATE TABLE IF NOT EXISTS cards (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                content TEXT DEFAULT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
            `;
            db.run(createTableQuery);
            
            let qq = 'INSERT INTO cards (title, content) VALUES (\'him\', \'shu\')';


            // Select all messages
            const selectAllQuery = 'SELECT * FROM cards';
            const result = db.exec(selectAllQuery);
            const messages = result[0].values;
            console.log('All cards:', messages);    


        } else {
            console.error('Error: SQL.js not available.');
        }
    };

    script.onerror = function () {
        console.error('Error loading SQL.js.');
    };

    document.head.appendChild(script);
});






// const SQL = window.SQL;
// const db = new SQL.Database();






let notesContainer = document.querySelector("#notes");

let titleField = document.querySelector('#createTitle');
let contentField = document.querySelector('#createContent');
let createBtn = document.querySelector('#createBtn');

createBtn.addEventListener('click', () => {
    let titleEle = document.createElement('span');
    let lineEle = document.createElement('div');
    let contentEle = document.createElement('span');
    let cardEle = document.createElement('div');
    
    let titleInput = titleField.value;
    let contentInput = contentField.value;
    
    if(titleInput !== '')
    {
        titleEle.textContent = titleInput;
        contentEle.textContent = contentInput;

        // Inserting a card into DB
        const insertQ = 'INSERT INTO cards (title, content) VALUES (?, ?)';
        db.run(insertQ, [titleInput, contentInput]);
        
        const selectAllQuery = 'SELECT * FROM cards';
        const result = db.exec(selectAllQuery);
        const allCards = result[0].values;
        console.log('All records:', allCards);

        
        // Showing the card on UI
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





// Select all cards
// const selectAllQuery = 'SELECT * FROM cards';
// const result = db.exec(selectAllQuery);
// const allCards = result[0].values;
// console.log('All records:', allCards);











// Function to fetch JSON data from a file
async function fetchData() {
    try {
        const response = await fetch('cards.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Function to update and save data to the JSON file
async function updateAndSaveData(updatedData) {
    try {
        await fetch('data.json', {
            method: 'POST', // Use POST instead of PUT
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


// // Example usage
async function main() {
    // Read data from the external JSON file
    const cardsData = await fetchData();

    if (cardsData) {

        // Modify the data
        cardsData.cards.push({
            "id": id++,
            "title": titleInput,
            "content": contentInput,
            "timestamp": "2023-01-03T10:45:00Z"
        });

        console.log('Modified Data:', cardsData);

        // Save the updated data back to the external JSON file
        await updateAndSaveData(cardsData);
    }
}

// main();