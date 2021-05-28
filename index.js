const express = require("express");
const app = express();
const fs = require("fs");
const multer = require("multer");
const { dirname } = require("path");
const folder = multer.diskStorage({
  destination: "./upload",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: folder });
const port = process.env.PORT || 5000;

const uploadRouter = express.Router();

uploadRouter
  .route("/upload")
  .get((req, res) => {
    return res.sendFile(__dirname + "/index.html");
  })
  .post(upload.single("file"), (req, res, next) => {
    console.log(req.body.path);
    fs.rename(
      __dirname + "/upload/" + req.file.originalname,
      __dirname + `/${req.body.path}/` + req.file.originalname,
      (error) => {
        console.log(error);
      }
    );
    return res.json({ message: "Hit the post handler" });
  });

app.use("/api", uploadRouter);
app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
