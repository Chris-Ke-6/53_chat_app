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
    if (userList.includes(username)){
        res.status(200).json('Benutzername bereits vergeben');
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
        } else {
          res.status(200).json(newUser);
        }
    });

    res.send(newUser);
});


app.put('/api/user/username_new:id', (req, res)=>{  
    //Anstelle :id müsste hier die HTML Variable newUsername stehen
    //const username_old = 
    //const username_new = 

    //Nachschauen ob der Name exisitert
    //Wenn nicht dann ablehnen

    //Falls ja dann neuen Namen eintragen
    //Meldung neuer Name zurücksenden

    
});


//API Listenfunktion 
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

// Redis DB starten
// Innerhalb REST die Anbindung an Redis?

function generateID(){
    return Math.floor(Math.random()*90_000)+10_000;
}