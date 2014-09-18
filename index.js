var connect = require('connect');
var login = require('./login');

var app = connect();

app.use(connect.json()); // Parse JSON request body into `request.body`
app.use(connect.urlencoded()); // Parse form in request body into `request.body`
app.use(connect.cookieParser()); // Parse cookies in the request headers into `request.cookies`
app.use(connect.query()); // Parse query string into `request.query`

app.use('/', main);

function main(request, response, next) {
	switch (request.method) {
		case 'GET': get(request, response); break;
		case 'POST': post(request, response); break;
		case 'DELETE': del(request, response); break;
		case 'PUT': put(request, response); break;
	}
};

function get(request, response) {
	var cookies = request.cookies;
	console.log(cookies);
	if ('session_id' in cookies) {
		var sid = cookies['session_id'];
		if ( login.isLoggedIn(sid) ) {
			response.setHeader('Set-Cookie', 'session_id=' + sid);
			response.end(login.hello(sid));	
		} else {
			response.end("Invalid session_id! Please login again\n");
		}
	} else {
		response.end("Please login via HTTP POST\n");
	}
};

function post(request, response) {
        // reading 'name and email from the request.body'
        var name = request.body.name;
        var email = request.body.email;
        // setting new var newSessionId = login.login('xxx', 'xxx@gmail.com') using the data from request.body
        var newSessionId = login.login(name, email);
        // set new session id to the 'session_id' cookie in the response
        response.setHeader('Set-Cookie', 'session_id=' + newSessionId)
        //Replacing the newsessionid in login.hello
        response.end(login.hello(newSessionId));
};


function del(request, response) {
	console.log("DELETE:: Logout from the server");
	var cookies=request.cookies;
	// Get session id from cookies
	var sessionId=cookies.session_id;
	// Performed logout process	
	login.logout(sessionId);
  	response.end('Logged out \n');
};

function put(request, response) {
	console.log("PUT:: Re-generate new seesion_id for the same user");
	var cookies=request.cookies;
	var sessionId=cookies.session_id;
	// Taking last name and email using last sessionId from sessionMap using functions implemented in login.js
	var lastname=login.lastName(sessionId);
	var lastemail=login.lastEmail(sessionId);
	console.log("Re-generate new session_id for the same user");
	// Generating New Session ID and store New Session ID	
	var newSessionId = login.login(lastname, lastemail);
	response.setHeader('Set-Cookie', 'session_id=' + newSessionId);
	// Removing old session id from sessionMap
    login.removeoldsessionid(sessionId);
	response.end("Re-freshed session id\n "+ newSessionId);
};

app.listen(8000);

console.log("Node.JS server running at 8000...");
