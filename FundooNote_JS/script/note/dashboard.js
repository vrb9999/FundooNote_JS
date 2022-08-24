var nav = false;
function menutoggle(){    
    nav ? closeNav() : openNav();
}

function openNav(){
    document.getElementById("side-nav").style.width = "250px";
    document.getElementById("display-area").style.marginLeft = "250px";
    nav = true;
}

function closeNav(){
    document.getElementById("side-nav").style.width = "85px";
    document.getElementById("display-area").style.marginLeft = "85px";
    nav = false;
}

function openCreateNote(){
    document.getElementById("form").style.height="165px";
    document.getElementById("pin").style.visibility="visible";
}

function closeCreateNote(){
    document.getElementById("form").style.height="55px";
    document.getElementById("pin").style.visibility="hidden";
}


function createNote(){
    document.getElementById('form').addEventListener('submit', function(c){
        c.preventDefault();
    })
    let token = localStorage.getItem('token');

    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let bgColor = 'green';

    let noteData = {
        title:title.value,
        description:description.value,
        bgcolor:bgColor
    }
    console.log(noteData);

    $.ajax({
        url:'https://localhost:44346/Note/AddNote',
        type:'POST',
        data:JSON.stringify(noteData),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': "Bearer " +token
        },
        success: function(result){
            console.log(result);
            resetCreateNote();
        },
        error: function(error){
            console.log(error);
        }
    })
}

function resetCreateNote(){
    document.getElementById('title').value="";
    document.getElementById('description').value="";
}


var noteArray;

getAllNotes();
function getAllNotes(){
    let token = localStorage.getItem('token');

    $.ajax({
        url:'https://localhost:44346/Note/GetAllNote',
        type:'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': "Bearer " +token
        },
        success: function(result){
            console.log(result.data);
            noteArray = result.data;
            noteArray.reverse();
        },
        error: function(error){
            console.log(error);
        }
    })
}

document.getElementById('notes').addEventListener('click', (notes)=>{
    console.log("Notes : ",notes.target);
    getArray = noteArray.filter((filterNote)=>{
        return filterNote.isArchive==false && filterNote.isTrash==false;
    })
    console.log("Notes : ", getArray);
})