
//

var fs = require('fs');

// normal file copy
function copyNormalFile(src,dst) {
  fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}
function testCopyFile () {
  var sourcePath = './package.json';
  var destPath = './test.json';
  copyNormalFile(sourcePath,destPath);
  var readStream = fs.createReadStream(sourcePath);
  readStream.on('data', function(chunk) {
    console.log("start read file! \n content = " + chunk);
  });
  readStream.on('end',function() {
    console.log("read file end!\n");
  });
}
testCopyFile();
