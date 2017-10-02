//Utils: ipguard.js
const limit = 5;
let iplist = [];

module.exports = {
	addIP: function(ip) {
		if(!iplist[ip]) iplist[ip] = 0;
		else iplist[ip]++;
		
		return (iplist[ip] >= limit) ? false : true;
	},
	
	removeIP: function(ip) {
		if(iplist[ip] === 0) delete iplist[ip];
		else iplist[ip]--;
	}
};