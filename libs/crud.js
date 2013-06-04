var nano   = require('nano'),
    util   = require('util'),
    http   = require('http'),
    config = require('../config.js');

var server = nano(config.couchDB.host+':'+config.couchDB.port),
    db = null;


var expose = {

  list: function (type, id, query, filter, callback){

    var options = {
      hostname: config.elasticSearch.host,
      port: config.elasticSearch.port,
      path: "/" + type + "/_search?q=" + query,
      method: 'POST'
    };
    console.log(options)

    var req = http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        callback(null, chunk);
      });
    });

    req.on('error', function(err) {
        console.log( err);
    });

    /*
    var filString = JSON.stringify(filter);
    req.write(filString);
    */

    req.end();
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
