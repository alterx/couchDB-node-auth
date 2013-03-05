
exports.index = function(req, res){
	res.sendfile('./views/index.html');

};

exports.login = function(req, res){
	res.sendfile('./views/login.html');
};


exports.loggedIn = function(req, res){
	res.sendfile('./views/loggedIn.html');
};
