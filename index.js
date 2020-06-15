const express = require('express');
const cors = require('cors');
const authRoute=require('./routes/auth');
const dashRoute=require('./routes/dash');
const app= express();
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
require('dotenv/config');


app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/auth',authRoute);
app.use('/dashboard',dashRoute);

app.post('/',(req,res)=>{
    console.log(req.body)
})
app.get('/',(req,res)=>{
    res.send('<h1>Welcome to LS&CG BACKEND for DASHBOARD :)</h1>')
});

mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true,useUnifiedTopology: true },async (err)=>{
        if(err) console.log(err.message);
        else
        console.log('connection successful');
    });
const PORT=process.env.PORT || 5001;

app.listen(PORT,()=>{
    console.log('app stared at ',PORT)
});
