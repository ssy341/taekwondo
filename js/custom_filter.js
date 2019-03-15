/*---------------------------Hover Fade--------------------------------*/
	$(function() {
		// START
		$(".fade").css("opacity","0.50");
		
		// ON MOUSE OVER
		$(".fade").hover(function () { 
		$(this).stop().animate({
		opacity: 1.0
		}, "slow");
	},
 
	// ON MOUSE OUT
	function () {
		$(this).stop().animate({
		opacity: 0.50
		}, "slow");
	});
});
/*---------------------------Portfolio Description Hover Fade--------------------------------*/	
	$(function() {
		// START
		$(".project ul a.alternate, .project ul a.alternate2, .project ul a.alternate3, .project ul a.alternate4, .recent ul a.alternate, .recent ul a.alternate2, .recent ul a.alternate3, .recent ul a.alternate4, .wall ul a.alternate, .wall ul a.alternate2, .wall ul a.alternate3, .wall ul a.alternate4").css("opacity","0");
		
		// ON MOUSE OVER
		$(".project ul a.alternate, .project ul a.alternate2, .project ul a.alternate3, .project ul a.alternate4, .recent ul a.alternate, .recent ul a.alternate2, .recent ul a.alternate3, .recent ul a.alternate4, .wall ul a.alternate, .wall ul a.alternate2, .wall ul a.alternate3, .wall ul a.alternate4").hover(function () { 
		$(this).stop().animate({
		opacity: 1.0
		}, "slow");
	},
 
	// ON MOUSE OUT
	function () {
		$(this).stop().animate({
		opacity: 0
		}, "fast");
	});
});
/*---------------------------Tabs--------------------------------*/
    if(jQuery() .tabs) {	 
		$( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
		$( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
		$( "#tabs" ).tabs({ fx: { opacity: 'toggle' } });
	};
/*---------------------------Pretty Photo--------------------------------*/	
	$(function(){
	   $("a[rel^='prettyPhoto']").prettyPhoto({
			animation_speed: 'fast',
			slideshow: 5000,
			autoplay_slideshow: false,
			opacity: 0.50,
			show_title: true,
			allow_resize: true,
			default_width: 500,
			default_height: 344,
			counter_separator_label: '/',
			theme: 'light_square',
			horizontal_padding: 20,
			hideflash: false,
			wmode: 'opaque',
			autoplay: true,
			modal: false,
			deeplinking: false,
			overlay_gallery: true,
			keyboard_shortcuts: true,
			changepicturecallback: function(){},
			callback: function(){},
			ie6_fallback: true
			});
	});	
/*------------------------Sortable Gallery Hover---------------------------*/
     function hover_overlay() {
		
		jQuery('.hover_image img, .hover_link img, .hover_video img, .hover_slideshow img').hover( function() {
            jQuery(this).stop().animate({opacity : 0.2}, 500);
        }, function() {
            jQuery(this).stop().animate({opacity : 1}, 500);
        });
		
    }
    
    hover_overlay();
/*----------------------------Quicksand (Sortable Gallery)-------------------------------*/    
	var $filterType = $('.portfolio-main li.selected-1 a').attr('class');
	var $holder = $('ul.portfolio-content');
   	
	var $data = $holder.clone();
	jQuery('.portfolio-main li a').click(function(e) {
		$('.portfolio-main li').removeClass('selected-1');
		var $filterType = $(this).attr('class');
		$(this).parent().addClass('selected-1');
		
		if ($filterType == 'all') {
			var $filteredData = $data.find('li');
		} 
		else {
			var $filteredData = $data.find('li[data-type=' + $filterType + ']');
		}
		$holder.quicksand($filteredData, 
			{duration: 800,easing: 'easeInOutQuad'},
		 	function() {
				hover_overlay();
				$("a[rel^='prettyPhoto']").prettyPhoto({
					animation_speed: 'fast',
					slideshow: 5000,
					autoplay_slideshow: false,
					opacity: 0.50,
					show_title: true,
					allow_resize: true,
					default_width: 500,
					default_height: 344,
					counter_separator_label: '/',
					theme: 'light_square',
					horizontal_padding: 20,
					hideflash: false,
					wmode: 'opaque',
					autoplay: true,
					modal: false,
					deeplinking: false,
					overlay_gallery: true,
					keyboard_shortcuts: true,
					changepicturecallback: function(){},
					callback: function(){},
					ie6_fallback: true
				});
			}		
		);
		return false;
	});