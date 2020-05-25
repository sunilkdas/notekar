const mongoose=require('mongoose');
const bcrypt= require('bcrypt');
const config= require('../config/database');


const NotesSchema =mongoose.Schema({
   
    username:{
        type: String,
        required: true
    },
    notes:{
        type: String,
        required: true
    }
});

const Notes = module.exports= mongoose.model('Notes', NotesSchema);


module.exports.getNotesByUsername= function(username, callback){
    const query = {username : username};
    console.log(username)
    Notes.find(query,callback);
   // console.log("Done")
}

module.exports.addNote= function(newNote, callback){
    console.log(newNote)
    newNote.save(callback);
    
}