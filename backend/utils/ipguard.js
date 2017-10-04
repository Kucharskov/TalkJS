const consts = require('../config/consts');
let iplist = [];

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
