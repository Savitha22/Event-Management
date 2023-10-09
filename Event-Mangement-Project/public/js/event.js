

var hall_json = "";
var events_json = "";
window.onload = getdata();

function getdata() {
    document.getElementById("addUserForm").style.display = "none";
    document.getElementById("updateUserForm").style.display = "none";
    var content = "";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:2000/events", true);
    xhr.send();
    // xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                events_json = JSON.parse(xhr.responseText);
                for (let i in events_json) {
                    if(!events_json[i].hall_details){
                        content += `<div class="card" id="i2"style="width: 320px; border-radius:15px ;">  
                        <div class="card-body" id="ii">    
                        <h5 class="card-title">Event Name:&nbsp&nbsp${events_json[i].name}</h5>    
                        <h6 class="card-subtitle mb-2 text-muted">Event type:&nbsp&nbsp ${events_json[i].event_type}</h6>   
                       <p>Date and Time:&nbsp&nbsp${events_json[i].date_and_time}</p>
                       <p>Troop name:&nbsp&nbsp${events_json[i].troop_name}</p>
                       <p>Contact Person <p>Name:&nbsp&nbsp${events_json[i].contact_person[0].name}</p>
                      <p>Mobile:&nbsp&nbsp${events_json[i].contact_person[0].mobile}</p> 
                    </p>
                          <button id="btnStart"  type="button" class="btn btn-primary" data-toggle="modal" data-target="#formModal1" onclick=UpdateItem("${events_json[i]._id}")>Update</button>    
                        <button class="btn btn-primary" onclick=DeleteItem("${events_json[i]._id}")>Delete</button> </div></div>`;
                        document.getElementById("root1").innerHTML = content;
                    }
                    else{
                        content += `<div class="card" id="i2"style="width: 320px;border-radius:15px;  ">  
                        <div class="card-body" id="ii">    
                        <h5 class="card-title">Event Name:&nbsp&nbsp${events_json[i].name}</h5>    
                        <h6 class="card-subtitle mb-2 text-muted">Event type:&nbsp&nbsp ${events_json[i].event_type}</h6>   
                       <p>Date and Time:&nbsp&nbsp${events_json[i].date_and_time}</p>
                       <p>Troop name:&nbsp&nbsp${events_json[i].troop_name}</p>
                       <p>Contact Person <p>Name:&nbsp&nbsp${events_json[i].contact_person[0].name}</p>
                      <p>Mobile:&nbsp&nbsp${events_json[i].contact_person[0].mobile}</p> 
                    </p>
                    <p>Hall name:${events_json[i].hall_details[0].Hallname}</p>
                    <p>Hall Location:${events_json[i].hall_details[0].HallLocation}</p>
                    <p>Available Seats:${events_json[i].hall_details[0].TotalNoOfSeats}</p>
                          <button id="qq2" type="button" class="btn btn-primary" data-toggle="modal" data-target="#formModal1" onclick=UpdateItem("${events_json[i]._id}")>Update</button>    
                        <button class="btn btn-primary" id="qq1" onclick=DeleteItem("${events_json[i]._id}")>Delete</button> </div></div>`
                        document.getElementById("root1").innerHTML = content;

                    }   
                }
               

            }
        }
        document.getElementById("op").addEventListener("change", printMsg);
        function printMsg(){
            window.location.href="index.html"
        }
      
    }
    const xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "http://localhost:2000/halls", true);
    xhr1.send();
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4) {
            if (xhr1.status === 200) {
                hall_json = JSON.parse(xhr1.responseText);
            }
        }


    }
}


function addUser() {
    var Name = document.getElementById("name").value;
    var eventtype = document.getElementById("eventtype").value;
    var date = document.getElementById("dateandtime").value;
    var troopname = document.getElementById("troopname").value;
    var cname = document.getElementById("name1").value;
    var cmobile = document.getElementById("mobile").value;
    var hall = document.getElementById("hall").value;
    console.log(hall);
    if (Name == '') {
        alert("Please, Provide Name");
        event.preventDefault();
    }
    else if (eventtype == '') {
        alert("Please, Provide event type");
        event.preventDefault();
    }
    else if (date == '') {
        alert("Please, Provide date");
        event.preventDefault();
    }
    else if (troopname == '') {
        alert("Please, Provide troop_name");
        event.preventDefault();
    }
    else if (cname == '') {
        alert("Please, Provide conact person name");
        event.preventDefault();
    }
    else if (cmobile == '') {
        alert("Please, Provide contact person mobile number");
        event.preventDefault();
    }
    else if (hall == '') {
        alert("Please, Provide hall Details");
        event.preventDefault();
    }
    else {
        var halls;

        const xhr1 = new XMLHttpRequest();
        xhr1.open("GET", "http://localhost:2000/halls/" + hall, true);
        xhr1.send();
        // xhr.setRequestHeader("Content-type", "application/json");
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4) {
                if (xhr1.status === 200) {
                    halls = JSON.parse(xhr1.responseText);
                    console.log("Hall detail:" + halls);
                    const xhr = new XMLHttpRequest();
                    xhr.open("POST", "http://localhost:2000/events", true);
                    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
                    xhr.send(JSON.stringify({ name: Name, event_type: eventtype, date_and_time: date, troop_name: troopname, contact_person: { name: cname, mobile: cmobile }, hall_details:halls}));
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 201) {
                                var datas = JSON.parse(xhr.responseText);
                                console.log(datas);
                                getdata();
                            }
                        }
                    }

                }
            }
        }
        document.getElementById("addUserForm").reset();
    }

}



