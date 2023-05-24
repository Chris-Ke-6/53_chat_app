'use strict';
const username = "";
const userList = [];

//Funktionsaufruf aus Loginfenster:
//Benutzername prüfen, Nutzerliste befüllen, Chatfenster aufrufen
async function login(){
    const username = document.getElementById("userInputName").value; //Var befüllen
    console.log(username);
    
    //Prüfen ob Benutzername leer oder zu kurz
    if (username == ""|| username.length<2) {
        alert('Bitte Benutzername mit mind. 2 Buchstaben eingeben');
        //-> Abbruchverhalten mit Error damit nicht das Chatfenster aufgerufen wird?
    }; 

    //Username an Server zur Prüfung ob Benutzername vorhanden oder Eintrag Nutzerliste
    await fetch('http://localhost:3030/api/user', {
        method:"POST",
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify([{username: username}])    //JSON Objekt
    }).then((res) => {
        if (res.status == 200){
            alert("Benutzername eingetragen");
            window.location.href = "index.html";
            //->Fenster wird nicht gewechselt!!!
            console.log(res);
        }
        else {
            alert('Benutzername vergeben, bitte anderen Benutzername eingeben')
            window.location.href = "login.html";
        }
    }).catch((error) => {
        console.error(error);
    });    
};

// Funktionsaufruf aus Chatfenster um Meldung zu publizieren
async function sendToServer(){
    const message = document.getElementById("usermsg").value;
    const timestamp = new Date().toLocaleTimeString();
    console.log(username);

    // Funktion Mitteilung in Chatfenster eintragen
    await fetch('http://localhost:303/api/message', {
        method:'POST',
        headers: {
            'Content-type':'application/json'
        },
        body: JSON.stringify([{
            timestamp: timestamp, 
            username: username, 
            message: message,
        }]) //JSON Objekt
    }).then((res) => {
        if(res.status == 200){
            return response.json(),
            console.log('Message erfasst');
            //Zeileneintrag als Text in messagefenster
        } else {
            alert('Keine Verbindung vorhanden');
        }
    });

    //console.log(res);
    //messageChatbox(messageTimestamp)
    //document.getElementById("usermsg").value="";
};

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


// Funktionsaufruf aus Settingfenster um Nutzerliste abzurufen
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
// document.addEventListener("DOMContentLoaded", function() {
//     const usernameChange = document.getElementById("buttonlist");
//     if (usernameChange) {
//         usernameChange.addEventListener("submit", function(event) {
//         event.preventDefault();
//         const usernameOld = document.getElementById("username_old").value;
//         const usernameNew = document.getElementById("username_new").value;
        
//         //changeUserName();

//         console.log(usernameOld +'->'+ usernameNew);
//         });
//     }     
// });

//Benutzername wechseln
function changeUserName(){
    const usernameOld = document.getElementById("username_old").value;
    const usernameNew = document.getElementById("username_new").value;

    //Suche ob User vorhanden
    //Alten User aus der UserList löschen
    //Neuen User in die UserList eintragen
    //Aktuelle Userlist neu aufrufen
    console.log("Wechsel läuft");
}

// document.addEventListener("DOMContentLoaded", function() {
//     const indexMessage = document.getElementById("message-area");
//     if (indexMessage) {
//         indexMessage.addEventListener("submit", function(event) {
//         event.preventDefault();
//         const message = document.getElementById("usermsg").value;
//         const timestamp = new Date().toLocaleTimeString();
//         const messageTimestamp = username + "schrieb um "+ timestamp +":"+ message; 
//         console.log("Die Mitteilung lautet: " + messageTimestamp);

//         // Funktion Mitteilung in Chatfenster eintragen 
//         messageChatbox(messageTimestamp)

//         document.getElementById("usermsg").value="";
//         });
//     }     
// });