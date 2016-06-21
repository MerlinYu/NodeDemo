
var http = require('http');

console.log("start server port:8124");
http.createServer(function (request, response) {

  console.log(request.method);
  console.log(request.headers);

  response.writeHead(200, { 'Content-Type': 'text-plain' });
  response.end('Hello http world!\n');
  console.log("server response headres : \n"+response.headers);

}).listen(8124);
