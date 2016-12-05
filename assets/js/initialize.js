/*
 * Functions to call when page is loaded 
*/

$(document).ready(function() {
    //	initialize internationalization
    ui.publicInitializeMultilanguage();

    //  imitate freshly loaded page
    setTimeout(function(){controller.publicMainPageLoaded();}, 5000);
})