const express = require("express");
const cors = require("cors");
const path = require("path"); //node:path не работает
// const expressHbs = require("express-handlebars"); для node>14

// const http = require("http"); //node:http не работает
// const fs = require("fs"); //node:fs не работает
// const path = require("path"); //node:path не работает

const app = express();
const hbs = require("hbs");

const host = "127.0.0.1";
const port = "7000";
const alloewdOrigins = ["http://127.0.0.1:5500", "http://127.0.0.1:7000"]; //массив разрешенных адресов

const apiRouter = require("./src/routers/api/index");
const viewRouter = require("./src/routers/pages/index");

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

// app.engine(
//   "hbs",
//   expressHbs.engine({
//     layoutsDir: "views/layouts",
//     defaultLayout: "layout",
//     extname: "hbs",
//   })
// );

app.use(express.static(path.join(__dirname, "public")));

app.use(cors({ origin: alloewdOrigins }));
//обработкой всех маршрутов занимается роутер
app.use("/api/v1", apiRouter);
app.use("/", viewRouter);

app.listen(port, host, () => {
  console.log(`Server is running in ${host}:${port}`);
});
