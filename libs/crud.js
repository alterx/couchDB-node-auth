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

    var req = http.request(options, function(res) {
      res.setEncoding('utf8');
        var resp = "";
      res.on('data', function (chunk) {
        resp += chunk;//callback(null, chunk);
      });
        
        res.on('end', function(){
            callback(null, resp);
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

    

  insert: function (object, callback){
    db = server.use(object.type);
    
      db.insert(object.source, object.id || {}, function(err, doc){
          if (!err) {
            if (doc.ok) {
              callback(null, doc);
            }else{
              callback(null, null);
            }
          }else{
            callback(err, null);
          }
      });
    
  },

  delete: function (object, callback){
    db = server.use(object.type);
    
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
