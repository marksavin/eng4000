const express = require("express");
const Joi = require("joi");

const router = express.Router();
const db = require("../db/db_nurse");

router.get("/viewPatients/:nurseId", async (req, res, next) => {
  // const schema = Joi.object({
  //   nurseId: Joi.string().required(),
  // });

  // const result = schema.validate(req.body);
  // console.log(result);

  // if (result.error) {
  //   res.status(400).send(result.error.details[0].message);
  //   return;
  // }

  try {
    let queryResults = await db.currentPatientList(req.params.nurseId);
    res.json(queryResults);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/addNewSBAR/:patientId", async (req, res, next) => {
  try {
    let queryResults = await db.addNewSbar(req.params.patientId, req.body);
    res.json(queryResults);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/SBARHistory/:nurseId/:patientId", async (req, res, next) => {
  try {
    let queryResults = await db.SBARHistory(
      req.params.nurseId,
      req.params.patientId
    );
    res.json(queryResults);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/getId/:token", async (req, res, next) => {
  try {
    let queryResults = await db.getId(req.params.token);
    res.json(queryResults);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
