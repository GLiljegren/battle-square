const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

router.get("/create", (req, res) => {
  res.send({ response: { data: "45HR" } }).status(200);
});

module.exports = router;
