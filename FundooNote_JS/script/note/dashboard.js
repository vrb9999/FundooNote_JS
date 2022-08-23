var nav = false;
function menutoggle(){
    // let menu = document.querySelector("#menu");
    // let sidenav = document.querySelector(".side-nav");

    // sidenav.classList.toggle("active");
    
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
        },
        error: function(error){
            console.log(error);
        }
    })
}

// document.getElementById('notes').addEventListener('click', (notes)=>{
//     console.log("Note : ", notes.target);
// })

// function displayNotes(noteArray){
//     console.log("Notes list : ", noteArray);

    // document.getElementById('display').innerHTML = notesList.map((notes)=>
    // ``
    // )

//}