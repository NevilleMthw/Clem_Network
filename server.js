var express = require('express');
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({
	extended: false
}));
app.get('/home', handleGetRequest);
app.get('/loginregister', handleGetRequest);
app.use(express.static('public'));
app.use(express.static('templates'));
var home = "<!DOCTYPE html> <html lang='en'> <head> <meta charset='UTF-8'> <meta content='width=&lt;device-width&gt;, initial-scale=1.0' name='viewport'> <link href='../style.css' rel='stylesheet' type='text/css'> <title>Clem_Network</title> <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script> </head> <body> <div class='navigation'> <nav> <ul> <li> <a onclick='homeStart()'>Home</a> </li> <li> <a href='#'>Account</a> </li> <li> <a onclick='accountStart()'>Login/Register</a> </li> <li> <a href='#'>Post</a> </li> <li> <a href='#'>Feed</a> </li> </ul> </nav> </div> <div class='con'> <div class='intro'> <h1>HELLO!</h1> <p>Welcome to The Clem_Network.</p> </div> <div class='about-us'> <div class='con'> <div class='about_us'> <h1>ABOUT THE WEBSITE</h1> <p>This website was based off of the original Clem character from a game called Warframe. This is a full fledged single page social media website where one can post about their day and more. Hope you like it!</p> </div> </div> </div> </div> </body> </html>";
var loginregister = "<!DOCTYPE html> <html lang='en'> <head> <meta charset='UTF-8'> <meta content='width=&lt;device-width&gt;, initial-scale=1.0' name='viewport'> <link href='../public/style.css' rel='stylesheet' type='text/css'> <title>LOGIN/REGISTER</title> </head> <body> <div class='navigation'> <nav> <ul> <li> <a href='/'>Home</a> </li> <li> <a href='#'>Account</a> </li> <li> <a href='#'>Login/Register</a> </li> <li> <a href='#'>Post</a> </li> <li> <a href='#'>Feed</a> </li> </ul> </nav> </div> <div class='container'> <div class='container-forms'> <div class='container-info'> <div class='info-item'> <div class='table'> <div class='table-cell'> <p> Interesting. </p> <div class='btn'> Login </div> </div> </div> </div> <div class='info-item'> <div class='table'> <div class='table-cell'> <p> BECOME AWESOME. </p> <div class='btn'> Register </div> </div> </div> </div> </div> <div class='container-form'> <div class='form-item log-in'> <div class='table'> <div class='table-cell'> <input name='Username' id = 'user' placeholder='Username' type='text' /><input name='Password' id = 'pass' placeholder='Password' type='Password' /> <button class='loginregister' onclick='login()'>Login</button></div> </div> </div> <div class='form-item sign-up'> <div class='table'> <div class='table-cell'> <input name='Username' id = 'user1' placeholder='Username' type='text' /><input name='Password' id = 'pass1' placeholder='Password' type='Password' /> <button class = 'loginregister' onclick='register1()'>Register</button> </div> </div> </div> </div> </div> </div> </body> </html>"

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

function handleLogin(request, response) {
	var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'account',
		port: 3307
	});
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected");
	});
	var sql = "Select * from users where username='" + request.body.user + "'";
	con.query(sql, function(err, result) {
		if (err) throw err;
		console.log(JSON.stringify(result));
		if (result.length == 0) response.send("Please Input Details!");
		else {
			result.forEach(function(u) {
				if (u.password === request.body.pass) {
					response.send("OK");
					request.session.loggedIn = true;
					request.session.username = request.body.user;
					app.get('/login', function(request, response) {
						if (request.session.loggedIn = true) {
							response.send('Welcome back!');
						} else {
							response.send('Please login to view this page!');
						}
						response.end();
					});
				} else response.send("Incorrect Password");
			});
		}
	});
	con.end();
}
app.post('/login', handleLogin);

function handleRegister(request, response) {
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "account",
		port: 3307
	});
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected");
	});
	var sql1 = "Select * from users where username='" + request.body.user + "'";
	con.query(sql1, function(err, result) {
		if (err) throw err;
		console.log("result length is: " + result.length);
		if (result.length != 0) {
			response.send("This username is already taken. Please try again.");
			console.log(JSON.stringify(result));
		} else {
			response.send("OK");
		}
	});
	con.end();
}
app.post('/checkDetails', handleRegister);

function handleRegister2(request, response) {
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "account",
		port: 3307
	});
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected");
	});
	var sql2 = "insert into users values ('" + request.body.user + "','" + request.body.pass + "')";
	con.query(sql2, function(err, result) {
		if (err) throw err;
		response.send("OK");
		console.log("Successfully registered" + request.body.user);
	});
	con.end();
}
app.post('/register', handleRegister2);
app.listen(8080);