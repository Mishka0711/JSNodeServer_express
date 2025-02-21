const express = require("express");
const cors = require("cors");

// const http = require("http"); //node:http не работает
// const fs = require("fs"); //node:fs не работает
// const path = require("path"); //node:path не работает

const app = express();

const host = "127.0.0.1";
const port = "7000";
const alloewdOrigins = ["http://127.0.0.1:5500", "http://127.0.0.1:7000"]; //массив разрешенных адресов

const apiRouter = require("./src/routers/api/index");

app.use(cors({ origin: alloewdOrigins }));
//обработкой всех маршрутов занимается роутер
app.use("/api/v1", apiRouter);

app.listen(port, host, () => {
  console.log(`Server is running in ${host}:${port}`);
});
