'use strict';
const dateiPfad = 'userDataNew.txt';
const username = ""
const userList =[];

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
    // Express REST API ansprechen POST username
    //      
    // Chatfenster aufrufen
    window.location.href = "index.html";
}

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
document.addEventListener("DOMContentLoaded", function() { 
    const userUpdate = document.getElementById("userlistUpdate");
    if (userUpdate) {
        userUpdate.addEventListener("submit", function(event) {
        event.preventDefault();
        showUserList(); // Funktionsaufruf
        console.log('Eingabe erfolgt')
        });
    }
});

function showUserList() {
    fetch('http://localhost:3030/api/userlist', {
        methode:"GET",
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