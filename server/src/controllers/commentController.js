const messageHandler = require("../helpers/message-handler");
const fs = require("fs"); //node:fs не работает
const path = require("path"); //node:path не работает

//контроллер для гет
exports.get = (request, response) => {};

//контроллер для пост
exports.post = (request, response) => {
  //предохранитель чтобы контроллер не отработал лишний раз
  if (!request.body) {
    return messageHandler.error(response, "Ошибка считывания данных");
  }

  fs.readFile(
    path.join(__dirname, "../", "../", "../", "bd", "bd.json"),
    "utf8",
    (err, data) => {
      if (err) {
        return messageHandler.error(response, "Ошибка считывания данных");
      }

      const fileData = JSON.parse(data);

      if (fileData.comments && request.body.comment) {
        fileData.comments.push(request.body.comment);
      } else {
        messageHandler.error(response, "Ошибка считывания данных");
      }

      fs.writeFile(
        path.join(__dirname, "../", "../", "../", "bd", "bd.json"),
        JSON.stringify(fileData),
        (err) => {
          if (err) {
            return messageHandler.error(response, "Ошибка записи данных");
          }
          messageHandler.success(response, JSON.stringify({ sucсess: true }));
          // response.writeHead(200, {
          //   "Content-Type": "application/json",
          // });
          // response.end(JSON.stringify({ sucess: true }));
        }
      );
    }
  );
};
