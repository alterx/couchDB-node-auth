var crud      = require('../libs/crud'),
    async     = require('async');

exports.documentExists = function(req, res){
	var view = req.params.view;
	async.series(
	[
		function(callback){
	        crud.checkExistence(object.type, view, object._id , callback);        
	    }
	],
	function(err, results) {
		if (results != null){
			return res.json(results);
		}else{
			res.json({});
		}
	});
}

exports.insert = function(req, res){
    var content =  req.body.document;
	async.series(
	[
		function(callback){
	        crud.insert(content, callback);      
	    }
	],
	function(err, results) {
		if (err != "USRNOTFOUND"){			
            res.json(results);
		}else{
			res.json({});
		}
	});
}

exports.update = function(req, res){
	var document = req.params.document;
	async.series(
	[
		function(callback){
	        crud.insert(document, callback);        
	    }
	],
	function(err, results) {
		if (err != "USRNOTFOUND"){
			res.json(results);
		}else{
			res.json({});
		}
	});
}

exports.delete = function(req, res){
	var document = req.params.document;
	async.series(
	[
		function(callback){
	        crud.delete(document, callback);        
	    }
	],
	function(err, results) {
		if (err != "USRNOTFOUND"){
			res.json(results);
		}else{
			res.json({});
		}
	});
}
