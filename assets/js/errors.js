/*
 * error handling for the whole application
 * 
 * catch all errors using window object
*/

window.addEventListener('error', function(e){
	var error = e.error;
	console.log("ERROR:\t" + error + "\tSTACK:\t" + error.stack);
});