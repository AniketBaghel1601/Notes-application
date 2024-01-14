const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { NotesModel } = require("../models/notesModel");
const notesRoute = express.Router();

notesRoute.use(express.json());
notesRoute.use(auth);

notesRoute.get("/", async(req, res) => {
  try {
    const note = await NotesModel.findOne({userId : req.body.userId});
    res.status(200).json({ note });
  } catch (error) {
    res.status(400).json({err : error});
  }
});

notesRoute.post("/create", async (req, res) => {
  try {
    const newNote = new NotesModel(req.body);
    await newNote.save();
    res.status(200).json({ msg: "new note has been created" });
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

notesRoute.patch("/update/:NoteId", async(req, res) => {
    const NoteId = req.params.NoteId;
    const note =  await NotesModel.findOne({_id:NoteId});
    if(note.userId === req.body.userId){
       await NotesModel.findByIdAndUpdate({_id:NoteId},req.body);
        res.status(200).json({msg : "notes updated successfully!"});
    }
    else{
        res.status(200).json({msg : "you are not authorized..."});
    }
});

notesRoute.delete("/delete/:NoteId", async(req, res) => {
    const NoteId = req.params.NoteId;
    const note = await NotesModel.findOne({_id:NoteId});
    if(note.userId === req.body.userId){
       await NotesModel.findByIdAndDelete({_id:NoteId});
        res.status(200).json({msg : "Note deleted successfully !"});
    }
});

module.exports = {
  notesRoute
};
