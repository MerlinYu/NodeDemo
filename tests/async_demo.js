
var timeout = 1000;
function async (fn, callback) {
  setTimeout(function() {

    try {
      callback(null, fn());
    }catch (err) {
      callback(err);
    }

  }, timeout);

}

var testAsync = function() {
  console.log(" start async process to deal with affairs");
  async('hello', function(err,data) {
    if(err) {
      console.log(" Error: " + err.message);
    } else {
      //
      console.log("Data: " + data);
    }
  });
}

module.exports = testAsync;
