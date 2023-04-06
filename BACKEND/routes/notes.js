const express = require('express');
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require("express-validator");

// ROUTE 1 : Get all the notes using : GET "/api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Notes.find({user: req.user.id})
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
      }
})

// ROUTE 2 : Get a new notes using : POST "/api/notes/addnote". login required
router.post('/addnote', fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 character").isLength({min: 5}),
], async (req, res)=>{
            
    try {
    const {title, description, tag} = req.body
     //If there are errors, return bas request and the error
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
     const note = new Notes({
        title, description, tag, user: req.user.id
     })
     const savedNote = await note.save()
    res.json(savedNote)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})


// ROUTE 3 : Update an existing Note using : PUT "/api/notes/updatenote". login required
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
  try {
  const {title, description, tag} = req.body;
  //Create a new note object
  const newNote = {};
  if(title){newNote.title = title};
  if(description){newNote.description = description};
  if(tag){newNote.tag = tag};

  //Find the node to be updated and update it
  let note = await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}

  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed")
  }

  note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
  res.json({note}); 
  
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error");
}
})


// ROUTE 4 : Delete an existing Note using : Delete "/api/notes/deletenote". login required
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
  try {
  //Find the node to be delete and delete it
  let note = await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}

  //Allow deletion only if user own this Note
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed")
  }

  note = await Notes.findByIdAndDelete(req.params.id)
  res.json({"success" : "note has been deleted", note:note}); 
}catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error");
}
})


module.exports = router