var async = require('async');
var fs = require('fs');
var _ = require('underscore');

var data_array = [
  {name :'merlin',age :20,job:'worker'},
  {name :'sansan',age :20, job:'accountant'},
  {name :'chuyao',age:0,sex:'woman'}
]
var path = ['tests','./','name'];

// for testing bind
function point(params, cachekey,callback) {
  if (arguments.length ==2 ) {
    callback = cachekey;
    cachekey = '';
  }
  console.log("x= " + params.name);
  return callback(null,params.name);
  // console.log("x,y = " + this.x + ", " + this.y);
}

function shape(params, cachekey,callback) {
  if (arguments.length ==2 ) {
    callback = cachekey;
    cachekey = '';
  }

  console.log("x= " + params.name);
//  console.log("y= " + cachekey);
  return callback(null,params.name);
}


function async_bind() {
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

// return a new array
function async_concat() {
  async.concat(path,fs.readdir,function(err,item) {
    if (err) {
      return 'read file error!';
    }
  //  console.log(item);
  })

  async.concat(path,function(item,callback) {
    console.log(" concat deal function ");
    console.log(item);
    callback(null,item + item);

  }, function(err, files) {
    console.log(files);
  })
}

// return first value that passes an async truth test
function async_detect() {
  async.detect(path, function(filePath, callback) {
    fs.access(filePath, function(err) {
        callback(null, filePath)
    });
}, function(err, result) {
  console.log(result);
});
}

// return
function async_each() {
  async.each(path,function(item,callback) {
    console.log("file name :"+item);
    callback(null,item);

  }, function(err,results) {
    console.log(results);
    if (err) {
      console.log('failed');
    } else {
      console.log("success");
    }
  });


  async.forEachOf(data_array[0],function(value,key,callback) {
      console.log('value = ' + value + ' key = ' + key);
      callback();
  },function(err) {
    if (err) {
      console.log('failed');
    } else {
      console.log('success');
    }
  });
}

// retuan true if every ittem passes is true;
function async_every() {
  async.every(data_array,function(item,callback) {
    console.log(item);
    callback(null,item);

  },function(err,result) {
    console.log(" error "+err);
    console.log(result);
  });
}

// 无论如何需要返回callback
// return a new array if item = true;
function async_filter() {

  var result = async.filter(path, function(item,callback){
    // fs.access(item, function(err) {
    //    callback(null, !err)
    // });
    var result = item !='name';
    if (result == true) {
      console.log("===filter===" + result);
     callback(null, result);
   } else {
     callback(null, result);
   }
}, function(err,result) {
   console.log('filter result: ' + result);
  });

  console.log(path)
}

// return a map array
function async_map() {
  async.map(data_array,function(item,callback){
    console.log(item);
    item.address = item.name+item.age;
    callback(null,item);
  },function(err,results) {
    console.log(results);
  });

  async.map(path,fs.stat,function(err,results) {
    console.log(results);
  })

  var data = [
   {name :'merlin',age :20,job:'worker', items:[{mall:'hello',name:'mall'},{mall:'hello',name:'share'}]},
   {name :'sansan',age :20, job:'accountant',items:[{mall:'hello',name:'mall'},{mall:'hello',name:'share'}]},
   {name :'chuyao',age:0,sex:'woman',items:[{mall:'hello',name:'mall'},{mall:'hello',name:'share'}]}
 ];
  // _.omit(data,'name');
 // filter data property
 async.map(data, function(row,callback){
   async.map(row.items,function(item,callback){
     callback(null,_.omit(item,'name'));
   },function(err,result){
     row.items = result;
   });
   callback(null,row);
   }, function(err,result) {
     data = result;
 });
 console.log('filter result: ' + JSON.stringify(data));

 // filter data property
  var result = _.map(data, function(row) {
    row.items = _.map(row.items,function(item) {
      return _.omit(item,'mall');
    });
    return row;
  });
  console.log(JSON.stringify(result));

}

function async_map_value() {
  async.mapValues({
    f1: '../',
    f2: './',
    f3: 'tests'
  }, function (file, key, callback) {
    callback(null,file + key);
  }, function(err, result) {
    console.log(JSON.stringify(result));
    //{"f1":"../f1","f2":"./f2","f3":"testsf3"}
  });
}

//reduce减少; 缩小; 使还原; 使变弱
function async_reduce() {
  async.reduce([1,2,3], 0, function(memo, item, callback) {
    // pointless async:
    process.nextTick(function() {
        callback(null, memo + item);
    });
  }, function(err, result) {
    console.log(result);
    // 6
    // result is now equal to the last value of memo, which is 6
  });
}

//return pass callback(null,false) result
function async_reject() {
  async.reject(['file1','../','file3'], function(filePath, callback) {
    if (filePath=='../') {
      callback(null,false);
    }  else {
      callback(null,true);
    }
  }, function(err, results) {
    console.log(results);
    // [ '../' ]
      // results now equals an array of missing files
      // createFiles(results);
  });
}
// Returns true if at least one element in the coll satisfies an async test.
function async_some() {
  async.some(path, function(filePath, callback) {
    fs.access(filePath, function(err) {
        callback(null, !err)
    });
}, function(err, result) {
  console.log(result);
    // if result is true then at least one of the files exists
});
}

function async_sortby() {
  async.sortBy([1,9,3,5], function(x, callback) {
    callback(null, x);
}, function(err,result) {
  console.log(result);

});
}

function async_transform() {
  async.transform([1,2,3], function(acc, item, index, callback) {
    // pointless async:
    process.nextTick(function() {
        acc.push(item * 2);
        callback(null);
    });
  }, function(err, result) {
    console.log(result);
      // result is now equal to [2, 4, 6]
  });
}

// Applies the provided arguments to each function in the array
function enableSearch(string,callback) {
  callback(null,string + " found ");
}

function updateSchema(string,callback) {
  callback(null,string +" update");
}

var bucket = 'bucket ';
// applies the provided arguments to each function
function async_apply_each() {
  async.applyEach([enableSearch, updateSchema], bucket, function(err,results) {
    console.log(results);
    //[ 'bucket  found ', 'bucket  update' ]
  });
}

function async_auto() {
  async.auto({
      get_data: function(callback) {
          console.log('in get_data');
          // async code to get some data
          callback(null, 'data', 'converted to array');
      },
      make_folder: function(callback) {
          console.log('in make_folder');
          // async code to create a directory to store a file in
          // this is run at the same time as getting the data
          callback(null, 'folder');
      },
      write_file: ['get_data', 'make_folder', function(results, callback) {
          console.log('in write_file', JSON.stringify(results));
          // once there is some data and the directory exists,
          // write the data to a file in the directory
          callback(null, 'filename');
      }],
      email_link: ['write_file', function(results, callback) {
          console.log('in email_link', JSON.stringify(results));
          // once the file is written let's email a link to it...
          // results.write_file contains the filename returned by write_file.
          callback(null, {'file':results.write_file, 'email':'user@example.com'});
      }]
  }, function(err, results) {
      console.log('err = ', err);
      console.log('results = ', results);
  });

// in get_data
// in make_folder
// in write_file {"get_data":["data","converted to array"],"make_folder":"folder"}
// in email_link {"get_data":["data","converted to array"],"make_folder":"folder","write_file":"filename"}
// err =  null
// results =  { get_data: [ 'data', 'converted to array' ],
//   make_folder: 'folder',
//   write_file: 'filename',
//   email_link: { file: 'filename', email: 'user@example.com' } }
}

function async_parallel() {
  async.parallel({
    one:function(callback) {
      callback(null,'one');

    },
    two:function(callback) {
      callback(null,'two');
    }
  },function(err,results) {
    if (err) {

    } else {

    }
    console.log(JSON.stringify(results));
    //{"one":"one","two":"two"}
  });
}

// the previous function will send resutls to next function
function async_waterfall() {

  async.waterfall([
    function(callback) {
        callback(null, 'one', 'two');
    },
    function(arg1, arg2, callback) {
        // arg1 now equals 'one' and arg2 now equals 'two'
        callback(null, 'three');
    },
    function(arg1, callback) {
        // arg1 now equals 'three'
        callback(null, 'done');
    }
  ], function (err, result) {
      // result now equals 'done'
  });

  // Or, with named functions:
  async.waterfall([
      myFirstFunction,
      mySecondFunction,
      myLastFunction,
  ], function (err, result) {
      // result now equals 'done'
  });
  function myFirstFunction(callback) {
      callback(null, 'one', 'two');
  }
  function mySecondFunction(arg1, arg2, callback) {
      // arg1 now equals 'one' and arg2 now equals 'two'
      callback(null, 'three');
  }
  function myLastFunction(arg1, callback) {
      // arg1 now equals 'three'
      callback(null, 'done');
  }
  // async.water
}

function async_series() {
  async.series({
    one: function(callback) {
        setTimeout(function() {
            callback(null, 1);
        }, 200);
    },
    two: function(callback){
        setTimeout(function() {
            callback(null, 2);
        }, 100);
    }
}, function(err, results) {
  console.log(JSON.stringify(results));
    // results is now equal to: {one: 1, two: 2}
});
}
// =======================================================utils======================================
// apply and arguments to function
function async_apply() {
  // using apply
  async.parallel([
    async.apply(fs.writeFile, 'testfile1', 'test1'),
    async.apply(fs.writeFile, 'testfile2', 'test2')
  ]);
}


function async_test() {

  /*this all async collection funaction */
    // async_concat();
    // async_detect();
    // async_each();
    // async_every();
    // async_filter();
    //  async_map();
    // async_map_value();
    // async_reduce();
    // async_reject();
    // async_some();
    // async_sortby();
    // async_transform();

    /*this is async control flow function*/

    // async_bind();
    // async_apply_each();
    // async_auto();
    // async_waterfall();
    // async_parallel();
    // async_series();

/*=========this is utils function================*/
  // async_apply();


}

async_test();
module.exports = async_test;
