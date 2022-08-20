function show() {
    var pwd = document.getElementById("pwd");
    var cpwd = document.getElementById("cpwd");
    if (pwd.type === "password" && cpwd.type === "password") {
        pwd.type = "text";
        cpwd.type = "text";
    }
    else {
        pwd.type = "password";
        cpwd.type = "password";
    }
}


function validate() {
    document.getElementById("form").addEventListener("submit", function (r) {
        r.preventDefault();

        let fname = document.getElementById("fname");
        let lname = document.getElementById("lname");
        let email = document.getElementById("user");
        let pwd = document.getElementById("pwd");
        let cpwd = document.getElementById("cpwd");

        // if (fname.value.trim() === "") {
        //     onError(fname, "Enter Name");
        // } else {
        //     if (!validateName(fname.value.trim())) {
        //         onError(fname, "Please enter atleast 3 character with first letter capital");
        //     } else {
        //         onSuccess(fname);
        //     }
        // }
        if (fname.value.trim() === "") {
            onError(fname, "Enter Name");
        } else if(!validateName(fname.value.trim())){        
                onError(fname, "Please enter atleast 3 character with first letter capital");             
        } else if(lname.value.trim() === ""){
            onError(lname, "Enter last name");
        }else if(!validateName(lname.value.trim())){
            onError(lname, "Please enter atleast 3 character with first letter capital");
        }else {
            onSuccess(fname);
            onSuccess(lname);
        }

        if (email.value.trim() === "") {
            onError(email, "Enter an email");
        } else {
            if (!validateEmail(email.value.trim())) {
                onError(email, "Enter valid email");
            } else {
                onSuccess(email);
            }
        }

        if (pwd.value.trim() === "") {
            onError(pwd, "Enter password");
        } else if (!validatePwd(pwd.value.trim())) {
            onError(pwd, "Use 8 or more characters with a mix of letters, numbers & symbols");
        } else if(cpwd.value.trim() === ""){
            onError(cpwd, "Enter confirm password");
        } else if(pwd.value.trim() !== cpwd.value.trim()){
            onError(cpwd, "Password and Confirm didn’t match");
        }
        else {
            onSuccess(pwd);
        }
    })

    
}

function onSuccess(input) {
    let parent = input.parentElement;
    let msgEle = parent.querySelector("small");
    msgEle.style.visibility = "hidden";
    msgEle.innerText = "";
    parent.classList.remove("error")
}

function onError(input, message) {
    let parent = input.parentElement;
    let msgEle = parent.querySelector("small");
    msgEle.style.visibility = "visible";
    msgEle.innerText = message;
    parent.classList.add("error");
}

function validateEmail(email) {
    return /^([A-Za-z0-9]{3,20})([.][A-Za-z0-9]{1,10})*([@][A-Za-z]{2,5})+[.][A-Za-z]{2,3}([.][A-Za-z]{2,3})?$/.test(email);
}

function validatePwd(pwd) {
    return /(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$_])[a-zA-Z0-9@#$_]{8,}/.test(pwd);
}

function validateName(name) {
    return /[A-Z]{1}[a-z]{3,20}/.test(name);
}

function register(){
    let firstName = document.getElementById("fname");
    let lastName = document.getElementById("lname");
    let email = document.getElementById("user");
    let password = document.getElementById("pwd");
    let data = {
        firstName:firstName.value,
        lastName:lastName.value,
        email:email.value,
        password:password.value
    }
    console.log(data);

    $.ajax({
        url:'https://localhost:44346/User/AddUser',
        type:'POST',
        data:JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        },
        success: function(result){
            console.log(result);
        },
        error: function(error){
            console.log(error);
        }
    })
}