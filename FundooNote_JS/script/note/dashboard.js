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
            displayNote(noteArray);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

document.getElementById('notes').addEventListener('click', (notes) => {
    notes=noteArray.filter((x)=>{
        return x.isTrash===false && x.isArchive===false;
    });
    console.log(notes);
    displayNote(notes);
})

document.getElementById('archive').addEventListener('click', (notes) => {
    notes=noteArray.filter((x)=>{
        return x.isTrash===false && x.isArchive===true;
    });
    console.log(notes);
    displayNote(notes);
})

document.getElementById('trash').addEventListener('click', (notes) => {
    notes=noteArray.filter((x)=>{
        return x.isTrash===true && x.isArchive===false;
    });
    console.log(notes);
    displayNote(notes);
})

function displayNote(noteList) {

    document.getElementById('display').innerHTML = noteList.map((note) =>
        `
    <div class="displayNote">
        <div class="display-content">
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
            <button>
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

