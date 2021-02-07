const express = require("express");
const Joi = require("joi");

const router = express.Router();
const db = require("../db/db_login");

const bcrypt = require("bcrypt");
const salt = 10;

router.post("/register", async (req, res, next) => {

  bcrypt.hash(password, salt, (err, hashedPassword) => {
      if(err){
          console.log(err)
      }
    try {
        let queryResults = await db.registerAccount(req.body.token, hashedPassword, req.body.userType);
        res.json(queryResults);
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
  })
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
