exports.error = (response, message) => {
  response.writeHead(404, { "Content-Type": "application/json" });
  //если ключ значение одинаковы то можно упростить убрав двоеточие
  response.end(JSON.stringify({ message }));
};

exports.success = (response, message) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  //если ключ значение одинаковы то можно упростить убрав двоеточие
  response.end(message);
};
