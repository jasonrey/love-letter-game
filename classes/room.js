var Room = function(name, user) {
	this.id = user.id + Date.now().toString()
	this.name = name;
	this.owner = user;
	this.total = 1;
	this.players = [user.id];

	user.roomid = this.id;
}

module.exports = Room;
