const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/users", function (req, res) {
  axios
    .get(`https://randomuser.me/api/`, { params: req.query })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = router;
