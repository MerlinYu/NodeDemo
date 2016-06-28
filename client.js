
// client to request server
// ipc way to connect with server process
var http = require('http');

var startClient = function() {
  console.log("start requst server port:8124.....");
  var request = http.get('http://127.0.0.1:8124', function(response){
    console.log("response status code" + response.statusCode);
    response.on('data', function(chunk) {
  //    console.log("response data " + chunk);
    });
    response.on('end',function() {
      console.log("response data end!");
    })
  });
}


process.on('message', function(msg) {
    console.log("server said :" + msg.hello);
    startClient();
    process.send({hello : 'hello server!'});
    // process.exit(0);
});

module.exports = startClient;
