var _ = require('underscore');

//  array function
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
    },
    {
      "name":"sansan",
      "sex":"girl",
      "age":18
    }
  ]
};

var array = [1,3,2,7,5];

var nodeData = {
  node_name:"tree",
  child:[
    {name:"leaf"},
    {name:"limb"}
  ]
}
// console.log("node data = " + JSON.stringify(nodeData));
var first = _.first(data.child,1);
console.log("first = " + JSON.stringify(first));
// cut the last one data
console.log("initial = " + JSON.stringify(_.initial(data.child, 1)));
// leave the last two data
console.log("last = " + JSON.stringify(_.last(data.child, 2)));

//compact _.compact(array)
//Returns a copy of the array with all falsy values removed. In JavaScript, false, null, 0, "", undefined and NaN are all falsy.
//_.compact([0, 1, false, 2, '', 3]);
//=> [1, 2, 3]
// without
// union
// flatten
console.log("intersection  number = "+_.intersection([1, 2,0, 3], [101, 0,10], [0]));
// diference
// uniq
// object converts arrays into objects
console.log("object = " + JSON.stringify(_.object(['moe', 'mo', 'curly'], [30, 40, 50])));
// indexOf
// lastIndexOf
// sortedIndex
console.log("find index = "+_.findIndex([4, 6, 8, 12], function(value){
  if (value==6) {
    return true;
  }
  return false;
}));
// findLastIndex
var users = [{'id': 1, 'name': 'Bob', 'last': 'Brown'},
             {'id': 2, 'name': 'Ted', 'last': 'White'},
             {'id': 3, 'name': 'Frank', 'last': 'James'},
             {'id': 4, 'name': 'Ted', 'last': 'Jones'}];
console.log("find last index = "+_.findLastIndex(users, {name: 'Ted'}));
