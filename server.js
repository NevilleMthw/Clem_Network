var express = require('express');
var mysql = require("mysql");
var bodyParser =  require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.get('/home', handleGetRequest);
app.get('/loginregister', handleGetRequest);
app.use(express.static('public'));
app.use(express.static('templates'));
app.listen(8080);
var home = "<!DOCTYPE html> <html lang='en'> <head> <meta charset='UTF-8'> <meta name='viewport' content='width=<device-width>, initial-scale=1.0'> <link rel='stylesheet' type='text/css' href='../style.css'> <title>Clem_Network</title> </head> <body> <div class = 'navigation'> <nav> <ul> <li><a onclick='homeStart()'>Home</a></li> <li><a onclick='accountStart()'>Account</a></li> <li><a href='#'>Login/Register</a></li> <li><a href='#'>Post</a></li> <li><a href='#'>Feed</a></li> </ul> </nav> </div> <content> <div class='con'> <div class = 'intro'> <h1>HELLO!</h1> <p>Welcome to The Clem_Network.</p> </div> <div class = 'about-us'> <div class = 'con'> <div class = 'about_us'> <h1>ABOUT THE WEBSITE</h1> <p>This website was based off of the original Clem character from a game called Warframe. This is a full fledged single page social media website where one can post about their day and more. Hope you like it!</p> </div> </div> </div> </content> </body> </html>";
var loginregister = "<!DOCTYPE html> <html lang='en'> <head> <meta charset='UTF-8'> <meta content='width=&lt;device-width&gt;, initial-scale=1.0' name='viewport'> <link href='../public/style.css' rel='stylesheet' type='text/css'> <title>LOGIN/REGISTER</title> </head> <body> <div class='navigation'> <nav> <ul> <li> <a href='/'>Home</a> </li> <li> <a href='#'>Account</a> </li> <li> <a href='#'>Login/Register</a> </li> <li> <a href='#'>Post</a> </li> <li> <a href='#'>Feed</a> </li> </ul> </nav> </div> <div class='container'> <div class='container-forms'> <div class='container-info'> <div class='info-item'> <div class='table'> <div class='table-cell'> <p> Interesting. </p> <div class='btn'> Login </div> </div> </div> </div> <div class='info-item'> <div class='table'> <div class='table-cell'> <p> BECOME AWESOME. </p> <div class='btn'> Register </div> </div> </div> </div> </div> <div class='container-form'> <div class='form-item log-in'> <div class='table'> <div class='table-cell'> <input name='Username' placeholder='Username' type='text' /><input name='Password' placeholder='Password' type='Password' /> <div class='btn'> Login </div> </div> </div> </div> <div class='form-item sign-up'> <div class='table'> <div class='table-cell'> <input name='Username' placeholder='Username' type='text' /><input name='Password' placeholder='Password' type='Password' /> <div class='btn'> Enrol </div> </div> </div> </div> </div> </div> </div> </body> </html>";
function handleGetRequest(request, response) {
	//Split the path of the request into its components
	var pathArray = request.url.split('/');
	//Get the last part of the path
	var pathEnd = pathArray[pathArray.length - 1];
	//If path ends with 'users' we return all users
	if (pathEnd === 'home') {
		response.send(home);
	} else if (pathEnd === 'loginregister') {
		response.send(loginregister);
	}
	//The path is not recognized. Return an error message
	else response.send('{error: "Path not recognized"}');
}
