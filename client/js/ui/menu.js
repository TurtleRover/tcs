(function() {

	var hamburger = {
		navToggle: document.querySelector('.statusbar_menu_bar'),
		nav: document.querySelector('nav'),

		doToggle: function(e) {
			e.preventDefault();
			this.navToggle.classList.toggle('statusbar_menu_bar-expanded');
			this.nav.classList.toggle('expanded');
		}
	};

	document.querySelector('.statusbar_menu').addEventListener('click', function(e) { hamburger.doToggle(e); });

}());
