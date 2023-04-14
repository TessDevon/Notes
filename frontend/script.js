import whritesite from "./whritesite.js"
import shownotesite from "./shownotesite.js";



//
// VÄXLA TILL HUVUDMENYN 
//

const headpageLi = document.getElementById("headpageLi")
    headpageLi.addEventListener("click", () => {
    location.reload();
});



//
// VÄXLA TILL SKRIVVYN 
//

const newNoteLi = document.getElementById("newNoteLi")
newNoteLi.addEventListener("click", whritesite);



//
// VÄLXA TILL DOKUMENTVYN
//
const myNotesLi = document.getElementById("myNotesLi")
myNotesLi.addEventListener("click", shownotesite);


/*------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------
------------------------------------------------------------------------------------*/ 



//
// REGISTRERA NY ANVÄNDARE
//

let newFirstname = document.getElementById("newFirstname");
let newLastname = document.getElementById("newLastname");
let newEmail = document.getElementById("newEmail");
let newPassword = document.getElementById("newPassword");
let saveUserBtn = document.getElementById("saveUserBtn");
let userInput = document.getElementsByClassName("userInput");
const serverMessage = document.getElementById("errorMessage");



saveUserBtn.addEventListener("click", () => {

    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",      
        },
        body: JSON.stringify({newEmail:newEmail.value, newPassword:newPassword.value, newFirstname:newFirstname.value, newLastname:newLastname.value})
    })
    .then(res => res.json())
    .then(data => {
        serverMessage.innerHTML = ""
        for (let element of userInput) {
            element.value = ""
        }
    })
    .catch ((err) => {
        console.log(err)
        serverMessage.style.color = "red";
        serverMessage.innerHTML = "Error! Emailen finns redan i databasen!"
    });
});



//
// LOGGA IN ANVÄNDARE
//

let userEmail = document.getElementById("userEmail");
let userPassword = document.getElementById("userPassword");
let loginUserBtn = document.getElementById("loginUserBtn");
const serverMassage = document.getElementById("serverMassage");
loginUserBtn.addEventListener("click", () => {
    serverMassage.innerHTML = ""

    fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",      
        },
        body: JSON.stringify({userEmail:userEmail.value, userPassword:userPassword.value})
    })
    .then(res => {
        if (res.ok) {
        const okMessege = document.createTextNode("Välkommen till vår textvärld!");
        serverMassage.style.color = "green";
        serverMassage.appendChild(okMessege);
        return res.json();

        }
    })
    .then(data =>{
        localStorage.setItem("userIdLocalStorage", JSON.stringify({id:data.userId, token:data.token}))
        for (let element of userInput) {
            element.value = ""
        }
    })
    .catch ((err) => {
    
    const errorMessege = document.createTextNode("Error! Fel användarnamn eller lösenord!");
    serverMassage.style.color = "red";
    serverMassage.appendChild(errorMessege);
    })
})




