'use strict';

var socket = io();

(function() {
	var $ajax = function(target, data) {
		return $.ajax('api/' + target, {
			data: data,
			method: 'post',
			dataType: 'json'
		});
	};

	$(function() {
		var $body = $('body'),
			$frame = $('.frames-view'),
			$registerFrame = $('.register-frame'),
			$roomlistFrame = $('.roomlist-frame'),
			$createroomFrame = $('.createroom-frame');

		$registerFrame.on('keyup', 'input', function(ev) {
			var input = $(this),
				length = input.val().length;

			$registerFrame.toggleClass('ready', length > 0);
		});

		$registerFrame.on('submit', function(ev) {
			ev.preventDefault();

			var name = $registerFrame.find('input').val();

			$ajax('user/register', {
				id: socket.id,
				name: name
			}).done(function(response) {
				if (response.state) {
					$registerFrame.removeClass('error');
					$roomlistFrame.find('.greeting-name').text(name);

					$frame.attr('data-frame', '1');
				} else {
					$registerFrame.addClass('error');
				}
			});
		});

		$roomlistFrame.on('click', '.create-button', function(ev) {
			$frame.attr('data-frame', '2');
		});

		$createroomFrame.on('keyup', 'input', function(ev) {
			var input = $(this),
				length = input.val().length;

			$createroomFrame.toggleClass('ready', length > 0);
		});

		$createroomFrame.on('click', '.back-button', function(ev) {
			$frame.attr('data-frame', '1');
		});

		$createroomFrame.on('submit', function(ev) {
			ev.preventDefault();
		});
	});
})();
