
// client to request server
var http = require('http');

console.log("start requst server port:8124.....");
var request = http.get('http://127.0.0.1:8124', function(response){
  console.log("response status code" + response.statusCode);
  response.on('data', function(chunk) {
    console.log("response data " + chunk);
  });
  response.on('end',function() {
    console.log("response data end!");
  })
});
