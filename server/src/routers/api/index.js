const express = require("express");
const router = express.Router();

const titleRouter = require("./title");
const commentRouter = require("./comment");
router.use("/title", titleRouter);
router.use("/comment", commentRouter);

module.exports = router;
