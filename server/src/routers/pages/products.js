const express = require("express");
const router = express.Router();

const productsController = require("../../controllers/productsController");

// определяем обработчик для маршрута "/api/v1/get-title"
router.get("/", productsController.get);

// определяем обработчик для маршрута "/api/v1/get-title"
// router.get("/", (request, response) => {
//   response.render("products.hbs", {
//     productList: [
//       { id: 0, text: "Первый1", isDone: false },
//       { id: 2, text: "Второй2", isDone: false },
//       { id: 3, text: "Третий3", isDone: true },
//     ],
//   });
// });

module.exports = router;
