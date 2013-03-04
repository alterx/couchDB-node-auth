var nano   = require('nano'),
    util   = require('util');

var server = nano('http://admin:admin@127.0.0.1:5984/');
var db = server.use("users");


exports.findUser = function(callback, user){
  db.view('users','UserExistence', {key: user}  , function(err, body) {
    if (!err) {
      console.log(body)
      if (typeof body.rows[0] !== 'undefined') {
        callback(null, body.rows[0].value);
      }else{
        callback("USRNOTEXISTS", null);
      }
    }
  });
}

exports.createUser = function(callback, user){
  db.insert(user, function(err, docs){
    if(err) throw err;

    callback(null, user);
  });
}
/*

exports.findOrCreateUser = function(twitterUserData, accessToken, accessTokenSecret, promise) {
  users.view('docs/twitterId', {key: twitterUserData.id_str}, function(err, docs) {
    if (err) {
      console.log("Error using users/_design/docs/_view/twitterId:");
      console.log(err);
      promise.fail(err);
      return;
    }
    if (docs.length > 0) {
      var user = docs[0].value;
      console.log('user exists: ' + util.inspect(user));
      promise.fulfill(user);
    } else {
      var doc = {
        accessToken: accessToken,
        accessTokenSecret: accessTokenSecret,
        name: twitterUserData.name,
        twitterId: twitterUserData.id
      };
      c.database('users').save(doc, function(err, res) {
        if (err) {
          console.log("Error using users:");
          console.log(err);
          promise.fail(err);
          return;
        }
        console.log('user created: ' + util.inspect(doc));
        promise.fulfill(doc);
      })
    }
  });
}*/