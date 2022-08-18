function show(){
    var pwd = document.getElementById("pwd");
    var cpwd = document.getElementById("cpwd");
    if(pwd.type === "password" && cpwd.type === "password"){
        pwd.type="text";
        cpwd.type="text";
    }
    else{
        pwd.type="password";
        cpwd.type="password";
    }
}


function validate(){
    
}