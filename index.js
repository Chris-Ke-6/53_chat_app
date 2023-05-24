'use strict';
const fs = require('fs');
const express = require('express');
const cors = require('cors')

const app = express();
const PORT = 3030;
const path = require('path');

//???
app.use(cors());
app.use(express.json());

// Statische Files
//app.use() ist die Middleware und sorgt dafür dass die Funktion in den Klammern ausgeführt wird bevor der Webserver startet
//express.static sort fürdie Bereitstellung der statischen Dateien
//path.join liefert den Pfad zum öffentlichen Ordner
app.use(express.static(path.join(__dirname, 'public'))); 

//API zur Kontrolle liefert Hello World
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//API liefert Nutzerliste als Data an Client
app.get('/api/userlist', (req, res)=>{  
    try{
        const data = fs.readFileSync('data/userList.json','utf-8');
        res.status(200),
        res.send(data);
    } catch (err){
        console.error(err);
        res.status(500).json('Datei kann nicht gelesen werden')
    } 
});

//API erhält username; liefert ID und Username zurück
app.post('/api/user', (req, res)=>{
    console.log('REQUEST INCOMING', req.body) //Body kontrollieren
    const jsonData = req.body[0];
    const username = jsonData.username;

    //Einlesen JSON File aus Dateiablage
    let userList = [];
    try {
        const userListData = fs.readFileSync('data/userList.json', 'utf8');
        userList = JSON.parse(userListData);
    } catch (error) {
        console.error('Error reading userList file:', error);
    }
    
    //Prüfen ob username schon vorhanden
    const result1 = userList.find(item => item.username === username);
    if (result1) {
        res.status(204)
        return;
    }

    //ID generieren und neuen Benutzer in userList aufnehmen
    let id;
    do { 
        id= generateID();
    } while (userList.some(username => username.id==id));
    
    const newUser = {id,username}
    userList.push(newUser);

    //userList sichern in Fileablage
    const userListDir = path.join(__dirname, 'data', 'userList.json');
    fs.writeFile(userListDir, JSON.stringify(userList), 'utf8', (error) => {
        if (error) {
          console.error('Error writing userList file:', error);
          res.status(500).json({ error: 'Failed to save user data' });
          return;
        } else {
          console.log(newUser);
          res.status(200).json([newUser]);
        }
    });
});

//API erhält alten und neuen Usernamen
app.put('/api/user/username_new:id', (req, res)=>{  
    //Anstelle :id müsste hier die HTML Variable newUsername stehen
    //const username_old = 
    //const username_new = 

    //Nachschauen ob der Name exisitert
    //Wenn nicht dann ablehnen

    //Falls ja dann neuen Namen eintragen
    //Meldung neuer Name zurücksenden

    
});

//Mitteilung aus Chatfenster empfangen, Mitteilungen sortieren und letzte 10 Mitteilungen zurücksenden
app.post('/api/message', (req, res)=>{
    console.log('Message in', req.body) //Body kontrollieren
    const messageTime = req.body[0];
    const messageUser = req.body[1];
    const messageText = req.body[2];

    //Einlesen JSON Messagefile aus Dateiablage
    let messageList = [];
    try {
        const messageListData = fs.readFileSync('data/userList.json', 'utf8');
        messageList = JSON.parse(messageListData);
    } catch (error) {
        console.error('Error reading userList file:', error);
    }
    
    //Mitteilung in die MessageList eintragen und nach Zeitstempel sortieren
    const newMessage = [{"messageTime": messageTime, "messageUser": messageUser, "messageText": messageText}];
    messageList.push(newMessage);
    messageList.sort((a, b) => new Date(a.messageTime) - new Date(b.messageTime));
    console.log(messageList);

    //Letzte 10 Mitteilungen ermitteln
    const tenMessages = messageList.slice(-10);    
    
    //messageList sichern in Fileablage
    const messageListDir = path.join(__dirname, 'data', 'messageList.json');
    fs.writeFile(messageListDir, JSON.stringify(messageList), 'utf8', (error) => {
        if (error) {
          console.error('Error writing messageList file:', error);
          res.status(500).json({ error: 'Failed to save user data' });
          return;
        } else {
          res.status(200);
          res.json(tenMessages);
        }
    });
    res.send;
});


//API Listenfunktion 
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

// Redis DB starten
// Innerhalb REST die Anbindung an Redis?

function generateID(){
    return Math.floor(Math.random()*90_000)+10_000;
}