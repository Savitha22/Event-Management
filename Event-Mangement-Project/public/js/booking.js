
window.onload = get();
function get() {
    var req = new XMLHttpRequest();
    req.open("GET", "http://localhost:2000/book", true);
    req.setRequestHeader("Content-type", "application/json");

    req.send();
    var et = "";
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                var s = JSON.parse(req.responseText);
                var k;
                for (let i in s) {
                    k = s[i].user_name;
                    et = `<div class='card' id='read' style='width:600px;border:2px solid black;background-color:aliceblue'><h4><center>Booking Details<center></h4><div class='card-body'
                id='details'><div>Event Name&nbsp:&nbsp${s[i].event_name}<br>
                Type of Event &nbsp:&nbsp${s[i].event_type}<br>
                Name&nbsp:&nbsp${s[i].user_name}<br>
                Total Cost&nbsp:&nbsp${s[i].cost}<br
                No of Ticket Booked &nbsp:&nbsp${s[i].noOfSeats}</div><div>
                <button class='btn btn-info'style='float:left' onclick='saveFn()' >Save Ticket</button>
                <button class='btn btn-danger'style='float:right' onclick='cancelFn("${s[i]._id}")' >Cancel Ticket</button>
                </div></div>`;
                    console.log(s._id);
                }
                console.log(k);


                document.getElementById("bookingbox").innerHTML = et;

            }
        }
    }
    document.getElementById("op").addEventListener("change", printMsg);
function printMsg(){
	
	window.location.href="index.html"
}
}
function saveFn() {
    var element = document.getElementById('read');
    html2pdf(element);

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
                document.getElementById("bookingbox").style.display = 'none';
                get();
            }
        }
    }

}