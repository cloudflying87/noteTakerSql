const express = require('express');
const router = express.Router();
const Notes = require('../model/notes');

// display notes in db
router.get("/api/notes", function(req, res) {
    Notes.selectAll(['notes'])
      .then (results => {
        res.json(results)
      })
      .catch(console.error)
  });
  
  router.get("/api/notes/:id", function(req, res) {
    const id = req.params.id
    Notes.selectOneNote(id)
      .then (results => {
        res.json(results)
      })
      .catch(console.error)
  
  });
  router.delete("/api/notes/:id",function(req,res){
    const id = req.params.id
    Notes.deleteOneNote(id)
      .then (results => {
        res.json(results)
      })
      .catch(console.error)
  })
  
  router.post('/api/notes' , function(req,res){
    var newNote = req.body;
    Notes.createOneNote(newNote.title,newNote.text)
      .then (results => {
        res.json(results)
      })
      .catch(console.error)
  })

module.exports = router;