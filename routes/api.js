var nano      = require('nano'),
	users     = require('../libs/users'),
    everyauth = require('everyauth'),
    async     = require('async');

var server = nano('http://admin:admin@127.0.0.1:5984/');
var db = server.use('users');

exports.userExists = function(req, res){
	var name = req.params.name;
	async.series(
	[
		function(callback){
	        users.findUser(callback,name);        
	    }
	],
	function(err, results) {
		if (err != "USRNOTFOUND"){
			res.json({});
		}else{
			res.json(results);
		}
	});
}

exports.insertUser = function(req, res){
	var name = req.params.name;
	var user = {
		"type": "user",
	    "pass": 1234,
	    "username": "user2"
	}
	async.series(
	[
		function(callback){
	        users.createUser(callback,user);        
	    }
	],
	function(err, results) {
		if (err != "USRNOTFOUND"){
			res.json({});
		}else{
			res.json(results);
		}
	});
}

exports.loggedIn = function(){
	res.json({
		logged : everyauth.loggedIn
	});
}