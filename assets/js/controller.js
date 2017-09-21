/*
 *	Controller is a master module in an application.
 *	It uses the Revealing Module Pattern
 *	https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
 */
const DEBUG = true;

var controller = (function () {
    /*
     * Called when main page is loaded and camera video should be displayed
     */
    function mainPageLoaded() {
        setTimeout(function () {
            amplify.publish("controller->ui", "hide welcome screen");
            if (linux.getIsCameraAvailable() == true) {
                amplify.publish("controller->ui", "change image source to camera");
            } else {
                amplify.publish("controller->ui", "change image source to default background");
            }
            amplify.publish("controller->ui", "display camera video");
        }, 500);
    };

    /*
     * Event triggers
     */
    $(window).bind('beforeunload', function () {
        closePage();
    });

    /*
     * Subscribe to all topics
     */
    amplify.subscribe("ui->controller", uiMessageCallback);
    amplify.subscribe("linux->controller", linuxMessageCallback);

    /*
     * Callback functions
     */
    function uiMessageCallback(message) {
        if (DEBUG)
            console.log("uiMessageCallback: " + message);
        if (DEBUG)
            amplify.publish("all->utests", message);

        switch (message) {
            case "ui is ready for operation":
                documentReadyCallback();
                break;
            case "GO button is pressed":
                mainPageLoaded();
                break;
            case "ui close page":
                closePage();
                break;
            default:
                console.log("unknown command: " + message);
        }
    };

    function linuxMessageCallback(message) {
        if (DEBUG)
            console.log("linuxMessageCallback: " + message);

        switch (message) {
            case "communication established":
                amplify.publish("controller->ui", "wait until GO button is pressed");
                break;
            default:
                console.log("unknown command: " + message);
        }
    };

    /*
     * Called when ui send ready message
     */
    function documentReadyCallback() {
        if (DEBUG)
            console.log("document ready callback");

        // Initialize application UI
        amplify.publish("controller->ui", "initialize ui");

        // Initialize multiple languages
        amplify.publish("controller->ui", "initialize multilanguage");

        // Start python server
        setTimeout(function () {
            amplify.publish("controller->linux", "start python server");
            amplify.publish("controller->ui", "turtle is awake");
        }, 1500);
    };

    /*
     * Called when page is unloaded
     */
    function closePage() {
        if (linux.getIsCameraAvailable()) {
            amplify.publish("controller->linux", "stop python server");
        }
    };

    /*
     * Reveal public pointers to private functions and properties.
     */
    return {
    };
})();