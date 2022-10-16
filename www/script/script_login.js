const form1 = document.querySelector("#login");


/* If enter is pressed, then check submit */
form1.addEventListener("keypress", function(e){
    console.log(e.which, e.target.value);
    if(e.which === 13)//code number for enter key
      form1.onsubmit();
});

  
form1.onsubmit = () => {
    var xhr; 
    var formData = new FormData(form1);
    try {  xhr = new ActiveXObject('Msxml2.XMLHTTP');   }
    catch (e) 
    {
        try {   xhr = new ActiveXObject('Microsoft.XMLHTTP'); }
        catch (e2) 
        {
           try {  xhr = new XMLHttpRequest();  }
           catch (e3) {  xhr = false;   }
         }
    }
    xhr.open('POST', 'htbin/login.py'); 
    xhr.send(formData);
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            showResponse(this.response);
        }
    }
    return false;
};

/* Showing the response */
showResponse = data => {
    var text = data;
    if(text.includes("Bonjour")){
        text = " " + text + "Content de vous revoir !";
        text+= "<br/>" + "Accèder à la chatbox : ";
        text+= "<a href=chatbox.html> cliquez ici </a>";
    }else{
        var text = " " + data;
        text+="Veuillez vous <a href=index.html> reconnecter.</a>";
    }

    document.getElementById("login").innerHTML = text;
};