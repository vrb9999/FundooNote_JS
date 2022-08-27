var nav = false;
function menutoggle() {
    nav ? closeNav() : openNav();
}

function openNav() {
    document.getElementById("side-nav").style.width = "250px";
    document.getElementById("display-area").style.marginLeft = "250px";
    nav = true;
}

function closeNav() {
    document.getElementById("side-nav").style.width = "85px";
    document.getElementById("display-area").style.marginLeft = "85px";
    nav = false;
}

function openCreateNote() {
    document.getElementById("form").style.height = "165px";
    document.getElementById("pin").style.visibility = "visible";
    document.getElementById("title").placeholder = "Title";
}

function closeCreateNote() {
    document.getElementById("form").style.height = "55px";
    document.getElementById("pin").style.visibility = "hidden";
    document.getElementById("title").placeholder = "Take a note ...";
}

var links = document.querySelectorAll(".nav-list-item");
links.forEach(li => {
    li.addEventListener('click', () => {
        resetLinks();
        li.classList.add("active");
    })
})
function resetLinks() {
    links.forEach(li => {
        li.classList.remove("active");
    })
}

var noteArray;
getAllNotes();
function getAllNotes() {
    let token = localStorage.getItem('token');

    $.ajax({
        url: 'https://localhost:44346/Note/GetAllNote',
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
        success: function (result) {
            console.log(result.data);
            noteArray = result.data;
            noteArray.reverse();
            noteArray = noteArray.filter((x)=>{
                return x.isArchive==false && x.isTrash==false;
            });
            noteArchive = result.data;
            noteTrash = result.data;

            displayNote(noteArray);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function createNote() {
    document.getElementById('form').addEventListener('submit', function (c) {
        c.preventDefault();
    })
    let token = localStorage.getItem('token');

    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let bgColor = 'green';

    let noteData = {
        title: title.value,
        description: description.value,
        bgcolor: bgColor
    }
    console.log(noteData);

    $.ajax({
        url: 'https://localhost:44346/Note/AddNote',
        type: 'POST',
        data: JSON.stringify(noteData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
        success: function (result) {
            console.log(result);
            resetCreateNote();
            getAllNotes();
        },
        error: function (error) {
            console.log(error);
        }
    })
}
function resetCreateNote() {
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
}

function archiveNote(id){
    let token = localStorage.getItem('token');

    $.ajax({
        url: `https://localhost:44346/Note/Archive/${id}`,
        type: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
        success: function(result){
            console.log(result);
            getAllNotes();
        },
        error: function (error) {
            console.log(error);
        }
    })
    
}

document.getElementById('notes').addEventListener('click', () => {    
    console.log(noteArray);
    displayNote(noteArray);
})

document.getElementById('archive').addEventListener('click', () => {
    noteArchive = noteArchive.filter((x)=>{
        return x.isArchive==true && x.isTrash==false;
    });
    console.log(noteArchive);
    displayArchiveNote(noteArchive);
})


document.getElementById('trash').addEventListener('click', () => {
    noteTrash=noteTrash.filter((x)=>{
        return x.isTrash===true && x.isArchive===false;
    });
    console.log(noteTrash);
    displayTrashNote(noteTrash);
})

document.getElementById('reminder').addEventListener('click', (notes) => {
    notes=noteArray.filter((x)=>{
        return x.isReminder===true;
    });
    console.log(notes);
    displayNote(notes);
})

document.getElementById('edit').addEventListener('click', (notes) => {
    notes=noteArray.filter((x)=>{
        return x.isReminder===true;
    });
    console.log(notes);
    updateNote(notes);
})

function displayNote(noteList) {

    document.getElementById('display').innerHTML = noteList.map((note) =>
        `
    <div class="displayNote">
        <div class="display-content">
            <p id = "id">id = ${note.noteId}</p>
            <p id = "t">${note.title}</p>
            <p id = "d">${note.description}</p>
            <p >isArchived = ${note.isArchive}</p>
            <p >isTrash = ${note.isTrash}</p>
        </div>
        
        <div class = "display-icons">
            <button>
                <img src="../../assests/create_note/remind.svg" />
            </button>
            <button>
                <img src="../../assests/create_note/person.svg" />
            </button>
            <div class="dropdown-color">
                <button id="color">
                    <img src="../../assests/create_note/color.svg" />
                </button>
                <div id="color-list" class="dropdown-content">
                        <p>red</p>
                        <p>blue</p>
                        <p>green</p>
                </div>
            </div>
            <button>
                <img src="../../assests/create_note/image.svg" />
            </button>
            <button  id="archiveNote" onclick="archiveNote(${note.noteId})">
                <img src="../../assests/create_note/archive.svg"/>
            </button>
            <button>
                <img src="../../assests/create_note/more.svg"/>
            </button>
        </div>
    </div>
    `
    ).join('');
}

function displayArchiveNote(noteList) {

    document.getElementById('display').innerHTML = noteList.map((note) =>
        `
    <div class="displayNote">
        <div class="display-content">
            <p id = "id">id = ${note.noteId}</p>
            <p id = "t">${note.title}</p>
            <p id = "d">${note.description}</p>
        </div>
        
        <div class = "display-icons">
            <button>
                <img src="../../assests/create_note/remind.svg" />
            </button>
            <button>
                <img src="../../assests/create_note/person.svg" />
            </button>
            <button id="color">
                <img src="../../assests/create_note/color.svg" />
            </button>
            <button>
                <img src="../../assests/create_note/image.svg" />
            </button>
            <button id="archiveNote" onclick="archiveNote(${note.noteId})">
                <img src="../../assests/create_note/unarchive.svg"/>
            </button>
            <button>
                <img src="../../assests/create_note/more.svg"/>
            </button>
        </div>
    </div>
    `
    ).join('');
}

function displayTrashNote(noteList) {

    document.getElementById('display').innerHTML = noteList.map((note) =>
        `
    <div class="displayTrashNote">
        <div class="display-content">
        <p>${note.noteId}</p>
            <p id = "t">${note.title}</p>
            <p id = "d">${note.description}</p>
        </div>
        
        <div class = "display-icons">
            <button>
            <img src="../../assests/create_note/delete_forever.svg">
            </button>
            <button>
            <img src="../../assests/create_note/restore_from_trash.svg">
            </button>
        </div>
    </div>
    `
    ).join('');
}




