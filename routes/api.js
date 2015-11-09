var express = require('express');
var router = express.Router();
var data = require('./../classes/data');
var Room = require('./../classes/room');

router.post('/user/register', function(req, res, next) {
	state = false;

	if (data.usersNameMap[req.body.name] === undefined) {
		state = true;

		data.usersNameMap[req.body.name] = req.body.id;
		data.users[req.body.id].name = req.body.name;

		res.cookie('name', req.body.name, {
			maxAge: 1000*60*60*24
		});
	}

	res.json({
		state: state
	});
});

router.post('/room/register', function(req, res, next) {
	if (data.roomsNameMap[roomname] !== undefined) {
		return res.json({
			state: false
		});
	}

	var roomname = req.body.name,
		socketid = req.body.id,
		user = data.users[socketid],
		room = new Room(roomname, user);

	data.rooms[room.id] = room;
	data.roomsNameMap[roomname] = room.id;

	res.json({
		state: true,
		roomid: room.id
	});
});

router.post('/rooms/get', function(req, res, next) {
	console.log(data.rooms);
	res.json({
		rooms: data.rooms
	});
});

module.exports = router;
