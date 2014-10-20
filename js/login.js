	

var usernameCookie, passwordCookie;
var username, password;
var jsonUser = [];
var jsonLogout = [];
var loginURL = "http://api.blendoku.verbunden.net/v1/user/logins.json";
var logoutURL = "http://api.blendoku.verbunden.net/v1/user/logouts.json";

$(document).ready(function(){
	
	//if(usernameCookie == '' &&  == ''){
		showLogin();// show the loginform when user arrives on page
		
	//}
	
	$('.button').click(function(event){
		event.preventDefault();
		
		username = $('input#username').val();		
		password = $('input#password').val();
		
		usernameCookie = $.cookie("username", username, { expires: 1, path: '/' });		// create cookie for username, expires after 1 day
		passwordCookie = $.cookie("password", password, { expires: 1, path: '/' });		// create cookie for password, expires after 1 day
		


		
		// construct the json for the userdata
		jsonUser = '{';
			
		jsonUser +=	'"user":{"name":"'+username+'","password":"'+password+'"}}';
		
		// send the userJson to the server which checks if he exists or needs to be created
		$.ajax({
			type: "POST",
			url: loginURL,
			data: jsonUser,
			datatype: "json",
			contentType: "application/json; charset=utf-8",
			
			success: function(data){
				if(data['status'] == 'wrong_password'){
					alert("Du hast ein falsches Passwort eingegeben.\nBitte versuche es erneut.");	
					resetPassword();
				}
				if(data['status'] == 'short_username'){
					alert('Dein Benutzername passt nicht zu dem Passwort! \nBitte versuche es erneut.');
					resetName();
					resetPassword();
				}
				if(data['status'] == 'short_password'){
					alert('Dein Passwort muss mindestens 5 Zeichen beinhalten.');
					resetPassword();
				}
				else{
					jsonLogout = '{"user":{"name":"'+data['name']+'","accesstoken":"'+data['accesstoken']+'"}}';
					$.cookie("accesstoken", data['accesstoken'], { expires: 1, path: '/' });
					$('.logout').addClass('open');		// shows up logout-button
					$('.login').removeClass('open');	// hides login-form
					$('.mainMenu').css("display", "block");
				}
			},
			failure: function(errMsg) {
			  alert(errMsg);
			}
		});
				user["name"] = $.cookie("username");
		user["accesstoken"] = $.cookie("accesstoken");

		user["password"] = $.cookie("password");
	});
	
	$('.logout').click(function(){
		
		// send userJson to server which deletes the accesskey of the user -> he than is logged out
		$.ajax({
			url: logoutURL,
			dataType: "json",
			data: jsonLogout,
			type: "POST",
			success: function(data){
				alert("Du hast dich erfolgreich ausgeloggt.\nBis bald.");
				$('.logout').removeClass('open');
				resetPassword();				// when logged out the password mst not be set. otherwise a third party could use account illegally
				showLogin();
			},
			failure: function(errMsg) {
			  alert(errMsg);
			}
		});
		
	});


	function showLogin(){
		$('.login').addClass('open');					
		$('.mainMenu').css("display", "none");
	}
	
	function resetPassword(){
		$('.login #password').val('');
	}

	function resetName(){
		$('.login #username').val('');
	}

});
