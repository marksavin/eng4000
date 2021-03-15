const express = require("express");
const Joi = require("joi");

const router = express.Router();
const db = require("../db/db_login");

const bcrypt = require("bcrypt");
const salt = 10;

var passport = require("passport");

//NEED TO CHECK IF USER ALREADY EXISTS BEFORE REGISTERING
router.post("/register", async (req, res, next) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
    if (err) {
      console.log(err);
    }
    try {
      let queryResults = db.registerAccount(
        req.body.token,
        hashedPassword,
        req.body.user_type
      );
      res.json(queryResults);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });
});

router.post("/resetPassword", async (req, res, next) => {
  bcrypt.hash(req.body.newPassword, salt, (err, hashedPassword) => {
    if (err) {
      console.log(err);
    }
    try {
      let queryResults = db.resetPassword(req.body.token, hashedPassword);

      res.json(queryResults);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });
});

router.get("/tokenExists/:id", async (req, res, next) => {
  try {
    let queryResults = await db.tokenExists(req.params.id);
    res.json(queryResults);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let queryResults = await db.accountAuthentication(req.body);
    console.log(queryResults);
    if (typeof queryResults === "object") {
      const loginPacket = {
        isAuthenticated: req.session.isAuthenticated,
        user_type: queryResults[0].user_type,
      };
      // req.session.isAuthenticated = true;
      const path = `/${queryResults[0].user_type}`;
      const user_info = { user: req.body.token.token, path: path };
      console.log(path);
      req.login(user_info, function (err) {
        res.json(loginPacket);
      });
    }
    // console.log(req.session.id);
    // console.log(queryResults[0].user_type);

    // res.json(loginPacket);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.get("/logout", async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) throw err;
  });
});

module.exports = router;
