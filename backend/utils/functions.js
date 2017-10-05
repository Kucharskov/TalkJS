module.exports = {
	//Funkcja do escapeowania tekstu
	escapeText: function(text) {
		let map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;'
		};
		return text.replace(/[&<>"']/g, function(m) { return map[m]; });
	},

	//Funkcja do renderowania linków
	linkify: function(text) {
		let urlRegex =/(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
		return text.replace(urlRegex, function(url) {
			return '<a target="_blank" href="' + url + '">' + url + '</a>';
		});
	},	
	
	//Funkcja do generowania czasu
	generateTime: function() {
		let now = new Date();
		let hours = now.getHours();
		let min = now.getMinutes();
		let sec = now.getSeconds();

		if (hours < 10) hours = "0" + hours;
		if (min < 10) min = "0" + min;
		if (sec < 10) sec = "0" + sec;

		return hours + ":" + min + ":" + sec;
	}
}