var express = require('express');
var router = express.Router();

module.exports = function(data) {
	router.post('/user/register', function(req, res, next) {
		state = false;

		if (data.users[req.body.name] === undefined) {
			state = true;

			data.users[req.body.name] = req.body.id;
			data.usersMap[req.body.id] = req.body.name;

			res.cookie('name', req.body.name, {
				maxAge: 1000*60*60*24
			});
		}

		res.json({
			state: state
		});
	});

	router.post('/room/register', function(req, res, next) {
		state = false;

		if (data.rooms[req.body.name] === undefined) {
			state = true;

			var id = Date.now();

			data.rooms[id] = {
				id: id,
				name: req.body.name,
				owner: req.body.id,
				ownerName: data.usersMap[req.body.id],
				total: 1,
				players: [req.body.id]
			};

			data.roomsMap[req.body.name] = id;
		}

		res.json({
			state: state
		});
	});

	router.post('/rooms/get', function(req, res, next) {
		console.log(data.rooms);
		res.json({
			rooms: data.rooms
		});
	});

	return router;
};
