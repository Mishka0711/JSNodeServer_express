const fs = require("fs"); //node:fs не работает
const path = require("path"); //node:path не работает

const messageHandler = require("../helpers/message-handler");

exports.get = (request, response) => {
  fs.readFile(
    path.join(__dirname, "../", "../", "../", "bd", "bd.json"),
    "utf8",
    (err, data) => {
      //всегда проверяем на ошибку, и лучше без else сразу завершить через return
      if (err) {
        console.log(err);
        //сообщить ошибку пользователю
        return;
      }

      const fileData = JSON.parse(data);

      if (fileData.title) {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ title: fileData.title }));
      } else {
        messageHandler.error(response, "Ошибка считывания данных");
      }
    }
  );
};
