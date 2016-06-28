var _ = require('underscore');


var data = {
  "layout_params": {
    "layout_width": "match_parent",
    "layout_height": "wrap_content"
  },
  "child":[
    {
      "name":"merlin",
      "sex":"man",
    },
    {
      "name":"smart ",
      "sex":"girl"
    }
  ]
};

_.each(data.child.slice(0,2), function(child, index) {
  console.log("child_ " + index + " data " + JSON.stringify(child));
});

// did not add the property of age forEach
_.each(data, function(value, key) {
  console.log("key = " + key + " value = " + JSON.stringify(value));
  value.age = 10;
});
console.log("each value " + JSON.stringify(data.child));

// add the age property
_.map(data.child, function(value,index) {
    // console.log("map value " + JSON.stringify(value));
    if (!value.age) {
      value.age = 11;
    }
});
console.log("map value " + JSON.stringify(data.child));
var memo_result = _.reduce(data.child, function(memo, value, index){
  return memo + value.name + " ";
},"");
console.log("reduce result " + JSON.stringify(memo_result));

// find the first one or return undefined
var even = _.find([1, 4, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
console.log("find num%2 the first value is:" + even);
//filter_.filter(list, predicate, [context]) Alias: select
//Looks through each value in the list, returning an array of all the values that pass a truth test (predicate).

//contains_.contains(list, value, [fromIndex]) Alias: includes
//Returns true if the value is present in the list. Uses indexOf internally, if list is an Array. Use fromIndex to start your search at a given index.
var isContain = _.contains(["name","sex","age"],"name" );
console.log("is contain " + isContain);

var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
console.log("pluck "+_.pluck(stooges, 'name'));

var stooges = [{name: 'moe', age: 50}, {name: 'ry', age: 70}, {name: 'curly', age: 60}];
console.log(_.groupBy(stooges, 'age'));

var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
console.log(_.indexBy(stooges, 'name'));

// shuffle 洗牌
_.shuffle([1, 2, 3, 4, 5, 6]);
// => [4, 1, 6, 3, 5, 2]
// sample random return
_.sample([1, 2, 3, 4, 5, 6], 3);
// => [1, 6, 2]

console.log("toarray " + JSON.stringify(_.toArray(stooges)));
