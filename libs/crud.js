var nano   = require('nano'),
    util   = require('util');

var server = nano('http://admin:admin@127.0.0.1:5984/');
var db = null;


var expose = {

  list: function (type, id, query, filter, callback){
    //server.use(type);
  },

  insert: function (type, id, object, callback){
    db = server.use(type);
    if(!id){
      db.insert(object, function(err, doc){
        if(err) throw err;

        callback(null, body.rows[0].value);
      });
    }else{

    }
  },

  delete: function (type, id, callback){
    db = server.use(type);
    
  },

  checkExistence: function (type, view, id, callback) {
    db = server.use(type);
    console.log(type)
    db.view(type, view, {key: id}  , function(err, body) {
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

}
module.exports = expose;
/*
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

*/