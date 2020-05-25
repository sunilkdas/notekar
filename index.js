const express= require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors= require('cors');
const passport =require('passport');
const mongoose= require('mongoose');
const app=express();
const config= require('./config/database')

//DB

mongoose.connect(config.database,{ useNewUrlParser: true,useUnifiedTopology: true }, () => {
    console.log('connected to mongodb');
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
/*
mongoose.connection.on('connected',()=>{
    console.log(`Connected to ${config.database}`)
})


mongoose.connection.on('error',(err)=>{
    console.log(`Error generated while connecting to  ${config.database}`)
})
*/

const users =require('./routes/users');
const notes =require('./routes/notes');
//Port
const PORT= 3333;

//CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname,'public')));

//Bodyparser is middleware to parse the JSON req body and header
app.use(bodyParser.json());


//Passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport )
app.use('/users', users);
app.use('/notes', notes);

app.get('/',(req, res)=>{
    res.send("Hello to Homes")
})

app.listen(PORT,()=>{
    console.log("Server running at PORT :"+ PORT)
});
