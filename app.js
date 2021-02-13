import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import keys from "./config/keys.js";
import passport from "passport";
import GoogleAuth from "passport-google-oauth";
import User from "./Schema/User.js";
import Blogs from "./Schema/Blogs.js";
import session from "express-session";
import path from "path";

const app = express();
const port = process.env.PORT || 9000;
const __dirname = path.resolve();
const connection_url = keys.mongo_uri;
const GoogleStrategy = GoogleAuth.OAuth2Strategy;
app.use(cors());
app.use(express.json());
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.clientID,
      clientSecret: keys.clientSecret,
      callbackURL: "/auth/google/redirect",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ id: profile.id })
        .then((currentUser) => {
          if (currentUser) {
            done(null, currentUser);
          } else {
            new User({
              id: profile.id,
              name: profile.displayName,
              picture: profile.picture,
            })
              .save()
              .then((newUser) => {
                done(null, newUser);
              });
          }
        })
        .catch((err) => {
          done(err, null);
        });
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

app.get(
  "/auth/google/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

app.get("/auth/logout", (req, res) => {
  req.user = null;
  req.logOut();
});

app.get("/auth/user", (req, res) => {
  res.send(req.user);
});

app.get("/auth/blogs/:type", (req, res) => {
  Blogs.find({ type: req.params.type }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("blogapp/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "blogapp", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on localhost:${port}`));
