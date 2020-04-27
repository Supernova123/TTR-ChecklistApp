//Client.JS handles and loads in login page functions

//Handles Login Page errors and AJAX calls
const handleLogin = (e) => {
    e.preventDefault();
    
    //Login error messages
    $('#flippyMessage').animate({width:'hide'}, 350);
    
    if($("#user").val() == '' || $("#pass").val() == ''){
        handleError("ToonTip: Username or password is empty");
        console.log("Client.js handleLogin -> Empty username or password called");
        return false;
    }
    
    //Check session token
    console.log($("input[name=_csrf]").val());
    
    //Sends AJAX call
    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
    
    return false;
};


//Handles Signup Page errors and AJAX calls
const handleSignup = (e) => {
    e.preventDefault();
    
    //Login error messages
    $("#flippyMessage").animate({width:'hide'},350);
    
    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("ToonTip: All fields are required");
        console.log("Client.js handleSignup -> All fields required called");
        return false;
    }
    
    if($("#pass").val() !== $("#pass2").val()) {
        handleError("ToonTip: Passwords do not match");
        console.log("Client.js handleSignup -> Matching passwords called");
        return false;
    }
    
    //Sends AJAX call
    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
    
    return false;
};


//Handles Password Change Page errors and AJAX calls
const handleChangePassword = (e) => {
    e.preventDefault();
    
    //Password change page error messages
    $("#flippyMessage").animate({width:'hide'},350);
    
    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("ToonTip: All fields are required");
        console.log("Client.js handleChangePass -> All fields required called");
        return false;
    }
    
    if($("#pass").val() !== $("#pass2").val()) {
        handleError("ToonTip: Passwords do not match");
        console.log("Client.js handleChangePass -> Matching passwords called");
        return false;
    }
    
    //Sends AJAX call
    sendAjax('POST', $("#changePassForm").attr("action"), $("#changePassForm").serialize(), redirect);
    
    return false;
};


//Loads in Login Window Form
const LoginWindow = (props) => {
    return (
        <form id="loginForm" 
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
            >
            
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username"/>
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password"/>
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className="formSubmit" type="submit" value="Login" />
            
        </form>
    );
};

//Loads in Signup Window Form
const SignupWindow = (props) => {
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
            >
            
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username"/>
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password"/>
            <label htmlFor="pass2">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign Up" />
        
        </form>
    );
};

//Loads in Password Change Form
const ChangePassWindow = (props) => {
    return (
        <form id="changePassForm"
            name="changePassForm"
            onSubmit={handleChangePassword}
            action="/changepassword"
            method="POST"
            className="mainForm"
            >
            
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username"/>
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password"/>
            <label htmlFor="pass2">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Change Password" />
        
        </form>
    );
};

//Creates Login Window
const createLoginWindow = (csrf) => {
    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

//Creates Signup Window
const createSignupWindow = (csrf) => {
    ReactDOM.render(
        <SignupWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};


//Creates Password Change Window
const createChangePassWindow = (csrf) => {
    ReactDOM.render(
        <ChangePassWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

//Setups the necessary page and button functions
const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");
    const changePassButton = document.querySelector("#changePassButton");
    
    changePassButton.addEventListener("click", (e) => {
        e.preventDefault();
        createChangePassWindow(csrf);
        return false;
    });
    
    signupButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });
    
    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });
    
    createLoginWindow(csrf) 
};

//Gets unique session token
const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

//Gets the session token when the page has been loaded
$(document).ready(function(){
    getToken();
});