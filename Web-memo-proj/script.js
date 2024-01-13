// script.js

let notes = [];

function displayNotes() {
    const notesContainer = document.getElementById('notes');

    // Check if the container exists before trying to update its content
    if (notesContainer) {
        notesContainer.innerHTML = '';

        notes.forEach(note => {
            const cardEle = document.createElement('div');
            cardEle.classList.add('card');

            const titleEle = document.createElement('h3');
            titleEle.textContent = note.title;

            const contentEle = document.createElement('p');
            contentEle.textContent = note.content;

            cardEle.appendChild(titleEle);
            cardEle.appendChild(contentEle);

            notesContainer.appendChild(cardEle);
        });
    } else {
        console.error('Notes container not found in the DOM.');
    }
}


function saveToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadFromLocalStorage() {
    const storedNotes = localStorage.getItem('notes');
    notes = storedNotes ? JSON.parse(storedNotes) : [];
}

document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    displayNotes();

    const createBtn = document.getElementById('createBtn');
    createBtn.addEventListener('click', () => {
        const titleInput = document.getElementById('createTitle').value;
        const contentInput = document.getElementById('createContent').value;

        if (titleInput) {
            const newNote = {
                title: titleInput,
                content: contentInput,
            };

            notes.push(newNote);
            saveToLocalStorage();
            displayNotes();

            // Clear input fields
            document.getElementById('createTitle').value = '';
            document.getElementById('createContent').value = '';
        } else {
            alert('Title cannot be empty!');
        }
    });
});

