var async = require('async');

// for testing bind
function point(params, cachekey,callback) {
  console.log("x= " + params.name);
  console.log("y= " + cachekey);
  return cachekey(null,params.name);
  // console.log("x,y = " + this.x + ", " + this.y);
}

function shape(params, cachekey,callback) {
  console.log("x= " + params.name);
//  console.log("y= " + cachekey);
  return cachekey(null,params.name);

}


var async_par = function() {
  async.parallel({
    Point:point.bind(null,{name:'point'}),
    Shape:shape.bind(null,{name:'shape'}),
    one: function(callback){
         setTimeout(function(){
             callback(null, 1);
         }, 200);
     },
     two: function(callback){
         setTimeout(function(){
             callback(null, 2);
         }, 100);
     }
  },
  function(err,result) {
    if(err) {
      console.log("error");
      return err;
    }
    console.log("result = " + result.one);
    console.log("result = " + result.two);
    console.log("result = " + result.Point);
    console.log("result = " + result.Shape);

  });
}

module.exports = async_par;
