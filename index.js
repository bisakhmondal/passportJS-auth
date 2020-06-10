const express = require('express');
const cors = require('cors');
const passport = require('passport');
const LinkedInStrategy= require('passport-linkedin-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const keys = require('./keys');
const chalk= require('chalk');
let user={  id:"123",
pass:"456"};

passport.serializeUser((user,cb)=>{
    cb(null,user);
});
passport.deserializeUser((user,cb)=>{
    cb(null,user);
});
//linkedin
passport.use(new LinkedInStrategy({
    clientID: keys.LINKEDIN.id,
    clientSecret: keys.LINKEDIN.pass,
    callbackURL: "/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile'],
  },
  (accessToken, refreshToken, profile, cb)=> {
      console.log('auth started')
    // console.log(chalk.blue(JSON.stringify(profile)));
    user={...profile};
    // console.log(user);
    return cb(null,profile);
}
));
//facebook
passport.use(new FacebookStrategy({
    clientID: keys.FACEBOOK.id,
    clientSecret: keys.FACEBOOK.pass,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName','email']
  },
  (accessToken, refreshToken, profile, cb)=> {
      console.log('fb auth started');
      console.log('facebook')
    console.log(chalk.blue(JSON.stringify(profile)));
    user={...profile};
    return cb(null,profile);
}
));

const app= express();
app.use(cors());
app.use(passport.initialize());

app.get('/auth/linkedin',passport.authenticate('linkedin'));
app.get('/auth/linkedin/callback', 
passport.authenticate('linkedin', { failureRedirect: '/failed' }),
(req,res)=>{
    // console.log(res);
    res.redirect('/profile');
});
//facebook
app.get('/auth/facebook',passport.authenticate('facebook'));
app.get('/auth/facebook/callback', 
passport.authenticate('facebook', { failureRedirect: '/failed' }),
(req,res)=>{
    // console.log(res);
    res.redirect('/profile');
});
app.get('/profile',(req,res)=>{
    // res.send(user);
    res.send(user);
});
app.get('/failed',(req,res)=>{
    res.send('login Faild');
})
const PORT=process.env.PORT || 5001;

app.listen(PORT,()=>{
    console.log('app stared at ',PORT)
});