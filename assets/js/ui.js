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
	 *	obvious stupid function
	 */
	function isInternetExplorer() {
		var ua = window.navigator.userAgent;
    	var msie = ua.indexOf("MSIE ");
		var trident = ua.indexOf('Trident/');

		return(msie > 0 || trident > 0);
	}
	
	/*
	 *																	MULTILANGUAGE
	 */
	
	function languageChanged(lng) {
		var newLanguage = lng;
		console.log("new language: " + newLanguage);
		
		//	set cookie for the next visit
		Cookies.set("language", newLanguage);

		//	change displayed language
		newLanguage = newLanguage.toLowerCase();
		setLanguage(newLanguage);
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
		i18next.init({
			"debug": false,
			"lng": lng,
			"fallbackLng": false,
			"backend": {
				"loadPath": "locales/{{lng}}.json"
			}}, function(err, t) {
				// initialized and ready to go!
				if(DEBUG) console.log("Initialized: " + i18next.t('my-button'));

				//	translate all elements with class 'localised'
				$(".localised").each(function(index) {
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

		i18next.use(window.i18nextXHRBackend);
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
	 *	set the source of an image depending on connection status
	 */
	function setCameraBackground(camera) {
		if (camera && isInternetExplorer()) {
			setInterval(function (){
				time = new Date();
				$("#camera-video-img").attr("src", "http://192.168.10.1:8090/?action=snapshot&time="+ time.getTime());
			}, 100);
		}
		else if (camera) $("#camera-video-img").attr("src", "http://192.168.10.1:8090/?action=stream");
		else $("#camera-video-img").attr("src", "assets/img/marsyard-camera.jpg");
	}

	/*
	 *	hide welcome screen is called when page is already loaded
	 */
	function hideWelcomeScreen() {
		$(".inner").fadeOut("slow")
	}
	function displayCameraVideo() {
		$("#camera-video").fadeIn();
	}

	/*
	 *	switch to fullscreen mode
	 */
	function toggleFullScreen() {
		//	for internet explorer use body as full screen, not the document
		if (isInternetExplorer()) $('.landing').toggleFullScreen();
		else $(document).toggleFullScreen();		
	}

	/*
	 *	full screen mode has been changed
	 */ 
	function changedFullScreen() {
		if ($(document).fullScreen()) {
			$("#full-screen-button-img").attr("src", "assets/img/navigation/fullscreen-exit.png");
		}
		else {
			$("#full-screen-button-img").attr("src", "assets/img/navigation/fullscreen.png");
		}
	}

	/*
	 *	display notification for a user using noty library
	 */
	function displayNotification(id) {
		message = i18next.t(id);
		console.log(message);
		noty({
			layout: 'top',
			theme: 'defaultTheme',
			type: 'warning',
			timeout: 2000,
			closeWith: ['click'],
			text: '<h3 class="notification">' + message + '</h3>'
		});
	}

	/*
	 * 																		SUBSCRIBE topics
	 */
	amplify.subscribe("controller->ui", controllerMessageCallback);
	amplify.subscribe("all->ui", allMessageCallback);
	
	/*
	 * 																		CALLBACK functions
	 */
	function controllerMessageCallback(message) {
		if (DEBUG) console.log("controller->ui: " + message);
		
		//	choose action
		switch(message) {
			case "hide welcome screen":
				hideWelcomeScreen();
				break;
			case "display camera video":
				displayCameraVideo();
				break;
			case "initialize multilanguage":
				initializeMultilanguage();
				break;
			case "change image source to camera":
				setCameraBackground(true);
				break;
			case "change image source to default background":
				setCameraBackground(false);
				break;
			default:
				console.log("unknown command: " + message);
		}
	};

	function allMessageCallback(message) {
		if (DEBUG) console.log("all->ui: " + message);
		
		//	choose action
		switch(message) {
			case "notifications.working-on":
				displayNotification(message);
				break;
			case "notifications.server-connection-error":
				displayNotification(message);
				break;
			default:
				console.log("unknown command: " + message);
		}
	};

	/*
	 * 																		EVENT functions
	 */
	$("#languageSelector").change(function(e, data) {languageChanged(data);});
	$("#full-screen-button-img").click(function() {toggleFullScreen();});
	$(document).bind("fullscreenchange", function() {changedFullScreen();});
	
	/*
	 * 																		SEND information to controller
	 */
	amplify.publish("ui->controller", "ui is ready for operation");
	
	/*
	 * 																		PUBLIC area
	 * Reveal public pointers to private functions and properties.
	 */
	return {
	};
})();