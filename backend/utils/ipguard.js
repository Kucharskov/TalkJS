//Utils: ipguard.js
let iplist = [];
let consts = require('../config/consts');

module.exports = {
	addIP: function(ip) {
		if(!iplist[ip])	iplist[ip] = 0;
		iplist[ip]++;

		return (iplist[ip] > consts.perIPlimit) ? false : true;
	},

	removeIP: function(ip) {
		iplist[ip]--;
		if(iplist[ip] === 0) delete iplist[ip];
	}
};