var USERID;
function UpdateItem(item) {
    document.getElementById("updateUserForm").style.display = 'block';
    for (let i in events_json) {
        if (item == (events_json[i]._id)) {
            USERID = item;
            document.getElementById("name3").value = events_json[i].name;
            document.getElementById("eventtype1").value = events_json[i].event_type;
            document.getElementById("dateandtime1").value = events_json[i].date_and_time;
            document.getElementById("troopname1").value = events_json[i].troop_name;
            document.getElementById("name2").value = events_json[i].contact_person[0].name;
            document.getElementById("mobile1").value = events_json[i].contact_person[0].mobile;
            break;
        }
    }

}

function newfunction(){
    var n = document.getElementById("name3").value;
        var e = document.getElementById("eventtype1").value;
        var d = document.getElementById("dateandtime1").value;
        var t = document.getElementById("troopname1").value;
        var nn = document.getElementById("name2").value;
        var m = document.getElementById("mobile1").value;
        var xhr3 = new XMLHttpRequest();
        xhr3.open("PUT", "http://localhost:2000/events/" + USERID, true);
        xhr3.setRequestHeader("content-type", "application/json");
        xhr3.send(JSON.stringify({ name: n, event_type: e, date_and_time: d, troop_name: t, contact_person: { name: nn, mobile: m }}));
        xhr3.onreadystatechange = function () {
            if (xhr3.readyState == 4) {
                if (xhr3.status == 200) {
                    JSON.parse(xhr3.responseText)
                    getdata();
                }
            }
        }
    
}





function DeleteItem(item) {
	var xhr2 = new XMLHttpRequest();
	xhr2.open("DELETE", "http://localhost:2000/events/"+item, true);
	xhr2.setRequestHeader("content-type", "application/json");
	xhr2.send();
	xhr2.onreadystatechange = function () {
		if (xhr2.readyState == 4) {
			if (xhr2.status == 200) {
				getdata();
                console.log("Succesfully Deleted");
			}
		}
	}
}

function visibileUserForm1() {
    document.getElementById("addUserForm").style.display = 'block';
    var select = document.getElementById('hall');
    for (var i = 1; i <= hall_json.length; i++) {
        var option = '<option value="' + hall_json[i - 1]._id + '" >' + "Hall name: " + hall_json[i - 1].Hallname +
            " Hall Location:" + hall_json[i - 1].HallLocation + "Total Seats:" + hall_json[i - 1].TotalNoOfSeats +
            "Total Golden Seats:" + hall_json[i - 1].TotalGoldenSeats + "Total Silver Seat:" + hall_json[i - 1].TotalSilverSeats + '</option>';
        select.insertAdjacentHTML('beforeend', option);
    }
}
function visibileUserForm() {
    document.getElementById("addHallForm").style.display = 'block';
    
}


function addHall(){
    alert("Successfully Added to Hall Database");
    var hallname = document.getElementById("hn").value;
    var halllocation = document.getElementById("hl").value;
    var totalseats = document.getElementById("ht").value;
    var gseats = document.getElementById("hg").value;
    var sseats = document.getElementById("hs").value;

    if (hallname == '') {
        alert("Please, Provide hallname");
        event.preventDefault();
    }
    else if (halllocation == '') {
        alert("Please, Provide hall location");
        event.preventDefault();
    }
    else if (totalseats == '') {
        alert("Please, Provide total seats");
        event.preventDefault();
    }
    else if (gseats == '') {
        alert("Please, Provide Gold seats");
        event.preventDefault();
    }
    else if (sseats == '') {
        alert("Please, Provide Silver Seats");
        event.preventDefault();
    }
    else {
                    const xhr = new XMLHttpRequest();
                    xhr.open("POST", "http://localhost:2000/halls", true);
                    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
                    xhr.send(JSON.stringify({ Hallname: hallname, HallLocation: halllocation, TotalNoOfSeats: totalseats, TotalGoldenSeats: gseats, TotalSilverSeats:sseats}));
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 201) {
                                var x=JSON.parse(xhr.responseText);
                            }
                        }
                    }

                }
            
        document.getElementById("addHallForm").reset();
    
        }

var ct="";
        function visibileUserForm2() {
            document.getElementById("formModal3").style.display = 'block';
            const xhr = new XMLHttpRequest();
                    xhr.open("GET", "http://localhost:2000/book", true);
                    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
                    xhr.send();
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) {
                              var x=JSON.parse(xhr.responseText);
                             
                              for(let i in x){
                                ct+=`<div><p>Event Name :${x[i].event_name}</p>
                                <p>User Name :${x[i].user_name}</p>
                                <p>Event Type :${x[i].event_type}</p>
                                <p>No of Seats :${x[i].noOfSeats}</p>
                                <p>Price : ${x[i].cost} </p></div><hr>`;
                              }
                              document.getElementById("bookingform").innerHTML=ct;
                              
                            }
                        }
                    }
                    

        }
        