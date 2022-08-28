function updateNote(id) {
    document.getElementById('u-form').addEventListener('submit', function (c) {
        c.preventDefault();
    })
    let token = localStorage.getItem('token');

    let u_title = document.getElementById("u-title");
    let u_description = document.getElementById("u-description");
    let bgColor = 'green';
    let updateData = {
        title: u_title.value,
        description: u_description.value,
        bgcolor: bgColor
    }
    console.log(updateData);

    $.ajax({
        url: `https://localhost:44346/Note/UpdateNote/${id}`,
        type: 'PUT',
        data: JSON.stringify(updateData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
        success: function (result) {
            console.log(result);
            getAllNotes();
        },
        error: function (error) {
            console.log(error);
        }
    })

}


function displayUpdateNote(noteList) {

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
                <button onclick="changeColor('red')"><img src="../../assests/red.jpg" style="border-radius: 50%;width: 35px;height:35px;"></button>
                <button onclick="changeColor('green')"><img src="../../assests/green.jpg" style="border-radius: 50%;width: 35px;height:35px;"></button>
                <button onclick="changeColor('yellow')"><img src="../../assests/yellow.jpg" style="border-radius: 50%;width: 35px;height:35px;"></button>
                <button onclick="changeColor('blue')"><img src="../../assests/blue.jpg" style="border-radius: 50%;width: 35px;height:35px;"></button>
                <button onclick="changeColor('orange')"><img src="../../assests/orange.jpg" style="border-radius: 50%;width: 35px;height:35px;"></button>
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
                    autocomplete="off"/>
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
        `
    ).join('');
}


function updateOpen() {
    document.getElementById("popup").classList.add("visible");
}

function updateClose() {
    document.getElementById("popup").style.visibility = "hidden";
}

function changeColor(notebg) {
    document.getElementById("displayNote").style.background = notebg;
}
