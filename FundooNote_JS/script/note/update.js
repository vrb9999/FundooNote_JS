function updateNote(noteList) {
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
                <button id="color-picker" onclick="changeColor('red')"><img src="../../assests/red.jpg" style="border-radius: 50%;width: 35px;height:35px;"></button>
                <button id="color-picker" onclick="changeColor('green')"><img src="../../assests/green.jpg" style="border-radius: 50%;width: 35px;height:35px;"></button>
                <button id="color-picker" onclick="changeColor('yellow')"><img src="../../assests/yellow.jpg" style="border-radius: 50%;width: 35px;height:35px;"></button>
            </div>
        </div>
        <button>
            <img src="../../assests/create_note/image.svg" />
        </button>
        <button id="archiveNote">
            <img src="../../assests/create_note/archive.svg" />
        </button>
        <button>
            <img src="../../assests/create_note/more.svg" />
        </button>
    </div>


    <div class="popup" id="popup">
        <div class="popup-content">
        <div class="u-note">
        <form id="u-form">
            <div class="u-create-note-header">
                <input class="u-create-note" id="title" type="text" placeholder="title" value="${note.title}"
                    autocomplete="off"/>
                <button id="pin">
                    <img src="../../assests/create_note/pin.svg" />
                </button>
            </div>
            <div class="u-create-note-body">
                <textarea class="u-create-note" id="description" type="text" placeholder="Take a note..."
                    autocomplete="off">${note.description}</textarea>
            </div>
            <div class="u-create-note-footer">
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
                    <button onclick="updateClose()">
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

function changeColor(notebg){
    document.getElementById("displayNote").style.background = notebg;
}
