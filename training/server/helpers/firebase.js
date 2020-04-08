require('dotenv').config();

const { Storage } = require("@google-cloud/storage");

const storage = new Storage({ keyFilename: "./google.json" });
const bucketName = process.env.CLOUD_BUCKET;

const upload = (files) => {
  return Promise.all(
    files.map(file => {
      return new Promise((resolve, reject) => {
        const blob = storage.bucket(bucketName).file(file.originalname);
        const blobStream = blob.createWriteStream({
          contentType: file.mimetype
        })

        blobStream.on("error", err => {
          console.error(err);
          reject(err);
        })

        blobStream.on("finish", () => {
          const url = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
          blob.makePublic().then(() => {
            resolve(url);
          })
        })

        blobStream.end(file.buffer);
      })
    })
  )
}

module.exports = {
  upload
};