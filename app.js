var express   = require('express'),
    routes    = require('./routes/routing'),
    api       = require('./routes/api'),
    User      = require('./libs/users'),
    passport  = require('passport'), 
    ensure    = require('connect-ensure-login'),
    crud      = require('./libs/crud'),
    LocalStrategy = require('passport-local').Strategy,
    config = require('./config.js');

var app = module.exports = express();

app.configure(function(){
  app.use(config.server.staticUrl, express.compress());
  app.use(config.server.staticUrl, express['static'](config.server.clientApp));
  app.use(config.server.staticUrl, function(req, res, next) {
    res.send(404); 
  });

	app.set('views', __dirname + '/views');
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.methodOverride());
	app.use(express.session({secret: config.server.secret}));
	app.use(passport.initialize());
  app.use(passport.session())
	app.use(app.router);
	app.use(express.static(__dirname, config.server.staticUrl));
	app.use(express.errorHandler());
});


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findUser(done, id);
});


passport.use(new LocalStrategy(
  function(username, password, done) {
      crud.checkExistence('users2', 'UserExistence', username, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        user.id = user.id;
        return done(null, user);

      });
  }
));


/*app.get('/', routes.index);*/

app.get('/', ensure.ensureLoggedIn('/login'),
  function(req, res) {
    routes.index(req, res);
  }
);

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.get('/login', routes.login);

app.post('/login',
  passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' })
);

// Temporarly get user by name
app.get('/api/user/:name', api.userExists);

app.post('/api/user', api.insertUser);

app.post('/api/tasks', function(req, res){
    crud.list('tasks', '', "projectId:NIMBLE", {} , function(err, result){
      res.send(result);
    });
});

app.post('/api/insert', api.checkPostParams);

app.get('*', routes.index);



app.listen(config.server.port, function() {
    console.log("Express server listening on port "+config.server.port);
});

