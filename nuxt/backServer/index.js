//import des dépendances
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

/// details of Nuxt server
const WEB_SERVER_HOST = process.env.WEB_SERVER_HOST || "localhost";
const WEB_SERVER_PORT = process.env.WEB_SERVER_PORT || 3000;
const WEB_SERVER_REDIRECT_URL =
  "http://" + WEB_SERVER_HOST + ":" + WEB_SERVER_PORT + "/";
//definition du parametre du server
const app = express();
const port = 5000;
const SERVER_BASE_URL = "http://localhost:" + port;


//To parse JSON body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Auotisation des requetes cross-origin avec cookies du  nuxt web server
app.use(
    cors({
      credentials: true,
     origin: ["http://" + WEB_SERVER_HOST + ":" + WEB_SERVER_PORT,
     "https://" + WEB_SERVER_HOST + ":" + WEB_SERVER_PORT]
    })
  );
  //configuration de express-session
app.use(
    session({
      secret: "your_secret_key",
      resave: true,
      saveUninitialized: true,
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 60 * 60 * 1000, //1 heure en  milliseconds
      },
    })
  );
  //Configuration de mongoose
const MONGO_HOST = process.env.MONGO_HOST || "127.0.0.1";
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_DATABASE_NAME = process.env.MONGO_DATABASE_NAME || "googleDB";
const mongoose = require("mongoose");
console.log(`${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE_NAME}`);
mongoose.connect(
    `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE_NAME}`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);


//Creatiin du schema user mongoose 
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    googleId: String,
  });
  //import du plugin passportLocalMongoose
  userSchema.plugin(passportLocalMongoose);
  const User = mongoose.model("User", userSchema);

  //initialisation de  passport
  app.use(passport.initialize());
  app.use(passport.session());
  
  // stratégie Locale s utilisant passport-local-mongoose
  passport.use(User.createStrategy());
  
  passport.serializeUser(function (user, done) {
    
    console.log("serializing user:" + JSON.stringify(user))
    done(null, user.id);
  });
  passport.deserializeUser(async function (id, done) {
    console.log("deserializing user:" + JSON.stringify(id));
    const user = await User.findById(id);
    if(user){
        done(null, user);
    }
 
  });
  
  //Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
          SERVER_BASE_URL + process.env.GOOGLE_CALLBACK_SERVICE_MAPPING, //Callback to a service on this server
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      },
      function (accessToken, refreshToken, profile, done) {
        User.findOne(
          {
            googleId: profile.id,
          },
          function (err, user) {
            if (err) {
              return done(err);
            }
            if (!user) {
              //Enregistrement dans Mongoose du User utilisant Google OAuth
              user = new User({
                googleId: profile.id,
                username: profile.id,
              });
              user.save(function (err) {
                if (err) console.log(err);
                return done(err, user);
              });
            } else {
              return done(err, user);
            }
          }
        );
      }
    )
  );
  //definition des routes
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile"] })
  );
  
  app.get(
    process.env.GOOGLE_CALLBACK_SERVICE_MAPPING,
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      // redirection vers la page d'accueil du serveur Nuxt
      res.redirect(WEB_SERVER_REDIRECT_URL);
    }
  );
  
  //Enregistrement de l' user dans la strategie local
  app.post("/register", (req, res, next) => {
    User.register(
      {
        username: req.body.username,
      },
      req.body.password,
      function (err, user) {
        if (err) {
          console.log(err);
          res.status(500).send();
        } else {
          passport.authenticate("local")(req, res, function () {
            console.log("Utilisateur enregistré avec succes!");
            res.status(200).send();
          });
        }
      }
    );
  });
  
  // strategie local quand l'utilisateur est connecté
  app.post("/login", async (req, res) => {
    console.log("Login request");
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    try {
      req.login(user, function (err) {
        if (err) {
          console.log(err);
          res.sendStatus(400);
        } else {
          passport.authenticate("local")(req, res, function () {
            console.log("Utilisateur connecté");
            res.json({});
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });
  
  app.post("/logout", (req, res) => {
    req.logout();
    res.status(200).send();
  });
  
  //Nuxt récupere les données utilisateur une fois authentifié
  app.get("/user", async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        res.json({ user: req.user });
      } else {
        console.log("Utilisateur non authnetifié");
        res.sendStatus(401);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });
  
  app.listen(port, () => {
    console.log(` server listen en  http://localhost:${port}`);
  });
  