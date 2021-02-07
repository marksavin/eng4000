const express = require("express");
const Joi = require("joi");

const router = express.Router();
const db = require("../db/db_login");

const bcrypt = require("bcrypt");
const salt = 10;

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

router.get("/", async (req, res, next) => {
  try {
    let queryResults = await db.accountAuthentication(req.body);
    res.json(queryResults);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
