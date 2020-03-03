var ID = "admin";
var pw = "password";

window.addEventListener('load', ()=> {
    let userID = document.querySelector('[name = "userID"]');
    let loginButton = document.querySelector(".loginButton");
    let password = document.getElementById("password");
    loginButton.addEventListener("click", ()=> {
        if(userID.value == ID && password.value == pw) {
            alert("success");
            window.location.replace("main");
        }
        else {
            alert("failed");
        }
    });
});