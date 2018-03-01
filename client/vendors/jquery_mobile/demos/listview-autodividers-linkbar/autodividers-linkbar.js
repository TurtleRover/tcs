$.mobile.document.on( "pagecreate", "#demo-page", function(){
	var head = $( ".ui-page-active [data-role='statusbar']" );

	$.mobile.document.on( "click", "#sorter li", function() {
		var top,
			letter = $( this ).text(),
			divider = $( "#sortedList" ).find( "li.ui-li-divider:contains(" + letter + ")" );

		if ( divider.length > 0 ) {
			top = divider.offset().top;
			$.mobile.silentScroll( top );
		} else {
			return false;
		}
	});
	$( "#sorter li" ).hover(function() {
		$( this ).addClass( "ui-btn" ).removeClass( "ui-li-static" );
	}, function() {
		$( this ).removeClass( "ui-btn" ).addClass( "ui-li-static" );
	});
});
$( function(){
	$.mobile.window.on( "scroll", function( e ) {
		var headTop = $(window).scrollTop(),
			foot = $( ".ui-page-active [data-role='footer']" ),
			head = $( ".ui-page-active [data-role='statusbar']" ),
			statusbarheight = head.outerHeight();

		if( headTop < statusbarheight && headTop > 0 ) {
			$( "#sorter" ).css({
				"top": statusbarheight + 15 - headTop,
				"height": window.innerHeight - head[ 0 ].offsetHeight + window.pageYOffset - 10
			});
			$("#sorter li").height( "3.7%" );
		} else if ( headTop >= statusbarheight && headTop > 0 && parseInt( headTop +
			$.mobile.window.height( )) < parseInt( foot.offset().top ) ) {

			$( "#sorter" ).css({
				"top": "15px",
				"height": window.innerHeight - 8
			});
			$("#sorter li").height( "3.7%" );
		} else if ( parseInt( headTop + window.innerHeight ) >= parseInt( foot.offset().top ) &&
			parseInt( headTop + window.innerHeight ) <= parseInt( foot.offset().top ) +
			foot.height() ) {

			$( "#sorter" ).css({
				"top": "15px",
				"height": window.innerHeight - ( parseInt( headTop + window.innerHeight ) -
					parseInt( foot.offset().top ) + 8 )
			});
		} else if( parseInt( headTop + window.innerHeight ) >= parseInt( foot.offset().top ) ) {
			$( "#sorter" ).css({
				"top": "15px"
			});
		} else {
			$( "#sorter" ).css( "top", statusbarheight + 15 );
		}
	});
});
$.mobile.window.on( "throttledresize", function() {
	$( "#sorter" ).height( window.innerHeight - statusbarheight - 20 ).css( "top", statusbarheight + 18 );
});
$.mobile.document.on( "pageshow", "#demo-page", function() {
	var statusbarheight = $( ".ui-page-active [data-role='statusbar']" ).outerHeight();

	$( "#sorter" ).height( window.innerHeight - statusbarheight - 20 ).css( "top", statusbarheight + 18 );
});
