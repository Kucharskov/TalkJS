const functions = require('./functions');

module.exports = {
	createMsg: function(author, message, escape = true) {		
		message = (escape) ? functions.linkify(functions.escapeText(message)) : message;
		return '<p class="m-0 msg" data-toggle="tooltip" data-placement="right" title="' + functions.generateTime()  + '"><span class="badge badge-' + author.color + '">' + author.username + '</span> ' + message + '</p>';
	},

	escapeText: function(data) {
		return functions.escapeText(data);
	},
};