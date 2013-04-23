var express   = require('express'),
    routes    = require('./routes/routing'),
    api       = require('./routes/api'),
    User      = require('./libs/users'),
    passport  = require('passport'), 
    ensure    = require('connect-ensure-login'),
    LocalStrategy = require('passport-local').Strategy;

var app = module.exports = express();

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.methodOverride());
	app.use(express.session({secret: "holy chimichangas!"}));
	app.use(passport.initialize());
  app.use(passport.session())
	app.use(app.router);
	app.use(express.static(__dirname, '/public'));
	app.use(express.errorHandler());
});


passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(id, done) {
  User.findUser(done, id);
});


passport.use(new LocalStrategy(
  function(username, password, done) {
      User.findUser( function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        user.id = user.username;
        return done(null, user);

      }, username);
  }
));


app.get('/', routes.index);

app.get('/home', ensure.ensureLoggedIn('/login'),
  function(req, res) {
    routes.loggedIn(req, res);
  }
);

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.get('/login', routes.login);

app.post('/login',
  passport.authenticate('local', { successReturnToOrRedirect: '/home', failureRedirect: '/login' })
);

// Temporarly get user by name
app.get('/api/user/:name', api.userExists);

app.post('/api/user', api.insertUser);

app.get('*', routes.index);


/* Listen funtion */
app.listen(3000, function() {
    console.log("Express server listening on port 3000");
});

