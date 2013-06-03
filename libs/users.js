var nano   = require('nano'),
    util   = require('util');

var server = nano('http://admin:admin@127.0.0.1:5984/');
var db = server.use("users2");


exports.findUser = function(callback, user){

  db.view('users2','UserExistence', {key: user}  , function(err, body) {
    if (!err) {
      if (body.rows.length  > 0) {
        callback(null, body.rows[0].value);
      }else{
        callback(null, null);
      }
    }else{
      throw err;
    }
  });
}

exports.createUser = function(callback, user){
  db.insert(user, function(err, docs){
    if(err) throw err;

    callback(null, user);
  });
}
