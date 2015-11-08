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
				maxAge: 60*60*24
			});
		}

		res.json({
			state: state
		});
	});

	router.post('/room/get', function(req, res, next) {

	});

	return router;
};
