const express = require('express');
const Router = express.Router();

const PostRoutes = require('./post');

Router.use((req, res, next) => {
  res.contentType("application/json");
  next();
})

Router.use("/posts", PostRoutes);

Router.get('/', (req, res) => {
  res.send("API Endpoint");
})

module.exports = Router;