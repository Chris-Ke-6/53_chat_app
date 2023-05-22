'use strict';
const dateiPfad = 'userDataNew.txt';
const username = ""
const userList =[];

function login(){
    const username = document.getElementById("userInputName").value; //Var befüllen
    createUsername(username); // Funktionsaufruf
    
    // Chatfenster aufrufen
    window.location.href = "index.html";
}
// Event Listener um Benutzer aus Login zu  übernehmen 

// document.addEventListener("submit", function(event) {
//     event.preventDefault();
//     const username = document.getElementById("userInputName").value; //Var befüllen
//     createUsername(username); // Funktionsaufruf
    
//     // Chatfenster aufrufen
//     window.location.href = "index.html";

// });
// document.addEventListener("DOMContentLoaded", function() { 
//     const loginInput = document.getElementById("userInput");
//     if (loginInput) {
//         loginInput.addEventListener("submit", function(event) {
//         event.preventDefault();
//         const username = document.getElementById("userInputName").value; //Var befüllen
//         createUsername(username); // Funktionsaufruf
//         });
//     }
// });

// Funktion Benutzername prüfen, Nutzerliste befüllen, Chatfenster aufrufen
async function createUsername(username) {
    console.log(username);
    
    //Prüfen ob Benutzername leer oder bereits vorhanden
    if (username == ""|| username.length<2) {
        alert('Bitte Benutzername mit mind. 2 Buchstaben eingeben');
        //Abbruchverhalten mit Error damit nicht das Chatfenster aufgerufen wird?
    }   
    //Username an Server senden 
    await fetch('http://localhost:3030/api/user', {
        method:"post",
        headers: {
            'Content-Type':'application/json',
            'Accept': '*/*'
        },
        body: JSON.stringify([{username: username}])    //JSON Objekt
    }).then((res) => {
        if (res.status == 200){
            alert("Benutzername eingetragen");
        }
        else if (res.status == 204){
            alert('Benutzername nicht okay')
        }
        //else 
    })
    .catch((error) => {
        console.error(error);
    });    
};

// Meldungen aus Chatfenster nehmen
document.addEventListener("DOMContentLoaded", function() {
    const indexMessage = document.getElementById("message-area");
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


// Event Listener um Nutzerliste anzuzeigen 
document.addEventListener("submit", function(event) {
    console.log("trigger");
    event.preventDefault();
    showUserList(); // Funktionsaufruf
    console.log('Eingabe erfolgt')
    });

function showUserList() {
    fetch('http://localhost:3030/api/userlist', {
        method:"GET",
    })
    .then(res => res.json())
    .then(data=> {
        console.log(data);
        let userbox = document.getElementById("userbox");
        userbox.textContent = JSON.stringify(data, null, 2);
    })
    .catch(error=> console.error(error));
}

//Event Listener für Benutzername alt / neu
document.addEventListener("DOMContentLoaded", function() {
    const usernameChange = document.getElementById("buttonlist");
    if (usernameChange) {
        usernameChange.addEventListener("submit", function(event) {
        event.preventDefault();
        const usernameOld = document.getElementById("username_old").value;
        const usernameNew = document.getElementById("username_new").value;
        
        //changeUserName();

        console.log(usernameOld +'->'+ usernameNew);
        });
    }     
});

//Benutzername wechseln
function changeUserName(){
    //Suche ob User vorhanden
    //Alten User aus der UserList löschen
    //Neuen User in die UserList eintragen
    //Aktuelle Userlist neu aufrufen
    console.log("Wechsel läuft");
}