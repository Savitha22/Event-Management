var users_json;


window.onload = get();
function get() {
	console.log("get");
	var req = new XMLHttpRequest();
	req.open("GET", "http://localhost:2000/event", true);
	req.setRequestHeader("Content-type", "application/json");
	req.send();
	console.log("bcshjfb")
	req.onreadystatechange = function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				users_json = JSON.parse(req.responseText);
				// event.preventDefault();
				display();
			}
		}
	}
	document.getElementById("op").addEventListener("change", printMsg);
function printMsg(){
	
	window.location.href="index.html"
}

}


function display() {

	console.log(users_json)
	console.log("shdfjs")
	var mid = "";
	var d=0;
	for (let i in users_json) {
		//  mid+="<div class='card' style='width: 18rem;'><div class='card-body'><h5 class='card-title'>"+ users_json[i].name+"</h5><h6 class='card-subtitle mb-2 text-muted'>Event Type:"+users_json[i].event_type+"</h6><h6 class='card-subtitle mb-2 text-muted'>Event Date and time:"+users_json[i].date_and_time+"</h6><h6 class='card-subtitle mb-2 text-muted'>Troop Name:"+users_json[i].troop_name+"</h6><p class='card-text'></p><button type='button' class='btn btn-primary' onclick=book("+users_json[i]._id+")>BOOK</button></div></div>"
		d++;
		if(d==7)d=0;
		mid += `<div id="pan"><div class="card" style="width:18rem;"> <img src="./css/images/img${d}.jpg" id="ima" class="card-img-top"alt="img"> <div class="card-body"><h1> ${users_json[i].name}</h1> <h5 class="card-title"> ${users_json[i].event_type}</h5><h6 class='card-subtitle mb-2 text-muted'>Event Date and time:${users_json[i].date_and_time}</h6><h6 class='card-subtitle mb-2 text-muted'>Troop Name:${users_json[i].troop_name}</h6> <button type='button' class='btn btn-primary'type="button" class="btn btn-primary" data-toggle="modal" data-target="#formModal" onclick=book("${users_json[i]._id}")>BOOK</button></div></div></div>`;
	}
	// event.preventDefault();
	document.getElementById("div1").innerHTML = mid;

	document.getElementById("bookform").style.display = "none";
}

var evt;
var evt_id;
function book(id) {
	console.log(id);
	evt_id = id;

	document.getElementById("bookform").style.display = "block";

	var req = new XMLHttpRequest();
	req.open("GET", "http://localhost:2000/event/" + id, true);
	req.setRequestHeader("Content-type", "application/json");
	req.send();

	req.onreadystatechange = function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				evt = JSON.parse(req.responseText);

				document.getElementById("ename").innerHTML = evt.name;
				document.getElementById("eday").innerHTML = evt.date_and_time
				document.getElementById("etype").innerHTML = evt.event_type
				document.getElementById("etroop").innerHTML = evt.troop_name;

			}
		}
	}



}
var d;
function bookt() {

window.location.href="booking.html"
	// console.log(event_id);
	// console.log(event.name);

	var sea = document.getElementById("seat").value
	var cos = document.getElementById("cost").value
	var s = document.getElementById("name").value


	var newobj = {
		event_id: evt_id,
		event_name: evt.name,
		user_name: s,
		event_type: evt.event_type,
		noOfSeats: sea,
		cost: cos,

	}
	event.preventDefault();
	var req = new XMLHttpRequest();
	req.open("POST", "http://localhost:2000/book", true);
	req.setRequestHeader("Content-type", "application/json");

	req.send(JSON.stringify(newobj));

	req.onreadystatechange = function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var s = JSON.parse(req.responseText);
				console.log(s);
				d = s._id;
				console.log("fghgfgf", d);
				// displaytc(d);
			}
		}
	}

}
function displaytc(x) {

	console.log("AAAAAAAAAAA", x);
	var req = new XMLHttpRequest();
	req.open("GET", "http://localhost:2000/book/" + x, true);
	req.setRequestHeader("Content-type", "application/json");

	req.send();

	req.onreadystatechange = function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var s = JSON.parse(req.responseText);
				console.log("sssssss" + s.user_name);
				et = `<div class='card' id='read' style='width:600px;border:2px solid black;background-color:aliceblue'><h4><center>Booking Details<center></h4><div class='card-body'
                id='details'><div>Event Name&nbsp:&nbsp${s.event_name}<br>
                Type of Event &nbsp:&nbsp${s.event_type}<br>
                No of Ticket Booked &nbsp:&nbsp${s.noOfSeats}</div><div>
                <button class='btn btn-info'style='float:left' onclick='saveFn()' >Save Ticket</button>
                <button class='btn btn-danger'style='float:right' onclick='cancelFn("${s._id}")' >Cancel Ticket</button>
                </div></div>`;
				console.log(s._id);
				// document.getElementById("bookingstatus").innerHTML = et;

			}
		}
	}



}
function saveFn(){
	var element = document.getElementById('read');
	html2pdf(element);

}




function find() {
	var no = document.getElementById("seat").value
	var gend = document.querySelector("input[class=gen]:checked").value;
	console.log(gend);
	console.log(evt);
	if (gend == "golden") {
		ans = no * 1000
		document.getElementById("cost").value = ans;

	}
	else {
		ans = no * 500
		document.getElementById("cost").value = ans;
	}
}




function cancelFn(id) {
	console.log("Cancel" + id);
	var req = new XMLHttpRequest();
	req.open("DELETE", "http://localhost:2000/book/" + id, true);
	// req.setRequestHeader("Content-type", "application/json");
	req.send();
	var s;
	req.onreadystatechange = function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				document.getElementById("bookingstatus").style.display = 'none';
				display();
			}
		}
	}

}

