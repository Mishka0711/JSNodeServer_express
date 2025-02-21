const express = require("express");
const router = express.Router();
const jsonParser = express.json();

const messageHandler = require("../../helpers/message-handler");

const commentController = require("../../controllers/commentController");

// определяем обработчик для маршрута "/api/v1/get-title"
router.post("/", jsonParser, commentController.post);

module.exports = router;
