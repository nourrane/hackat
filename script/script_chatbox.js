
const form = document.querySelector("#chat-form");

var KEYCODE_ENTER = 13;
var KEYCODE_ESC = 27;

$(document).keyup(function(e) {
  if (e.keyCode == KEYCODE_ENTER) $('.save').click();
  if (e.keyCode == KEYCODE_ESC) $('.cancel').click();
});

$(document).ready(function(){
    $("button").click(function(){
        console.log("step0");
  var text = $('#textbox').val(); 
  console.log(text)
  if (text) { // values are not empty
    console.log("step0.1");
      $.ajax({
        
          type: 'POST',
          url: "/htbin/chatsend.py", 
          data: "msg="+text,
  
          //script call was *not* successful
          error: function() { 
            document.getElementById("msg").innerHTML = "ATTENTION, Il faut imperativement se connecter pour écrire dans le chat";
          }, 
  
          // script call was successful 
          // perl_data should contain the string returned by the Perl script 
          success: function(datachat){
            console.log(datachat);
            $.ajax({
        
                type: 'GET',
                url: "/htbin/chatget.py", 
        
                //script call was *not* successful
                error: function() { 
                    alert("script get was not successful");
                }, 
        
                // script call was successful 
                // perl_data should contain the string returned by the Perl script 
                success: function(datachat2){

                  console.log(datachat2);
                  let indice=datachat2.length-1;
                  console.log(datachat2[indice]);
                  let mess= document.createElement("li");
                  mess.id = "message";
                  mess.className="you";
                  mess.textContent = datachat2[indice].msg;
                  document.getElementById("chat").appendChild(mess); 
                  var nom = datachat2[indice].user;
                  var time = datachat2[indice].time;
                  console.log(nom);
                  document.getElementById("msg").innerHTML = nom+ " : "+ time;
                
      
                }
            });   
            


          }
      });   
  
  }
  return false;
    });
  });