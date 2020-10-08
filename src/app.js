const express = require("express");
const path = require("path");
const hbs = require("hbs");
const request = require("request");
const app = express();
const geocode = require("../utils/geocode");

const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// console.log(geocode("", helperFunc));

//Set up handlebars and view Location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
	res.render("index", {
		what: "Love",
		name: "Welcome to pegasus' home",
		location: "Home of pegasus",
	});
});

app.get("/weather", (req, res) => {
	const address = req.query.address;

	if (!address) {
		res.send({
			error: "You must provide an address...",
		});
	} else {
		geocode(address, (err, data) => {
			if (err) {
				return res.send(err);
			}
			const retrievedObj = data;
			const location = retrievedObj.features[0].place_name;
			const long = retrievedObj.features[0].center[0];
			const lat = retrievedObj.features[0].center[1];
			return res.send({
				location,
				long,
				lat,
			});
		});

		// res.send("worked");

		// res.render("weather", {
		// 	forecast: "rain will fall",
		// 	Temperature: 22,
		// 	name: "Weather",
		// 	location: "Weather page",
		// 	address,
		// });
	}
});

app.get("/help", (req, res) => {
	res.render("help", {
		info: "Help us God oooo",
		from: 911,
		name: "Help",
		location: "help page",
	});
});

app.get("/help/*", (req, res) => {
	res.render("notfound", {
		msg: "Sorry this help article could not be found!",
	});
});

app.get("*", (req, res) => {
	res.render("notfound", {
		msg: "Error, Page not found",
	});
});
app.get("/contact", (req, res) => {
	res.send("Now you want to contavt Pegasus");
});

// app.get("/weather", (req, res) => {
// 	res.send({ /
// 		forecast: 50,
// 		location: "Philadelphia",
// 	}); /
// }); /

app.listen(port, () => {
	console.log("Pegsus is alive!");
});
