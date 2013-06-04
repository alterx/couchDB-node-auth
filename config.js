var path = require('path');

var expose = {
	couchDB : {
		host : "http://admin:admin@127.0.0.1",
		port : "5984" 

	},

	server : {
		secret : "holy chimichangas!",
		staticUrl : "/public",
		port : "3000",
		clientApp: path.resolve(__dirname, '../nimble/app')
	},

	elasticSearch : {
		host : "localhost",
		port : "9200"
	}

}

module.exports = expose;