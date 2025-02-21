const express = require("express");
const router = express.Router();

// определяем обработчик для маршрута "/api/v1/get-title"
router.get("/", (request, response) => {
  response.render("index.hbs");
});

module.exports = router;
