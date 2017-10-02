//Utils: chatUtils.js
//Funkcja do escapeowania tekstu
function escapeText(text) {
	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};
	return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

//Funkcja do renderowania linków
function linkify(text) {
	var urlRegex =/(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	return text.replace(urlRegex, function(url) {
		return '<a target="_blank" href="' + url + '">' + url + '</a>';
	});
}

//Funkcja do generowania czasu
function generateTime() {
	let now = new Date();
	let hours = now.getHours();
	let min = now.getMinutes();
	let sec = now.getSeconds();

	if (hours < 10) hours = "0" + hours;
	if (min < 10) min = "0" + min;
	if (sec < 10) sec = "0" + sec;

	return hours + ":" + min + ":" + sec;
}

module.exports = {
	createMsg: function(author, message, escape = true) {		
		message = (escape) ? linkify(escapeText(message)) : linkify(message);
		return '<p class="m-0 msg" data-toggle="tooltip" data-placement="right" title="' + generateTime()  + '"><span class="badge badge-' + author.color + '">' + author.username + '</span> ' + message + '</p>';
	},

	escapeText: function(data) {
		return escapeText(data);
	},
};