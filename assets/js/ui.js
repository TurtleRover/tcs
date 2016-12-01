/*
 * UI is responsible for all interactions User <-> Application
 * It uses the Revealing Module Pattern
 * https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
*/

var ui = (function () {
	/*
	 * 																		PRIVATE area
	 */
	
	/*
	 *																	MULTILANGUAGE
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
		var lng = $("#languageSelector select option:selected").val();
		console.log("interface language: " + lng);
		return lng;
	}

	/*
	 *	initialize i18next, load JSON translations and change displayed language
	 */
	function initializeMultilanguage() {
		//	display selector and read last used language (from cookies)
		var lng = String(displayLanguageSelector()).toLowerCase();

		//	initialize i18next library
		i18next.use(window.i18nextXHRBackend);
		i18next.init({
			"debug": false,
			"lng": lng,
			"fallbackLng": false,
			"backend": {
				"loadPath": "locales/{{lng}}.json"
			}},(err, t) => {
				// initialized and ready to go!
				console.log(i18next.t('dupa'));
			}
		);
	}
	
	/*
	 *																	OTHER
	 */
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
	$("#myButton").click(function(){sendMessageToController("myButton");
	});
	
	/*
	 * 																		PUBLIC area
	 * Reveal public pointers to private functions and properties.
	 */
	return {
		publicInitializeMultilanguage: initializeMultilanguage
	};
})();