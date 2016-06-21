
var test_print = require("./tests/index");
var test_exports = require("./tests/shape");
var http = require('http');
var child_process = require('child_process');

function testModuleExports() {
  test_print("world");
  console.log(test_exports.hello());
}
function testProcessArgv() {
  console.log(" prcess argv 0:"+process.argv[0]);
  console.log(" prcess argv 1:"+process.argv[1]);
}

testProcessArgv();

console.log("start child process");
var child = child_process.spawn('node',['./child_copy.js']);
child.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
});

child.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
});

child.on('close', function (code) {
    console.log('child process exited with code ' + code);
});

// var server = child_process.spawn('node', ['./server.js']);
// var client = child_process.spawn('node', ['./client.js']);
// start child process to request server
