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
	 *																		INTERFACE functions
	 */
	function updateInterface() {
		/*	set width of right navigation div */
		$('#right-navigation-div').css("height", $('#right-navigation-div').width() + 0.03 * $(window).height());
	}

	updateInterface();

	window.addEventListener('resize', function(event) {
		updateInterface();
	});

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
	 *	saves the date of loading the session - used for timer
	 */
	var startTime = new Date();
	setInterval(function(){updateSessionTimer()}, 1000);

	function updateSessionTimer() {
		var time = new Date();
		var diff = time - startTime;
		diff = Math.round(diff/1000);	// change from milliseconds to seconds
		var minutes = Math.floor(diff / 60);
		var seconds = diff - minutes * 60;

		//	add leading 0 to the string
		function pad(n) {
			return (n < 10) ? ("0" + n) : n;
		}

		$('#session-time-h1').text(pad(String(minutes)) + ":" + pad(String(seconds)));
	};

	function advancedInterfaceChanged() {
		if($("#advanced-interface-button").prop('checked') == false) {
			Cookies.set("advanced-interface", false);
			$(".advanced-interface").fadeIn();
		}
		else {
			Cookies.set("advanced-interface", true);
			$(".advanced-interface").fadeOut();
		}
	};

	/*function photographyChanged() {
		if($("#photography-button").prop('checked') == false) {
			Cookies.set("photography", false);
		}
		else {
			Cookies.set("photography", true);
		}
	}*/

	/*
	 *	run popup window with shellinabox
	 */
	function consoleButtonClicked() {
		//	run shellbox
		message = "<iframe src=http://" + location.hostname + "/shell id='shellinabox-iframe'></iframe>";
		$('#banner').trigger("click");
		vex.dialog.alert({
			unsafeMessage: message
		})
	};

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
				"loadPath": "/client/locales/{{lng}}.json"
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
		/* if (camera && isInternetExplorer()) {
			setInterval(function (){
				time = new Date();
				$("#camera-video-img").attr("src", "http://192.168.10.1:8090/?action=snapshot&time="+ time.getTime());
			}, 100);
		}
		else if (camera) $("#camera-video-img").attr("src", "http://192.168.10.1:8090/?action=stream");
		else $("#camera-video-img").attr("src", "client/img/marsyard-camera.jpg");

		if (camera) {
			//	rotate camera
			var deg = 0;
			var rotate = 'rotate(' + deg + 'deg)';
			$("#camera-video-img").each(function () {
				$(this).css({
					'-webkit-transform': rotate,
					'-moz-transform': rotate,
					'-o-transform': rotate,
					'-ms-transform': rotate,
					'transform': rotate
				});
			});
		} */
	}

	/*
	 *	hide welcome screen is called when page is already loaded
	 */
	function hideWelcomeScreen() {
		$(".inner").fadeOut("slow");
	}
	function displayCameraVideo() {
		$("#camera-video").fadeIn();
		$("#navigation-ring-div").fadeIn();

		$(".alt").fadeIn();
		$(".footer").fadeIn();

		//	hide some elements if interface in advanced mode
		if($("#advanced-interface-button").prop('checked') == true) $(".advanced-interface").hide();

		updateInterface();
	}

	/*
	 *	display welcome screen
	 */
	function displayWelocmeScreen() {
		$("#go-button").fadeIn();
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
	 *	take schreenshot of the view and prompt to save
	 */
	function takeScreenShot() {
		/*html2canvas(document.body, {
			onrendered: function (canvas) {
				console.log("saved as image");
				canvas.toBlob(function(blob) {
					saveAs(blob, "snap.png");
				});
			}
		});*/
		var video = document.getElementById('camera-video-img');
		var canvas = document.getElementById('snap-background-canvas');
		var context = canvas.getContext('2d');
		canvas.width = video.clientWidth;
		canvas.height = video.clientHeight;

		context.drawImage(video,0,0,video.clientWidth,video.clientHeight);

		/*
		 *	draw also turtle logo
		 */
		var img = new Image;

		/*canvas.toBlob(function(blob) {
			saveAs(blob, "turtle_snap.png");
		});*/

		img.src = 'client/img/hud/turtle-logo.png';


			var logoWidth = video.clientWidth / 12;
			var logoHeight = logoWidth * 0.265;
			context.drawImage(img, 25, 10, logoWidth, logoHeight);
			var d = new Date();
			var link = document.getElementById('snap-download-a');
			link.href = canvas.toDataURL();
			link.download = "turtle_" + d.getFullYear() + "_" + d.getMonth() + 1 + "_" + d.getDate() + "_" + d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds() + ".png";
	}

	function recordVideo() {
		amplify.publish("ui->webrtc", "start stop recording");
	}

	/*
	 *	full screen mode has been changed
	 */
	function changedFullScreen() {
		if ($(document).fullScreen()) {
			//$("#full-screen-button-img").attr("src", "client/img/navigation/fullscreen-exit.png");
		}
		else {
			//$("#full-screen-button-img").attr("src", "client/img/navigation/fullscreen.png");
		}
	}

	/*
	 *	show or hide side menu
	 */
	function showHideMenu(pointer) {
		if (pointer.is(":visible")) {
			setTimeout(function() {pointer.hide();},250);
			var height = String(pointer.height()) + "px";
			pointer.transition({ y: height });
		}
		else {
			pointer.show();
			var height = "-" + String(pointer.height()) + "px";
			pointer.transition({ y: 0 });
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
	 *	if the rover has mounted camera rotation device, the slider should be back to the center if touchup and mousup
	 */
	/*function gripperSliderUp() {
		if($("#photography-button").prop('checked'))
			$("#gripper-slider-input").val(
				(parseInt($("#gripper-slider-input").attr("max"))+parseInt($("#gripper-slider-input").attr("min"))) * 0.5);
	}
	function cameraSliderUp() {
		$("#camera-slider-input").val(
			(parseInt($("#camera-slider-input").attr("max"))+parseInt($("#camera-slider-input").attr("min"))) * 0.5);
	}*/

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
			case "wait until GO button is pressed":
				displayWelocmeScreen();
				setLastStatusDone(true);
				addNewStatus("turtle is ready to go!");
				setTimeout(function() {
					setLastStatusDone(true);
					addNewStatus("battery voltage: ", "battery-level-text", false);
					addNewStatus("signal strength: ", "signal-strength-text", false);
					addNewStatus("processor temp.: ", "processor-temperature-text", false);
				}, 1000);
				break;
			case "turtle is awake":
				setLastStatusDone(true);
				addNewStatus("connecting...");
				break;
			default:
				console.log("unknown command: " + message);
		}
	}

	function allMessageCallback(message) {
		//if (DEBUG) console.log("all->ui: " + message);

		//	choose action
		switch(message) {
			case "notifications.working-on":
				displayNotification(message);
				break;
			case "notifications.server-connection-error":
				displayNotification(message);
				break;
			case "notifications.client-already-connected":
				displayNotification(message);
				break;
			case "console button clicked":
				consoleButtonClicked();
				break;
			case "set last status done":
				setLastStatusDone(true);
				break;
			case "set last status error":
				setLastStatusDone(false);
				break;
			case "initialize camera...":
				addNewStatus(message);
				break;
			case "set battery level to full":
				setBatteryLevel(4);
				break;
			case "set battery level to 3":
				setBatteryLevel(3);
				break;
			case "set battery level to 2":
				setBatteryLevel(2);
				break;
			case "set battery level to 1":
				setBatteryLevel(1);
				break;
			case "set battery level to 0":
				setBatteryLevel(0);
				break;

			default:
				console.log("unknown command: " + message);
		}
	}

	/*
	 * 																		EVENT functions
	 */
	$("#languageSelector").change(function(e, data) {languageChanged(data);});
	$(".fullscreen-button-img").click(function() {toggleFullScreen();});
	$("#snap-button-img").click(function() {takeScreenShot();});
	$("#record-button-img").click(function() {recordVideo();});
	$(document).bind("fullscreenchange", function() {changedFullScreen();});
	$("#advanced-interface-button").change(function(e, data) {advancedInterfaceChanged();});
	//$("#photography-button").change(function(e, data) {photographyChanged();});
	$("#go-button").click(function() {
		var remoteVideoElement = document.getElementById('camera-video-img');
		remoteVideoElement.play();
		toggleFullScreen();
		amplify.publish("ui->controller", "GO button is pressed");
	});
	$("#open-console-button").click(function() {consoleButtonClicked();});

	$("#show-hide-right-menu-img").click(function() {showHideMenu($("#right-navigation-div"));});

	$("#brightness-slider").change(function(e, data) {amplify.publish("ui->port8080", "update camera settings");});
	$("#contrast-slider").change(function(e, data) {amplify.publish("ui->port8080", "update camera settings");});
	$("#saturation-slider").change(function(e, data) {amplify.publish("ui->port8080", "update camera settings");});
	$("#hue-slider").change(function(e, data) {amplify.publish("ui->port8080", "update camera settings");});
	$("#gamma-slider").change(function(e, data) {amplify.publish("ui->port8080", "update camera settings");});
	$("#gain-slider").change(function(e, data) {amplify.publish("ui->port8080", "update camera settings");});
	$("#sharpness-slider").change(function(e, data) {amplify.publish("ui->port8080", "update camera settings");});

	$("#gripper-slider").on("input", function(e, data) {amplify.publish("ui->port8080", "set new gripper position");});
	//$("#camera-slider").on("input", function(e, data) {amplify.publish("ui->port8080", "set new camera position");});
	/*
	 * TBD: is it better to have it back to the center or not?
	$("#gripper-slider").on("mouseup touchend", function(e, data) {gripperSliderUp();});
	$("#camera-slider").on("mouseup touchend", function(e, data) {cameraSliderUp();});
	*/

	$("#mani-axis-1").change(function(e, data) {amplify.publish("ui->port8080", "set new mani position");});
	$("#mani-axis-2").change(function(e, data) {amplify.publish("ui->port8080", "set new mani position");});

	$("#mani-x").change(function(e, data) {amplify.publish("ui->manipulator", "move mani");});
	$("#mani-y").change(function(e, data) {amplify.publish("ui->manipulator", "move mani");});

	$("#grab-text").click(function(e, data) {grabOrDriveClicked("grab");});
	$("#drive-text").click(function(e, data) {grabOrDriveClicked("drive");});

	function setBatteryLevel(level){
		if (level == 4)	$("#battery-level-indicator-img").attr('src', 'client/img/ui/nav-bar-battery.svg');
		else if (level == 3) $("#battery-level-indicator-img").attr('src', 'client/img/ui/nav-bar-battery-3.svg');
		else if (level == 2) $("#battery-level-indicator-img").attr('src', 'client/img/ui/nav-bar-battery-2.svg');
		else if (level == 1) $("#battery-level-indicator-img").attr('src', 'client/img/ui/nav-bar-battery-1.svg');
		else $("#battery-level-indicator-img").attr('src', 'client/img/ui/nav-bar-battery-0.svg');
	}

	function grabOrDriveClicked(name) {
		if (name == "grab") {
			$("#grab-text").addClass("grab-drive-text-filled-dot");
			$("#drive-text").removeClass("grab-drive-text-filled-dot");
			/*
			 *	if standard grab mode (not photography), use standard GRAB
			 *	else use GRAB for photography
			 */
			//if($("#photography-button").prop('checked') == false) {
			$("#camera-video-img").removeClass("camera-video-drive-mode");
			$("#camera-video-img").addClass("camera-video-grab-mode");
			$("#right-navigation-cross-img").fadeIn();
			$("#turtle-navigation-view-img").fadeIn();
			$("#right-navigation-cross-img").attr('src', 'client/img/ui/right-krzyz-mani.svg');
			$("#turtle-navigation-view-img").attr('src', 'client/img/ui/right-manipulator.svg');
			amplify.publish("ui->controlCanvas", "set function to GRAB");
			/*}
			else {
				//	set camera as for drive
				$("#camera-video-img").removeClass("camera-video-grab-mode");
				$("#camera-video-img").addClass("camera-video-drive-mode");
				$("#camera-slider-wrapper").fadeIn();
				$("#right-navigation-cross-img").fadeOut();
				$("#turtle-navigation-view-img").fadeOut();
			}*/

		}
		else if (name == "drive") {
			$("#camera-slider-wrapper").fadeOut();
			$("#drive-text").addClass("grab-drive-text-filled-dot");
			$("#grab-text").removeClass("grab-drive-text-filled-dot");
			$("#camera-video-img").removeClass("camera-video-grab-mode");
			$("#camera-video-img").addClass("camera-video-drive-mode");
			$("#right-navigation-cross-img").fadeIn();
			$("#turtle-navigation-view-img").fadeIn();
			$("#right-navigation-cross-img").attr('src', 'client/img/ui/right-krzyz.svg');
			$("#turtle-navigation-view-img").attr('src', 'client/img/ui/right-lazik.svg');
			amplify.publish("ui->controlCanvas", "set function to DRIVE");
		}
	}


	/*
	 *	status functions
	 */

	$("#welcome-screen-status-text").append("<p class='animation-typewriter'>turtle is awake</p>");
	$("#welcome-screen-status-text").children().last().attr('data-content', '[ ]');

	function setLastStatusDone(stat) {
		if (stat === true) {
			$("#welcome-screen-status-text").children().last().attr('data-content', '[*]');
			$("#welcome-screen-status-text").children().last().removeClass('animation-typewriter');
		}
		else {
			$("#welcome-screen-status-text").children().last().attr('data-content', '[!]');
		}
	}

	function addNewStatus(status, id, before) {
		$("#welcome-screen-status-text").append("<p class='animation-typewriter' id='" + id + "'>" + status + "</p>");
		if (before !== false) $("#welcome-screen-status-text").children().last().attr('data-content', '[ ]');
		else $("#welcome-screen-status-text").children().last().attr('data-content', "\00 \00");
	}

	/*
	 * 																		SEND information to controller
	 */
	amplify.publish("ui->controller", "ui is ready for operation");

	/*
	 *																		LOADING area
	 *	things to do while the page is loaded
	 */

	/*
	 *	this function enables jquery flagstrap form drop-down menu in #menu
	 */
	$(function() {
		// Setup drop down menu
		$('.dropdown-toggle').dropdown();

		// Fix input element click problem
		$('.dropdown input, .dropdown label').click(function(e) {
			e.stopPropagation();
			});
	});

	/*
	 *	read settings from last session
	 */
	$(function() {
		readSetting(Cookies.get("advanced-interface"), "#advanced-interface-button", "true");
		readSetting(Cookies.get("photography"), "#photography-button", "false");
	});

	function readSetting(value, name, defVal) {
		if (value == undefined) value = defVal;

		if (value == "false") $(name).prop('checked', false);
		else $(name).prop('checked', true);
	}

	/*
	 *	configure vex dialogs
	 */
	vex.defaultOptions.className='vex-theme-os';

	/*
	 * 																		PUBLIC area
	 * Reveal public pointers to private functions and properties.
	 */
	return {
	};
})();
