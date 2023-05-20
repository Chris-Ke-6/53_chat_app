// node Js Express aufsetzen
const fs = require('fs');
const express = require('express');
const cors = require('cors')

const app = express();
const PORT = 3030;
const path = require('path');

//Lokale 
app.use(cors());
app.use(express.json());

// Statische Files
//app.use() ist die Middleware und sorgt dafür dass die Funktion in den Klammern ausgeführt wird bevor der Webserver startet
//express.static sort fürdie Bereitstellung der statischen Dateien
//path.join liefert den Pfad zum öffentlichen Ordner
app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/', (req, res) => {
    res.send('Hello World!');
});

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

app.put('/api/user/username_new:id', (req, res)=>{  //Anstelle :id müsste hier die HTML Variable newUsername stehen
    //const username_old = 
    //const username_new = 

    //Nachschauen ob der Name exisitert
    //Wenn nicht dann ablehnen

    //Falls ja dann neuen Namen eintragen
    //Meldung neuer Name zurücksenden

    
});

app.post('/api/user', (req, res)=>{
    if(!req.body.name || req.body.name.length<2){
        res.status(400).send('Bitte Name mit mind. 2 Buchstaben eingeben.')
        return;
    }
    fs.readFileSync('data/userList.json','utf-8', (err, data) => {
        if(err){
            res.status(500);
            return res.json('Datei kann nicht gelesen werden')
        }
        res.status(200);
        return res.send(data);
    })
    
    const user = {
        id: userList.length + 1, 
        name: req.body.name,
    };
    userList.push(user);
    res.send(user);
});






app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

// Redis DB starten

// Endpunkte REST API definieren
// GO Befehle anschauen TODO Backend 
// Handler anschauen
// 
// DB wird im Handler angesprochen
// Innerhalb REST die Anbindung an Redis