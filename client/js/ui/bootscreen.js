(function() {
    let bootscreen = document.getElementById("bootscreen");

    document.onreadystatechange = function() {
        if (document.readyState === "complete") {
            bootscreen.classList.add("bootscreen-hide");
        }
    };
})();
