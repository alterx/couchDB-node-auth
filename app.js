var express   = require('express'),
    routes    = require('./routes/routing'),
    api       = require('./routes/api'),
    ensure    = require('connect-ensure-login'),
    crud      = require('./libs/crud'),
    security  = require('./libs/security'),
    passport  = require('passport'),
    config = require('./config.js');

var app = module.exports = express();


app.configure(function(){
    app.use(config.server.staticUrl, express.compress());
    app.use(config.server.staticUrl, express['static'](config.server.clientApp));
    app.use(config.server.staticUrl, function(req, res, next) {
        res.send(404); 
    });
    //app.set('views', __dirname + '/views');
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

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    next();
});

security.init();


// Redirect to login if not authenticated
app.get('/', ensure.ensureLoggedIn('/login'),
    function(req, res) {
        routes.index(req, res);
    }
);

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

//Temporarly serving login form (needs to be moved into the client app)
app.get('/login', routes.login);

app.post('/login',
    security.login
);

// REST CRUD routes

//List is handled in the app using elasticsearch directly to provide a flexible way to work with faceted/filtered results

app.post('/api/list', function(req, res){
    crud.list('tasks', '', "projectId:NIMBLE", {} , function(err, result){
      res.send(result);
    });
});

app.post('/api/delete', function(req, res){
    api.delete(req, res);
});

app.post('/api/insert', function(req, res){
    api.insert(req, res);
});

app.post('/api/update', function(req, res){
     api.insert(req, res);
});


//Redirect every wrong route to index.html
app.get('*', routes.index);


//Start server
app.listen(config.server.port, function() {
    console.log("Express server listening on port "+config.server.port);
});

