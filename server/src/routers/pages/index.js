const express = require("express");
const router = express.Router();

const mainRouter = require("./main");
const productsRouter = require("./products");

router.use("/", mainRouter);
router.use("/products", productsRouter);

module.exports = router;
