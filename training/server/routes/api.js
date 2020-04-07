const express = require('express');
const Router = express.Router();

Router.get('/', (req, res) => {
  res.send("this is the API router");
})

module.exports = Router;