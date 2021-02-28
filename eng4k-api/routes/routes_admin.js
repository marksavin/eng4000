const express = require("express");

const router = express.Router();
const db = require("../db/db_admin");

router.post("/addPatient", async (req, res, next) => {
  try {
    let queryResults = await db.addPatient(req.body);
    console.log(queryResults);
    //   res.json(queryResults);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/addNurse", async (req, res, next) => {
  try {
    let queryResults = await db.addNurse(req.body);
    console.log(queryResults);
    //   res.json(queryResults);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/addPhysician", async (req, res, next) => {
  try {
    let queryResults = await db.addPhysician(req.body);
    console.log(queryResults);
    //   res.json(queryResults);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/addFamily", async (req, res, next) => {
  try {
    let queryResults = await db.addFamily(req.body);
    console.log(queryResults);
    //   res.json(queryResults);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
