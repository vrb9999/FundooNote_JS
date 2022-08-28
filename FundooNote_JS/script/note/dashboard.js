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

function trashNote(id){
    let token = localStorage.getItem('token');

    $.ajax({
        url: `https://localhost:44346/Note/Trash/${id}`,
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
    displayUpdateNote(notes);
})

function displayNote(noteList) {

    document.getElementById('display').innerHTML = noteList.map((note) =>
    `
    <div class="displayNote" id="displayNote">
    <div class="display-content" onclick="updateOpen()">
        <p id="id">id = ${note.noteId}</p>
        <p id="t">${note.title}</p>
        <p id="d">${note.description}</p>
    </div>

    <div class="display-icons">
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
                <button onclick="changeColor('red')"><img src="../../assests/red.jpg"
                        style="border-radius: 50%;width: 35px;height:35px;"></button>
                <button onclick="changeColor('green')"><img src="../../assests/green.jpg"
                        style="border-radius: 50%;width: 35px;height:35px;"></button>
                <button onclick="changeColor('yellow')"><img src="../../assests/yellow.jpg"
                        style="border-radius: 50%;width: 35px;height:35px;"></button>
                <button onclick="changeColor('blue')"><img src="../../assests/blue.jpg"
                        style="border-radius: 50%;width: 35px;height:35px;"></button>
                <button onclick="changeColor('orange')"><img src="../../assests/orange.jpg"
                        style="border-radius: 50%;width: 35px;height:35px;"></button>
            </div>
        </div>
        <button>
            <img src="../../assests/create_note/image.svg" />
        </button>
        <button id="archiveNote" onclick="archiveNote(${note.noteId})">
            <img src="../../assests/create_note/archive.svg" />
        </button>
        <div class="dropdown-more">
            <button id="more">
                <img src="../../assests/create_note/more.svg" />
            </button>
            <div id="more-list" class="dropdown-content">
                <button onclick="trashNote(${note.noteId})">Delete note</button>
                <button>Add label</button>
            </div>
        </div>
    </div>


    <div class="popup" id="popup">
        <div class="popup-content">
            <div class="u-note">
                <form id="u-form">
                    <div class="update-note-header">
                        <input class="update-note" id="u-title" type="text" placeholder="title" value="${note.title}"
                            autocomplete="off" />
                        <button id="pin">
                            <img src="../../assests/create_note/pin.svg" />
                        </button>
                    </div>
                    <div class="update-note-body">
                        <textarea class="update-note" id="u-description" type="text" placeholder="Take a note..."
                            autocomplete="off">${note.description}</textarea>
                    </div>
                    <div class="update-note-footer">
                        <div class="icons">
                            <button>
                                <img src="../../assests/create_note/remind.svg" />
                            </button>
                            <button>
                                <img src="../../assests/create_note/person.svg" />
                            </button>
                            <button>
                                <img src="../../assests/create_note/color.svg" />
                            </button>
                            <button>
                                <img src="../../assests/create_note/image.svg" />
                            </button>
                            <button>
                                <img src="../../assests/create_note/archive.svg" />
                            </button>
                            <button>
                                <img src="../../assests/create_note/more.svg" />
                            </button>
                            <button>
                                <img src="../../assests/create_note/undo.svg" />
                            </button>
                            <button>
                                <img src="../../assests/create_note/redo.svg" />
                            </button>
                        </div>
                        <div class="u-close">
                            <button onclick="updateNote(${note.noteId})">
                                Close
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </div>
</div>
`).join('');
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
            <button onclick="trashNote(${note.noteId})">
            <img src="../../assests/create_note/restore_from_trash.svg">
            </button>
        </div>
    </div>
    `
    ).join('');
}




