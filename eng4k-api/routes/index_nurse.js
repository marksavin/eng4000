const express = require("express");
const Joi = require("joi");

const router = express.Router();
const db = require("../db/index_nurse");

router.get("/viewPatients", async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });

  const result = schema.validate(req.body);
  console.log(result);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  try {
    let queryResults = await db.currentPatientList(req.body.id);
    res.json(queryResults);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
