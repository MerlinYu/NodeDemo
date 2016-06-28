
var test_print = require("./tests/index");
var test_exports = require("./tests/shape");
var http = require('http');
var child_process = require('child_process');
var startServer = require('./server');
var async_demo = require('./tests/async_demo');
var _ = require('underscore');

function testModuleExports() {
  test_print("world");
  console.log(test_exports.hello());
}
function testProcessArgv() {
  console.log(" prcess argv 0:"+process.argv[0]);
  console.log(" prcess argv 1:"+process.argv[1]);
}

function testServerClient() {
  startServer();

  var child = child_process.spawn('node',['./client.js'], {
    stdio:[0,1,2,'ipc']
  });

  // the other wat to access child process stdout
  // child.stdout.on('data', function (data) {
  //   console.log('stdout: ' + data);
  // });
  //
  // child.stderr.on('data', function (data) {
  //     console.log('stderr: ' + data);
  // });
  //
  //
  child.on('close', function (code) {
      console.log('child process exited with code ' + code);
  });

  child.on('message', function(msg) {
    console.log("the cliend said : " + msg.hello);
    // process.exit(0);
  });
  child.send({hello:'hello client!'});
}

testProcessArgv();

//async_demo();
testServerClient();
