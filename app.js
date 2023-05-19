'use strict';
const dateiPfad = 'userDataNew.txt';
// const fs = require ('fs');
const username = ""

// Event Listener um Benutzer aus Login zu  übernehmen 
document.addEventListener("DOMContentLoaded", function() { 
    const loginInput = document.getElementById("userInput");
    if (loginInput) {
        loginInput.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("userInputName").value; //Var befüllen
        createUsername(username); // Funktionsaufruf
        });
    }
});

// Funktion Benutzername prüfen, Nutzerliste befüllen, Chatfenster aufrufen
function createUsername(username) {
    console.log(username);
    let userList = [];
    console.log (userList);
    
    //Prüfen ob Benutzername leer oder bereits vorhanden
    if (username == "") {
        alert('Bitte Benutzername eingeben');
        //Abbruchverhalten mit Error damit nicht das Chatfenster aufgerufen wird?
    }   
    else {
        for (let i = 0; i < userList.length; i++) {
        if (username === userList[i]) {
            console.log('Bitte anderen Username wählen, da bereits vergeben');
            } 
        else {
            console.log('Benutzer wird in Nutzerliste eingetragen')  
            }           
        }
    }
        
    // Nutzer in Nutzerliste eintragen
    userList.push(username);
    console.log(userList);  
    // Speichern Nutzerliste klappt nicht
    // fs.writeFileSync('userList.txt', userList, (err)=>{
    //     if (err) throw err;
    // })
       
    // Chatfenster aufrufen
    window.location.href = "index.html";
}

// Meldungen aus Chatfenster nehmen
document.addEventListener("DOMContentLoaded", function() {
    const indexMessage = document.getElementById("message");
    if (indexMessage) {
        indexMessage.addEventListener("submit", function(event) {
        event.preventDefault();
        const message = document.getElementById("usermsg").value;
        const timestamp = new Date().toLocaleTimeString();
        const messageTimestamp = username + "schrieb um "+ timestamp +":"+ message; 
        console.log("Die Mitteilung lautet: " + messageTimestamp);

        // Funktion Mitteilung in Chatfenster eintragen 
        messageChatbox(messageTimestamp)

        document.getElementById("usermsg").value="";
        });
    }     
});

function messageChatbox(messageTimestamp){
    let messageHistory = document.getElementById("messageHistory");
    let newMessage = document.createElement("p")
    newMessage.textContent = messageTimestamp;
    messageHistory.appendChild(newMessage);
}

//Meldungsverlauf anzeigen
function showChatlist(){
    //3 Meldungen zeitlich gegliedert mit Zeitstempel Name Meldung anzeigen
}

// Nutzerliste anzeigen
function showUserList() {
    console.log(userList); 
}



//Benutzername ändern
function changeUserName(){


}