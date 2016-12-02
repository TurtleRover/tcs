/*
 * Functions to call when page is loaded 
*/

function initialize() {
    //	initialize internationalization
    ui.publicInitializeMultilanguage();

    //  imitate freshly loaded page
    setTimeout(function(){controller.publicMainPageLoaded();}, 5000);
}