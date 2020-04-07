const express = require('express');
const Router = express.Router();

const DB = require("../../database");

Router.get("/", (req, res) => {
  DB.Post.retrieveAllPosts()
    .then(posts => {
      console.log(`${posts.length} post${posts.length == 1 ? '' : 's'} retrieved`)
      res.status(200).send(posts);
    });
})

Router.post("/", (req, res) => {

  let post = {
    title: req.body.title,
    content: req.body.content
  }

  if (req.body.imageUrls) {
    post.imageUrls = req.body.imageUrls;
  }

  DB.Post.createPost(post)
    .then(post => {
      console.log(`Post ${post.id} created at ${new Date(post.created_at).toLocaleString()}`)
      res.status(201).send(post);
    })
})

Router.get("/:id", (req, res) => {
  DB.Post.retrievePost(req.params.id)
    .then(post => {
      console.log(`Post ${post.id} retrieved`);
      res.status(200).send(post);
    })
})

Router.put("/:id", (req, res) => {
  DB.Post.updatePost(req.params.id, { ...req.body })
    .then((post) => {
      console.log(`Post ${post.id} updated at ${new Date(post.updated_at).toLocaleString()}`)
      res.status(200).send(post);
    })
})

Router.delete("/:id", (req, res) => {
  DB.Post.deletePost(req.params.id)
    .then(() => {
      console.log(`Post successfully deleted`)
      res.sendStatus(200);
    })
})

module.exports = Router;