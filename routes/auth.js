const express =require('express');
const router=express.Router();
const User= require('../models/usersmodel');

const passport = require('passport');
const LinkedInStrategy= require('passport-linkedin-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const keys = require('./keys');
const chalk= require('chalk');
let user={};

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
    proxy:true,
  },
  (accessToken, refreshToken, profile, cb)=> {
      console.log('auth started')
    user={...profile};
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


router.get('/linkedin',passport.authenticate('linkedin'));
router.get('/linkedin/callback', 
passport.authenticate('linkedin', { failureRedirect: '/auth/failed' }),
(req,res)=>{
    // console.log(res);
    res.redirect('/auth/profile');
});
//facebook
router.get('/facebook',passport.authenticate('facebook'));
router.get('/facebook/callback', 
passport.authenticate('facebook', { failureRedirect: '/auth/failed' }),
(req,res)=>{
    res.redirect('/auth/profile2');
});


router.get('/profile',(req,res)=>{
    const user2={
        name:user.displayName,
        'email':user.emails[0].value,
        profPic: user.photos[0].value,
    }
    res.send(user2);
});
router.get('/profile2',(req,res)=>{
    res.send(user);
});
router.get('/failed',(req,res)=>{
    res.send('login Faild');
})
module.exports=router;