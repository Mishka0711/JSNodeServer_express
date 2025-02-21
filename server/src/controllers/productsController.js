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

      response.render("products.hbs", {
        // productList: fileData?.products?.length ? fileData.products : [], //для node>v14
        productList:
          fileData && fileData.products && fileData.products.length
            ? fileData.products
            : [],
      });

      // if (fileData.products) {
      //   // response.writeHead(200, { "Content-Type": "text/html" });
      //   response.render("products.hbs", {
      //     productsList: fileData.products,
      //   });
      //   // response.end(JSON.stringify({ products: fileData.products }));
      // } else {
      //   response.render("products.hbs", {
      //     productsList: fileData.products,
      //   });
      // }
    }
  );
};
