$(document).ready(function() {
    var loginForm = $("#login"),
        loginBtn = $("#login input[type='submit']");


    // Admin Login Form validition
    loginForm.on("submit", function(event) {
        event.preventDefault();
        var loginUser = $("#login input[name='username']").val(),
            loginPassword = $("#login input[type='password']").val(),
            adminCred = "admin";
        console.log(loginPassword, loginUser);
        if (loginUser == adminCred && loginPassword == adminCred) {
            window.location.href = '../admin.html';
        } else {
            window.location.href = '../';
        }
    })

});
