var async = require('async');
var fs = require('fs');
var _ = require('underscore');

var data_array = [
  {name :'merlin',age :20,job:'worker'},
  {name :'sansan',age :20, job:'accountant'},
  {name :'chuyao',age:0,sex:'woman'}
]
var path = ['tests','./','name'];

function test() {

  var topics = [
    {items:[{name:'m'},{name:'n'}]},
    {items:[{name:'x'},{name:'y'}]}

  ];

  // 从array collect project item
  var all_items = [] ;
   var i = 0;
    _.map(topics, function(topic) {

      _.map(topic.items, function(item) {

        all_items[i++] = item;
        console.log(JSON.stringify(item));
        return item;
      });
      return topic;
    });
    console.log(JSON.stringify(all_items));

    var lkk ='';
    if (data_array.length) {
      console.log("==============");
    } else {
      console.log("====+++==========");

    }
    console.log(lkk);


  console.log(' test_view_type '+test_view_type);
  if (test_view_type) {
    console.log("======definded====");
  } else {
    console.log("======un definded====");
  }

  var test_view_type = test_view_type || 0;
  console.log(test_view_type);


}


test();
module.exports = test;
