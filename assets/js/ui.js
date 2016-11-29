/*
 * UI is responsible for all interactions User <-> Application
 * It uses the Revealing Module Pattern
 * https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
*/

var ui = (function () {
	/*
	 * 																		PRIVATE area
	 */
	function languageChanged() {
		var newLanguage = $("#languageSelector select option:selected").val();
		console.log("new language: " + newLanguage);
		
		//	set cookie for the next visit
		Cookies.set("language", newLanguage);
	}
	
	/*
	 * 	display language selector - user can choose user interface language
	 */
	function displayLanguageSelector() {
		/*
		 * read language used in previous session
		 * if undefined set to English
		 */
		
		var previousSessionLanguage = Cookies.get("language");
		if (previousSessionLanguage == undefined) previousSessionLanguage = "US";
		
		$("#languageSelector").attr({
			"data-selected-country"	:	previousSessionLanguage
		});
		
		$("#languageSelector").flagStrap({
	        countries: {
	            "PL": "Poland",
	            "US": "United States",
	            "DE": "Germany"
	        },
	        buttonSize: "btn-sm",
	        buttonType: "btn-info",
	        labelMargin: "10px",
	        scrollable: false,
	        scrollableHeight: "350px"
	    });
		
		console.log("interface language: " + $("#languageSelector select option:selected").val());
	}
	
	/*
	 * send any type of data to the controller module
	 */
	function sendMessageToController(message) {
		amplify.publish("ui->controller", message);
	}
	
	/*
	 * 																		EVENT functions
	 */
	$("#languageSelector").change(function() {languageChanged();});
	
	/*
	 * 																		TEST functions
	 */
	$("#myButton").click(function(){
		sendMessageToController("myButton");
	});
	
	/*
	 * 																		PUBLIC area
	 * Reveal public pointers to private functions and properties.
	 */
	return {
		publicDisplayLanguageSelector: displayLanguageSelector
	};
})();