require('dotenv').config();

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrls: [String]
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } })

const Post = mongoose.model("Post", PostSchema);

const retrievePost = (id) => {
  return new Promise((resolve, reject) => {
    Post.findById(id).exec((err, doc) => {
      if (err) reject("Error retrieving post");
      resolve(doc);
    });
  })
}

const retrieveAllPosts = () => {
  return new Promise((resolve, reject) => {
    Post.find({}).exec((err, docs) => {
      if (err) reject("Error retrieving post");
      resolve(docs);
    });
  })
}

const createPost = (post) => {
  return new Promise((resolve, reject) => {
    if (post instanceof Object) {
      if (post.hasOwnProperty('title') && post.hasOwnProperty('content')) {
        if (!post.hasOwnProperty('imageUrls')) {
          post.imageUrls = [];
        }
        Post.create(post, (err, doc) => {
          if (err) reject("Could not create post");
          resolve(doc);
        })
      } else {
        reject("Unexpected post arguments");
      }
    } else {
      reject(`Invalid object type ${typeof (post)}`)
    }
  })
}

const updatePost = (id, update) => {
  return new Promise((resolve, reject) => {
    let post = {};
    if (update.hasOwnProperty('title')) {
      post.title = update['title'];
    }
    if (update.hasOwnProperty('content')) {
      post.content = update['content'];
    }
    if (update.hasOwnProperty('imageUrls')) {
      post.imageUrls = update['imageUrls'];
    }

    Post.findByIdAndUpdate(id, post, (err, doc) => {
      if (err) reject("Could not update post");
      resolve(doc);
    })
  })
}

const deletePost = (id) => {
  return new Promise((resolve, reject) => {
    Post.findByIdAndDelete(id, (err, doc) => {
      if (err) reject("Could not delete post");
      console.log("Post deleted");
      resolve(doc);
    })
  })
}

module.exports = {
  retrievePost,
  retrieveAllPosts,
  createPost,
  updatePost,
  deletePost
}

