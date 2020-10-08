const request = require("request");

const token =
	"pk.eyJ1IjoiaXNyZWFsc2l4IiwiYSI6ImNrZm9yNDBkdzBoZXozMnRhenJ3bHk4bXAifQ.Apzozs0oMtRf5HUd2pcsLQ";

const geocode = (address, callback) => {
	console.log(address);
	if (!address) {
		return callback("Please input an address", undefined);
	}
	address = encodeURIComponent(address);
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${token}`;
	request({ url, json: true }, (err, res) => {
		// const data = res.body;
		if (err) {
			callback("Cannot connect, check your internet connection...", undefined);
		} else if (!res.body.features.length) {
			callback("Please check your spellings and try again...!", undefined);
		} else {
			return callback(undefined, res.body);
		}
	});
};

// geocode(process.argv[2], helperFunc);

module.exports = geocode;
