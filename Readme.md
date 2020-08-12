Hey!!
Wanna Use OAuth2.0 / OAuth login for the web page you just created !! But Don't wanna use Firebase!! Here's the solution, Use Passport.JS, along with any database as per your requiremment (SQL/NoSQL).

I've provided a working code (you just need to put the credentials on [keys](/routes/keys.js). I only needed Facebook and LinkedIn login back then. You can use any starategies you like. (It has more than 500+ strategies).

For more details visit [here](http://www.passportjs.org/)

```
passport.authenticate('twitter');('facebook');('google');('linkedin');('github');

Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application.
A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more
```
