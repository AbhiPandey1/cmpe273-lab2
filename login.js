/**
 * Login Class
 */
function Login() {
	// sessionId -> user map
	this.sessionMap = {
		99999 : { name: 'Foo', email: 'foo@bar.com' }
	};
}
/**
 * Say Hello {name} to the user
 */
Login.prototype.hello = function(sessionId) {
	return 'Hello ' + this.sessionMap[sessionId].name + '\n';
};

/**
 * Check whether the given session id is valid (is in sessionMap) or not.
 */
Login.prototype.isLoggedIn = function(sessionId) {
	return sessionId in this.sessionMap;
};

/**
 * Create a new session id for the given user.
 */
Login.prototype.login = function(_name, _email) {
   /*
	* Generate unique session id and set it into sessionMap like foo@bar.com
	*/
	var sessionId = new Date().getTime();
	this.sessionMap[sessionId] = { name: _name, email: _email } 
	
	console.log('new session id ' + sessionId + ' for login::' + _email);
	
	return sessionId;
};
/**
 * Get Current name using current session id 
 */
Login.prototype.lastName = function(sessionId)
{
 return this.sessionMap[sessionId].name;
};

/**
 * Get Current name using current session id  
 */
Login.prototype.lastEmail = function(sessionId)
{
 return this.sessionMap[sessionId].email;
};

/**
 * Removing the old session id after refreshing session from SessionMap
 **/
Login.prototype.removeoldsessionid = function(sessionId)
{
	// Delete the old session id from sessionMap 
	delete this.sessionMap[sessionId];
	return "done";
};

/**
 * Logout from the server
 */ 
Login.prototype.logout = function(sessionId) {
	//deleting the session id after logout
	delete this.sessionMap[sessionId];
	
  
};

// Export the Login class
module.exports = new Login();
