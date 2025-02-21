const http = require("http"); //node:http не работает
const fs = require("fs"); //node:fs не работает
const path = require("path"); //node:path не работает

const host = "127.0.0.1";
const port = "7000";
const alloewdOrigins = ["http://127.0.0.1:5500", "http://127.0.0.1:7000"]; //массив разрешенных адресов

const notFound = (response) => {
  response.writeHead(404, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ message: "Not found2!" }));
};

const sendError = (response, message) => {
  response.writeHead(404, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ message: "message!" }));
};

const server = http.createServer((request, response) => {
  const origin = request.headers.origin;

  if (alloewdOrigins.includes(origin)) {
    response.setHeader("Access-Control-Allow-Origin", origin);
  }

  switch (request.method) {
    case "GET": {
      switch (request.url) {
        case "/": {
          response.writeHead(200, { "Content-type": "text/plain" });
          response.end("Hello world");
          break;
        }

        case "/api/get-title": {
          //путь до файла, с какой кодировкой читаем, и келлбек с ошибкой и дата
          fs.readFile(
            path.join(__dirname, "../", "bd", "bd.json"),
            "utf8",
            (err, data) => {
              //всегда проверяем на ошибку, и лучше без else сразу завершить через return
              if (err) {
                console.log("Error, weaaaa!");
                return;
              }

              const fileData = JSON.parse(data);

              if (fileData.title) {
                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ title: fileData.title }));
              } else {
                sendError(response, "В БД нет данных по заголовку");
              }
            }
          );
          // response.writeHead(200, { "Content-Type": "application/json" });
          // response.end(JSON.stringify({ title: "Server title" }));
          break;
        }

        case "/api/posts": {
          response.writeHead(200, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ title: "Server posts" }));
          break;
        }

        default: {
          notFound(response);
          break;
        }
      }

      break;
    }

    case "POST": {
      switch (request.url) {
        case "/api/posts": {
          fs.readFile(
            path.join(__dirname, "../", "bd", "bd.json"),
            "utf8",
            (err, data) => {
              if (err) {
                sendError(response, "Ошибка считывания БД!");
                return;
              }

              const fileData = JSON.parse(data);
              console.log(fileData);
              let body = [];

              request
                .on("data", (chunk) => body.push(chunk))
                .on("end", () => {
                  const post = Buffer.concat(body).toString();
                  console.log(post);

                  fileData.posts.push(JSON.parse(post));

                  fs.writeFile(
                    path.join(__dirname, "../", "bd", "bd.json"),
                    JSON.stringify(fileData),
                    (err) => {
                      if (err) {
                        sendError(response, "Ошибка записи данных");
                        return;
                      }
                      response.writeHead(200, {
                        "Content-Type": "application/json",
                      });
                      response.end(JSON.stringify({ sucess: true }));
                    }
                  );
                });
            }
          );
          break;
        }

        default: {
          notFound(response);
          return;
        }
      }
      break;
    }
    default: {
      notFound(response);
      break;
    }
  }
});

server.listen(port, host, () => {
  console.log(`Server is running in ${host}:${port}`);
});
