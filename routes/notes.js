const express= require('express');
const nrouter= express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Note = require("../modals/notes");
const config= require('../config/database');

nrouter.post('/addNote',(req,res,next)=>{
    console.log(req.body)
    let newNote= new Note({
        username: req.body.username,
        notes: req.body.notes,

    });
    Note.addNote(newNote,(err,user)=>{
        console.log("called");
        if(err){
            res.json({success:false,msg:'Failed'})
        }
        else{
            res.json({success:true,msg:'New note added'})
        }
    })
   // res.send('Register')
})




nrouter.post('/getnotes',(req,res,next)=>{
    let username = req.body.username;
    
    Note.getNotesByUsername(username,(err,notes)=>{
        console.log("called");
        if(err){
            res.json({success:false,msg:'Failed'})
        }
        else{
            res.json({notes: notes});
        }
    })
   
})

module.exports=nrouter;
