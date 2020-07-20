// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
const { type } = require("os");
const Notes = require('./model/notes')

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3500;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
app.use(express.static('db'))

// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "public/index.html"));
//   });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });

app.get("/api/notes", function(req, res) {
  Notes.selectAll(['notes'])
    .then (results => {
      res.json(results)
    })
    .catch(console.error)
});

app.get("/api/notes/:id", function(req, res) {
  const id = req.params.id
  Notes.selectOneNote(id)
    .then (results => {
      res.json(results)
    })
    .catch(console.error)

});
app.delete("/api/notes/:id",function(req,res){
  const id = req.params.id
  Notes.deleteOneNote(id)
    .then (results => {
      res.json(results)
    })
    .catch(console.error)
})

app.post('/api/notes' , function(req,res){
  var newNote = req.body;
  Notes.createOneNote(newNote.title,newNote.text)
    .then (results => {
      res.json(results)
    })
    .catch(console.error)
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });