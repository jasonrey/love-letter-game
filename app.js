var express = require('express'),
	app = express(),
	bodyParser = require('body-parser')
	cookieParser = require('cookie-parser')
	path = require('path'),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	data = require('./classes/data'),
	User = require('./classes/user');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'assets')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));

io.on('connection', function(socket) {
	var user = new User(socket);
	data.users[socket.id] = user;

	socket.on('disconnect', function() {
		delete data.usersNameMap[user.name]
		delete data.users[socket.id];

		if (user.roomid.length > 0) {
			delete data.roomsNameMap[data.rooms[user.roomid].name];
			delete data.rooms[user.roomid];
		}
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
