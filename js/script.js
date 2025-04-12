const poemForm = document.getElementById('submitPoem');
const poemTitleInput = document.getElementById('poemTitle');
const poemTextInput = document.getElementById('poemText');
const openNotebookBtn = document.getElementById('openNotebook');
const pageWrapper = document.getElementById('pageWrapper');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const saveWholeBookBtn = document.getElementById('saveWholeBook');

// Modals
const viewModal = document.getElementById('viewModal');
const editModal = document.getElementById('editModal');
const viewClose = document.getElementById('viewClose');
const editClose = document.getElementById('editClose');
const saveEditedPoem = document.getElementById('saveEditedPoem');

let currentPage = 0;
let currentEditIndex = -1;

function savePoem(title, text) {
    let poems = JSON.parse(localStorage.getItem('poems')) || [];
    poems.push({ title, text });
    localStorage.setItem('poems', JSON.stringify(poems));
}

function displaySavedPoems() {
    let poems = JSON.parse(localStorage.getItem('poems')) || [];
    pageWrapper.innerHTML = ''; // Clear the previous content

    for (let i = currentPage * 2; i < currentPage * 2 + 2 && i < poems.length; i++) {
        const poemDiv = document.createElement('div');
        poemDiv.classList.add('page');
        
        // Creating the HTML structure for the poem with a line break between title and text
        poemDiv.innerHTML = `
            <h3>${poems[i].title}</h3>
            <hr>  <!-- Line break between title and poem -->

            <pre>${poems[i].text}</pre> <!-- Use <pre> to preserve whitespace and line breaks -->
            <div class="action-buttons">
                <button onclick="viewPoem(${i})">View</button>
                <button onclick="editPoem(${i})">Edit</button>
                <button onclick="deletePoem(${i})">Delete</button>
                <button onclick="savePoemAsPDF(${i})">Save as PDF</button> <!-- Save as PDF Button -->
            </div>
        `;
        pageWrapper.appendChild(poemDiv);
    }

    prevPageBtn.disabled = currentPage === 0;
    nextPageBtn.disabled = (currentPage + 1) * 2 >= poems.length;
}

function viewPoem(index) {
    let poems = JSON.parse(localStorage.getItem('poems')) || [];
    document.getElementById('viewTitle').innerText = poems[index].title;
    document.getElementById('viewPoemText').innerText = poems[index].text;
    viewModal.style.display = 'block';
}

function editPoem(index) {
    let poems = JSON.parse(localStorage.getItem('poems')) || [];
    currentEditIndex = index;
    document.getElementById('editTitle').value = poems[index].title;
    document.getElementById('editText').value = poems[index].text;
    editModal.style.display = 'block';
}

function deletePoem(index) {
    let poems = JSON.parse(localStorage.getItem('poems')) || [];
    poems.splice(index, 1);
    localStorage.setItem('poems', JSON.stringify(poems));
    displaySavedPoems();
}

function saveEditedPoemHandler() {
    let poems = JSON.parse(localStorage.getItem('poems')) || [];
    const updatedTitle = document.getElementById('editTitle').value;
    const updatedText = document.getElementById('editText').value;
    poems[currentEditIndex] = { title: updatedTitle, text: updatedText };
    localStorage.setItem('poems', JSON.stringify(poems));
    displaySavedPoems();
    editModal.style.display = 'none';
}

document.getElementById('submitPoem').addEventListener('click', () => {
    const title = poemTitleInput.value;
    const text = poemTextInput.value;
    if (title && text) {
        savePoem(title, text);
        displaySavedPoems();
        poemTitleInput.value = '';
        poemTextInput.value = '';
    }
});

viewClose.addEventListener('click', () => {
    viewModal.style.display = 'none';
});

editClose.addEventListener('click', () => {
    editModal.style.display = 'none';
});

saveEditedPoem.addEventListener('click', saveEditedPoemHandler);

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        displaySavedPoems();
    }
});

nextPageBtn.addEventListener('click', () => {
    currentPage++;
    displaySavedPoems();
});

openNotebookBtn.addEventListener('click', () => {
    document.getElementById('notebook').classList.toggle('show');
    displaySavedPoems();
});

saveWholeBookBtn.addEventListener('click', saveWholeBookAsPDF);

// Add jsPDF for saving individual poem and whole book
function savePoemAsPDF(index) {
    let poems = JSON.parse(localStorage.getItem('poems')) || [];
    let poem = poems[index];
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add title and poem with a line break
    doc.text(poem.title, 10, 10);
    doc.text("\n", 10, 20); // Adds a line break between title and poem
    doc.text(poem.text, 10, 30);

    doc.save(`${poem.title}.pdf`);
}

function saveWholeBookAsPDF() {
    let poems = JSON.parse(localStorage.getItem('poems')) || [];
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    poems.forEach((poem, index) => {
        if (index > 0) doc.addPage();
        doc.text(poem.title, 10, 10);
        doc.text(poem.text, 10, 20);
    });

    doc.save('poem_book.pdf');
}
