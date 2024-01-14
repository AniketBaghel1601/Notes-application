const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    title : {type : String, required : true},
    body : {type : String, required : true},
    userId : {type : String, required : true},
    username : {type : String, required : true}
})


const NotesModel = mongoose.model("note",notesSchema);

module.exports = {
    NotesModel
} 