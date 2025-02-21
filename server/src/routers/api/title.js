const express = require("express");
const router = express.Router();

const messageHandler = require("../../helpers/message-handler");

const titleController = require("../../controllers/titleController");

// определяем обработчик для маршрута "/api/v1/get-title"
router.get("/", titleController.get);

module.exports = router;
