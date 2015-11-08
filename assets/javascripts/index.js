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

	var $template = function(id, data, toString) {
		var item = $(identifier).html();

		item = item.replace(RegExp('\\{\\{(.+?)\\}\\}', 'g'), function(match, p1) {
			return data[p1] !== undefined ? data[p1] : '';
		});

		if (toString === true) {
			return item;
		}

		return $(item);
	};

	$(function() {
		var $body = $('body'),
			$page = $('.pages-view'),
			$frame = $('.frames-view'),
			$registerFrame = $('.register-frame'),
			$roomlistFrame = $('.roomlist-frame'),
			$createroomFrame = $('.createroom-frame');

		socket.on('connect', function() {
			var name = $page.attr('data-name');

			if (name.length > 0) {
				$ajax('user/register', {
					id: socket.id,
					name: name
				}).done(function(response) {
					if (!response.state) {
						console.log('here');
						$('.already-connected').addClass('active');
					}
				});
			}
		});

		$createroomFrame.find('input').val('Room ' + Date.now().toString().slice(-6));

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

			$createroomFrame.find('input').trigger('select');
		});

		$roomlistFrame.on('click', '.roomlist li', function() {
			$page.attr('data-page', '1');
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

			var name = $createroomFrame.find('input').val();

			$ajax('room/register', {
				id: socket.id,
				name: name
			}).done(function(response) {
				if (response.state) {
					$createroomFrame.removeClass('error');
					$page.attr('data-page', '1');
				} else {
					$createroomFrame.addClass('error');
				}
			});
		});
	});
})();
