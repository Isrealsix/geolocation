const form = document.querySelector("form");
const input = document.querySelector("input");
const longId = document.getElementById("long");
const latId = document.getElementById("lat");
const errorId = document.getElementById("error");
const locId = document.getElementById("location");

form.addEventListener("submit", e => {
	let value = input.value;
	e.preventDefault();
	longId.textContent = "";
	latId.textContent = "";
	errorId.textContent = "";
	locId.textContent = "";
	if (!value) {
		console.log(value);
		errorId.textContent = "Fields cannot be empty!";
		// errorId.value = "";
	} else {
		longId.textContent = "Loading...";
		fetch(`http://localhost:3000/weather?address=${value}`).then(res => {
			res.json().then(({ long, lat, location } = {}) => {
				if (!location) {
					errorId.textContent = "Sorry no results, try again...!";
				} else {
					longId.textContent = long;
					latId.textContent = lat;
					locId.textContent = location;
					console.log(long, lat, location);
				}
			});
		});
	}
});
