// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
const { type } = require("os");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3500;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
app.use(express.static('db'))

var notes =[
  {
    textTitle: "Test Title",
    text: "Note"
  }
  
];
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/test.html"));
  });

app.get("/api/notes", function(req, res) {
  fs.readFile((path.join(__dirname, 'db/db.json')),'utf8',function(error,data) {
    if (error) throw error
    // notes=(data);
    res.json(JSON.parse(data))
  })

});

app.get("/api/notes/:id", function(req, res) {
  const id = req.params.id
  fs.readFile((path.join(__dirname, 'db/db.json')),'utf8',function(error,data) {
    if (error) throw error
    let notes2 = JSON.parse(data);
    for (let i = 0; i < notes2.length; i++) {
      if(id == notes2[i].id){
        res.json(notes2[i])  
      }
    }
  })

});
app.delete("/api/notes/:id",function(req,res){
  const id = req.params.id
  fs.readFile((path.join(__dirname, 'db/db.json')),'utf8',function(error,data) {
    if (error) throw error
    let notes2 = JSON.parse(data);
    
    for (let i = 0; i < notes2.length; i++) {
      if(id == notes2[i].id){
        notes2.splice(notes2[i].id-1 ,1) 
      }
    }
    for (let i = 0; i < notes2.length; i++) {
      notes2[i].id = i+1
    }
    
    fs.writeFile((path.join(__dirname, 'db/db.json')),JSON.stringify(notes2),function(error) {
      if (error) throw error
      res.json(notes2)
    })
  })
})

app.post('/api/notes' , function(req,res){
  var newNote = req.body;
  fs.readFile((path.join(__dirname, 'db/db.json')),'utf8',function(error,data) {
    if (error) throw error

    notes = JSON.parse(data)
    newNote.id = notes.length +1
    notes.push(newNote)
    
    fs.writeFile((path.join(__dirname, 'db/db.json')),JSON.stringify(notes),function(error) {
      if (error) throw error
      res.json(notes)
    })
  })
  
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });