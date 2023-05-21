'use strict';
const dateiPfad = 'userDataNew.txt';
const username = ""
const userList =[];

// Event Listener um Benutzer aus Login zu  übernehmen 
document.addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("userInputName").value; //Var befüllen
    createUsername(username); // Funktionsaufruf
    
    // Chatfenster aufrufen
    window.location.href = "index.html";

});
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
function createUsername(username) {
    console.log(username);
    
    //Prüfen ob Benutzername leer oder bereits vorhanden
    if (username == ""|| username.length<2) {
        alert('Bitte Benutzername mit mind. 2 Buchstaben eingeben');
        //Abbruchverhalten mit Error damit nicht das Chatfenster aufgerufen wird?
    }   
    //Username an Server senden 
    fetch('http://localhost:3030/api/user', {
        method:"POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "username": username
        })
    })

    .then((res) => {
        if (res.ok){
            alert("Benutzername eingetragen");
        } else {
            throw new Error('Benutzername nicht okay')
        }
        
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