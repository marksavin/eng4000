const express = require("express");
const router = express.Router();
const db = require("../db/db_physician");

router.get("/getId/:token", async (req, res, next) => {
  try {
    let queryResults = await db.getId(req.params.token);
    console.log("PHYSICIAN RESULT", queryResults);
    res.json(queryResults);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/getPatientList/:token", async (req, res, next) => {
  try {
    let queryResults = await db.getPatientList(req.params.token);
    res.json(queryResults);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
