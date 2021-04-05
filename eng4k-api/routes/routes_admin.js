const express = require("express");

const router = express.Router();
const db = require("../db/db_admin");
const bcrypt = require("bcrypt");
const salt = 10;

router.post("/addPatient", async (req, res, next) => {
  try {
    let queryResults = await db.addPatient(req.body);
    res.json(queryResults);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/addNurse", (req, res, next) => {
  bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
    if (err) {
      console.log(err);
    }
    try {
      let addNurse = db.addNurse(req.body, hashedPassword, "nurse");
      res.json(addNurse);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });
});

router.post("/addPhysician", (req, res, next) => {
  bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
    if (err) {
      console.log(err);
    }
    try {
      let addPHysician = db.addPhysician(req.body, hashedPassword, "physician");
      res.json(addPHysician);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });
});

router.post("/addFamily", (req, res, next) => {
  bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
    if (err) {
      console.log(err);
    }
    try {
      let addFamily = db.addFamily(req.body, hashedPassword, "family");
      res.json(addFamily);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });
});

router.get("/getNurseList", async (req, res, next) => {
  try {
    let getNurseList = await db.getNurseList();
    res.json(getNurseList);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/getPhysicianList", async (req, res, next) => {
  try {
    let getPhysicialList = await db.getPhysicianList();
    res.json(getPhysicialList);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/unlockAccount", async (req, res, next) => {
  try {
    let queryResults = await db.unlockAccount(req.body.token);
    res.json(queryResults);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
