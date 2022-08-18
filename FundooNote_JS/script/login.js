function show() {
    var pwd = document.getElementById("pwd");
    if (pwd.type === "password") {
        pwd.type = "text";
    }
    else {
        pwd.type = "password";
    }
}

// function validate() {
//     var email = document.getElementById("email").value;
//     var emailerr = document.getElementById("email");
//     var emailRgex = /^([A-Za-z0-9]{3,20})([.][A-Za-z0-9]{1,10})*([@][A-Za-z]{2,5})+[.][A-Za-z]{2,3}([.][A-Za-z]{2,3})?$/;
//     var emailRes = emailRgex.test(email);
//     // if(emailRes){
//     //     return true;
//     // }
//     // else{
//     //     alert("Enter email in the format : abc@gmail.com")
//     // }

//     var pwd = document.getElementById("pwd").value;
//     var pwderr = document.getElementById("pwd");
//     var pwdRgex = /(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$_])[a-zA-Z0-9@#$_]{8,}/;
//     var pwdRes = pwdRgex.test(pwd);

//     // if(pwdRes){
//     //     return true;
//     // }
//     // else{
//     //     alert("Please Enter Atleast 8 character with Alteast one numeric,special character");        
//     // }

//     // if(emailRes || pwdRes != null){
//     //     if(emailRes){
//     //         return true;
//     //     }
//     //     if(emailRes == false) {
//     //         emailerr.style.border="1px solid red";
//     //     }
//     //     if(pwdRes){
//     //         return true;
//     //     }
//     //     if(pwdRes == false){
//     //         pwderr.style.border="1px solid red";
//     //     }

//     // }

// }

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
