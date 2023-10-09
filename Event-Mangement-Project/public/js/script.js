function register(){
   alert("register success")

   var u=document.getElementById("username1").value

   var p=document.getElementById("pass1").value

   var e=document.getElementById("emails").value

   var r="user";

   console.log("user");

   var newobj={

      username:u,

      email:e,

      role:r,

      password:p,

     

     

   }

   var req = new XMLHttpRequest();

   req.open("POST", "http://localhost:2000/users", true);

   req.setRequestHeader("Content-type", "application/json");

console.log("inside 23")

   req.send(JSON.stringify(newobj));

   console.log("bcshjfb")

   req.onreadystatechange = function () {

      if (req.readyState == 4) {

         if (req.status == 201) {

            users_json = JSON.parse(req.responseText);
            // window.location.href="index.html"
            
           
            // event.preventDefault();

            // Window.location.replace("login.html")

         }

 

      }
     

}

 

 

}

 

 

 

function adminlogin(){

   event.preventDefault();

   var g= document.getElementById("ls1").value;

   var h= document.getElementById("passs1").value;

   if(g=="admin"&& h=="admin123456"){

      window.location.replace("event.html");

   }

   else{

      alert("Invalid Credentials");

   }

 

   

}

 

function login(){

   
   var u=document.getElementById("l1").value;
   var p=document.getElementById("p1").value;
   var req = new XMLHttpRequest();

   req.open("GET", "http://localhost:2000/users", true);
   req.setRequestHeader("Content-type", "application/json");
   req.send();

   

   req.onreadystatechange = function () {

      if (req.readyState == 4) {

         if (req.status == 200) {

            users_json = JSON.parse(req.responseText);

            // event.preventDefault();

            // Window.location.replace("login.html")

            for(let i in users_json){

               if(users_json[i].username==u && users_json[i].password==p){

                  window.location.href="book.html";

               }
              

            }
            


         }

 

      }
     
}

 

}