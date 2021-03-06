var express = require('express');
var router = express.Router();
var data = require('./../classes/data')

router.get('/', function(req, res, next) {
	var name = req.cookies.name,
		hasName = name !== undefined && name.length > 0;

	res.render('index', {
		name: name,
		hasName: hasName,
		rooms: data.rooms
	});
});

module.exports = router;
