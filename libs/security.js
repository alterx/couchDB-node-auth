var express   = require('express'),
    passport  = require('passport'),
    User      = require('./users'),
    LocalStrategy = require('passport-local').Strategy,
    app = express();

var expose = {
	init : function(){

		passport.use(new LocalStrategy(
		  function(username, password, done) {
		      User.findUser( function(err, user) {
		        if (err) { return done(err); }
		        if (!user) {
		          return done(null, false, { message: 'Incorrect username.' });
		        }
		        user.id = user.id;
		        return done(null, user);

		      }, username);
		  }
		));
		passport.serializeUser(function(user, done) {
		  done(null, user.id);
		});

		passport.deserializeUser(function(id, done) {
		  User.findUser(done, id);
		});
	},

	isAuthenticated : function(req, res){
		return true;
	},

	isAdmin : function(req, res){
		return true;
	},

	login : function(req, res, next){		
		return passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' })(req, res, next);
	},

	logout : function(req, res){
		req.logout();
    	res.redirect('/');
	}

} 
module.exports = expose;