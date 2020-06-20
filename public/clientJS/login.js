//CLIENT JS
let loginSignup = document.querySelector(".nav")
let signupBtn = loginSignup.children[0];
let loginBtn = loginSignup.children[1];


let submitBtn = document.querySelector("#submit");
let nameField = document.querySelector(".nameField");
let emailLabel = document.querySelector(".emailField label");

signupBtn.addEventListener("click", ()=>{
    signupBtn.style.backgroundColor = "rgba(250, 128, 114, 0.411)"
    loginBtn.style.backgroundColor = "unset"

    submitBtn.value = "Sign-up"; 
    nameField.style.display = "block";
    emailLabel.style.marginTop = "1em";
    email.value = "";
    password.value = "";
    name.value = "";
})

loginBtn.addEventListener("click", ()=>{
    loginBtn.style.backgroundColor = "rgba(250, 128, 114, 0.411)"
    signupBtn.style.backgroundColor = "unset"

    email.style.border = "";
    password.style.border = "";
    submitBtn.value = "Login"; 
    nameField.style.display = "none";
    emailLabel.style.margin = "0";
    email.value = "";
    password.value = "";
})
let email = document.querySelector("#email")
let password = document.querySelector("#password")

let name =  document.querySelector("#name")

submitBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    let message = document.querySelector(".message-container"); 
    //gather fields
    let bodyObject = {
        email: email.value,
        password: password.value,
        name: name.value
    }
    if (!email.value) {
        email.style.border =  "2px solid rgba(255, 0, 0, 0.801)"
        message.children[0].innerHTML = "Error: Some fields are still required"
        message.style.opacity = "1";
    }
    if (!password.value){
        password.style.border =  "2px solid rgba(255, 0, 0, 0.801)"
        message.children[0].innerHTML = "Error: Some fields are still required"
        message.style.opacity = "1";
    }

    if (submitBtn.value == "Sign-up"){
        
        
        if (password.value && email.value){
            //POST request
            fetch("/login/newUser",{
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(bodyObject)
            })
            .then(response=>{
                return response.json(); //convert to JSON Object
            })
            .then(data=>{
                //depending on response, either complete, or fail
                if (data.errorCode == 11000){
                    email.style.border =  "2px solid rgba(255, 0, 0, 0.801)"
                    message.style.opacity = "1";
                    message.children[0].innerHTML = data.message;
                } else if (data.errorCode == 1020){
                    email.style.border =  "2px solid rgba(255, 0, 0, 0.801)"
                    message.style.opacity = "1";
                    message.children[0].innerHTML = data.message;
                }
                else{
                    message.children[0].innerHTML = "User Created! You can now login!"
                    message.style.opacity = "1";
                    email.value = ""
                    password.value = ""
                    let clickEvent = new Event ("click");
                    loginBtn.dispatchEvent(clickEvent);
                }
                console.log(data)
            })
            .catch(error=>{
                console.log(error);
            })
        }
        
    } //end if

    if (submitBtn.value == "Login"){

        if (password.value && email.value){
            fetch("/login/auth",{
                method: "PUT",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify(bodyObject)
            })
            .then(response=>{
                return response.json();
            })
            .then(data=>{
                if (data.errorCode == 310){
                    email.style.border =  "2px solid rgba(255, 0, 0, 0.801)"
                    password.style.border =  "2px solid rgba(255, 0, 0, 0.801)"
                    message.style.opacity = "1";
                    message.children[0].innerHTML = data.message;
                } else{
                    console.log("Success")
                    window.location = "/salepage"
                }
            })
            .catch(error=>{
                console.log(error);
            })
        }
       
    } //end if 

  
})

email.addEventListener("keypress",()=>{
    email.style.border = "";
})
password.addEventListener("keypress",()=>{
    password.style.border = "";
})

