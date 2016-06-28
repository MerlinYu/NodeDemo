this.x = 9;
var module = {
  x:81,
  getX:function() {
    return this.x;
  }
};
console.log("moudle getx: " + module.getX());

var retrieveX = module.getX;
console.log("this.x " + retrieveX());
var boundGetX = retrieveX.bind(module);
console.log("this.x " + boundGetX());

// Point.prototype.toString = function() {
//   return this.x + ',' + this.y;
// };

//var p = new Point(1, 2);

// not supported in the polyfill below,
// works fine with native bind:
// var YAxisPoint = Point.bind(null, 0/*x*/);
// console.log(" 2=== point to string " + YAxisPoint.x);
//
// var emptyObj = {};
// var YAxisPoint = Point.bind(null, {name: 'HOME_BANNERS_V2'});
// YAxisPoint();

// console.log("3=== point to string %s",YAxisPoint.toString());
//
// var axisPoint = new YAxisPoint(5);
// axisPoint.toString(); // '0,5'
// console.log("4==== point to string %s", axisPoint.toString());
