window.addEventListener("load", setup);
function setup() {
	const max_scroll = document.body.offsetHeight - window.innerHeight;
	const waypoints = {
		about: {
			waypoint: document.getElementById("about").offsetTop,
			ele: document.getElementById("about"),
			nav: document.getElementById("aboutnav")
		},
		experience: {
			waypoint: document.getElementById("experience").offsetTop,
			ele: document.getElementById("experience"),
			nav: document.getElementById("experiencenav")
		},
		projects: {
			waypoint: document.getElementById("projects").offsetTop,
			ele: document.getElementById("projects"),
			nav: document.getElementById("projectsnav")
		},
		contact: {
			waypoint: document.getElementById("contact").offsetTop,
			ele: document.getElementById("contact"),
			nav: document.getElementById("contactnav")
		}
	}
	window.addEventListener("scroll", () => {
		const location = window.pageYOffset;

		let queue;
		for (const [key, value] of Object.entries(waypoints)) {
			if (location > value.waypoint - 50) {
				queue = value.nav;
			}
		}

		if (!queue.classList.contains("active")) {
			for (const [key, value] of Object.entries(waypoints)) {
				value.nav.classList.remove("active");
			}
			queue.classList.add("active");
		}
		if (location >= max_scroll - 5) {
			if (!waypoints.contact.nav.classList.contains("active")) {
				for (const [key, value] of Object.entries(waypoints)) {
					value.nav.classList.remove("active");
				}
				waypoints.contact.nav.classList.add("active");
			}
		}
	})
	document.getElementById("contactform").addEventListener("submit", (e) => submitToAPI(e));
}

function submitToAPI(e) {
	e.preventDefault();
	var URL = "https://j15ebwpera.execute-api.us-east-2.amazonaws.com/live/contact";

	var name = $("#name-input").val();
	var email = $("#email-input").val();
	var subject = $("#subject-input").val();
	var message = $("#message-input").val();
	var data = {
		name: name,
		email: email,
		subject: subject,
		message: message
	};

	$.ajax({
		type: "POST",
		url: URL,
		dataType: "json",
		crossDomain: "true",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),


		success: function () {
			// clear form and show a success message
			alert("Thanks for reaching out! I'll get back to you soon.");
			document.getElementById("contactform").reset();
			location.reload();
		},
		error: function () {
			// show an error message
			alert("Operation failed. If the problem persists, please email me directly: ianrflom@gmail.com");
		}
	});
}