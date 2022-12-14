function show() {
    var pwd = document.getElementById("pwd");
    if (pwd.type === "password") {
        pwd.type = "text";
    }
    else {
        pwd.type = "password";
    }
}

function validate() {
    document.getElementById("form").addEventListener("submit", function (e) {
        e.preventDefault();

        let email = document.getElementById("email");
        let pwd = document.getElementById("pwd");

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
        } else {
            if (!validatePwd(pwd.value.trim())) {
                onError(pwd, "Please Enter Atleast 8 character with Alteast one numeric,special character");
            } else {
                onSuccess(pwd);
            }
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

function login(){
    let email = document.getElementById("email");
    let password = document.getElementById("pwd");
    let data = {
        email:email.value,
        password:password.value
    }
    console.log(data);

    $.ajax({
        url:'https://localhost:44346/User/LoginUser',
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