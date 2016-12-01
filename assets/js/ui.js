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
		
		//	change displayed language
		setLanguage($("#languageSelector select option:selected").val().toLowerCase());
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
	 *	set displayed language
	 */
	function setLanguage(lng) {
		i18next.use(window.i18nextXHRBackend);
		i18next.init({
			"debug": false,
			"lng": lng,
			"fallbackLng": false,
			"backend": {
				"loadPath": "locales/{{lng}}.json"
			}},(err, t) => {
				// initialized and ready to go!
				console.log("Initialized: " + i18next.t('my-button'));

				//	translate all elements with class 'localised'
				$(".localised").each(function(index) {
					console.log($(this).attr('id'));
					var id = $(this).attr('id');
					$(this).text(i18next.t(id));
				});
			}
		);
	}

	/*
	 *	initialize i18next, load JSON translations and change displayed language
	 */
	function initializeMultilanguage() {
		//	display selector and read last used language (from cookies)
		var lng = String(displayLanguageSelector()).toLowerCase();

		setLanguage(lng);
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
	$("#my-button").click(function(){sendMessageToController("my-button");
	});
	
	/*
	 * 																		PUBLIC area
	 * Reveal public pointers to private functions and properties.
	 */
	return {
		publicInitializeMultilanguage: initializeMultilanguage
	};
})();