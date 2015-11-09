var User = function(socket) {
	this.id = socket.id;
	this.socket = socket;

	this.name = '';
	this.roomid = '';
};

module.exports = User;
