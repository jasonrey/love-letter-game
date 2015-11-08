var express = require('express'),
	app = express(),
	bodyParser = require('body-parser')
	cookieParser = require('cookie-parser')
	path = require('path'),
	http = require('http').Server(app),
	io = require('socket.io')(http);

var data = {
	connections: {},
	// name: id
	users: {},
	// id: name
	usersMap: {},
	rooms: {},
	roomsMap: {}
};

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'assets')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', require('./routes/index')(data));
app.use('/api', require('./routes/api')(data));

io.on('connection', function(socket) {
	data.connections[socket.id] = socket;

	socket.on('disconnect', function() {
		delete data.connections[socket.id];
		delete data.users[data.usersMap[socket.id]];
		delete data.usersMap[socket.id];
	});

	socket.on('log', function() {
		console.log(data);
	});
});

var server = http.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
