var express   = require('express'),
    everyauth = require('everyauth'),
    routes    = require('./routes/routing'),
    api       = require('./routes/api');

var app = module.exports = express();

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.methodOverride());
	app.use(express.session({secret: "90ndsj9dfdsf"}));
	app.use(everyauth.middleware());
	app.use(app.router);
	app.use(express.static(__dirname, '/public'));
	app.use(express.errorHandler());
});


app.get('/', routes.index);

// Temporarly get user by name
app.get('/api/user/:name', api.userExists);

app.post('/api/user', api.insertUser);

app.get('')

app.get('*', routes.index);



// Routes
/*
app.get('/', routes.routing);


// JSON API

app.get('/api/get', api.get);

// redirect all others to the index (HTML5 history)/*
/*app.get('*', routes.routing);
*/

//RESTful Routes
/*
app.get('/api/posts', api.posts);
app.get('/api/post/:post_id', api.post);
app.post('/api/posts', api.postAdd);
app.put('/api/post/:post_id', api.postEdit);
app.delete('/api/post/:post_id', api.postDelete);*/



app.listen(3000, function() {
    console.log("Express server listening on port 3000");
});

