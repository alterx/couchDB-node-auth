var express   = require('express'),
    routes    = require('./routes/routing'),
    api       = require('./routes/api'),
    User      = require('./libs/users'),
    passport = require('passport'), 
    LocalStrategy = require('passport-local').Strategy;

var app = module.exports = express();

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.methodOverride());
	app.use(express.session({secret: "90ndsj9dfdsf"}));
	app.use(passport.initialize());
  //app.use(passport.session());
	app.use(app.router);
	app.use(express.static(__dirname, '/public'));
	app.use(express.errorHandler());
});


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findUser( function(err, user) {
      console.log(user);
      user.id = user._id;
      return done(null, user);
    }, username);
  }
));




app.get('/', routes.index);

app.get('/home', routes.loggedIn);

app.get('/login', routes.login);

app.post('/login',
  passport.authenticate('local', { successRedirect: '/home',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

// Temporarly get user by name
app.get('/api/user/:name', api.userExists);

app.post('/api/user', api.insertUser);

app.get('*', routes.index);



app.listen(3000, function() {
    console.log("Express server listening on port 3000");
});

