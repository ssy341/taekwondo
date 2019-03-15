jQuery.noConflict();

jQuery(document).ready(function() {
	jQuery("#menu").ignite_menu();
});

(function($) {
	$.fn.ignite_menu = function(options) {
		var defaults = {
			autoPosition: false,
			limitValue: "wrapper",
			easing: "easeOutQuint",
			speedIn: 500,
			speedOut: 200
		};
		
		var settings = $.extend({}, defaults, options);
		
		/**/
		
		return this.each(function () {
			var $root = $(this);
			var $mainmenu = $(">ul", this);
			var $headers = $mainmenu.find("ul").parent();
			var $limitValue = (settings.limitValue == "document") ? $(window).width() : 960;
            
			/**/
		
			$headers.each(function () {
				var $curobj = $(this);
				var $subul = $(this).find('ul:first');
				var $ul = $("ul", $curobj);
				var $rounded = $(".last", $root).length;
			
				$("ul ul", $root).css({"display": "none"});
				$("ul li ul a", $root).css({"text-align": "center"});
			
				/**/
			
				function getProperty($li, $ul) {
					$li.dimensions = {
						w: $li.offsetWidth, 
						h: $li.offsetHeight, 
						subulw: $ul.outerWidth(), 
						subulh: $ul.outerHeight()
					}
					return $li.dimensions;
				}
			
				function showMenu ($element, $e) {
					$element.css({visibility:'visible'});
					$element.hoverFlow($e.type, {
      					'height': 'show'
    				}, settings.speedIn, settings.easing);
				}
 
    			function hideMenu ($element, $e) {
    				$element.hoverFlow($e.type, {
      					'height': 'hide'
    				}, settings.speedOut, settings.easing, function() {
    					$element.hide();
    				});
    			}
			
				/**/
			
				$curobj.hover(function(e) {
					getProperty(this, $subul);
					var $targetul = $(this).find("ul:first");
					var $offset = $(this).offset();
				
					if($curobj.parents("ul").length == 1) {
						$ul.css({visibility:'hidden'});
						this.firstLevel = true;
						$subul.css({top: 40 + "px", left: -((this.dimensions.subulw - this.dimensions.w) / 2) + "px"});
					} else {
						this.firstLevel = false;
						$subul.css({top: 0});
					}
					
					if(this.firstLevel) {
						var menuleft = 0;
					} else {
						var menuleft = this.dimensions.w;
					}
					
					if($offset.left + menuleft + this.dimensions.subulw > $limitValue) {
						if(this.firstLevel) {
							menuleft = -(this.dimensions.subulw + this.dimensions.w);
						} else {
							if($rounded > 0) {
								menuleft = -(this.dimensions.w);
							} else {
								menuleft = -(this.dimensions.w + 2);
							}
						}
					}
				
					if(settings.autoPosition == true) {
						$targetul.css({left:menuleft + "px"});
					}
					showMenu($targetul, e);
				}, function(e) {
					var $targetul = $(this).find("ul:first");
					hideMenu($targetul, e);
				});
			});
		});
	};
})(jQuery);

/*
  * hoverFlow - A Solution to Animation Queue Buildup in jQuery
  * Version 1.00

  * Copyright (c) 2009 Ralf Stoltze, http://www.2meter3.de/code/hoverFlow/
  * Dual-licensed under the MIT and GPL licenses.
  * http://www.opensource.org/licenses/mit-license.php
  * http://www.gnu.org/licenses/gpl.html
*/


(function($) {
	$.fn.hoverFlow = function(type, prop, speed, easing, callback) {
		/*
		  * only allow hover events
		*/ 
		
		if ($.inArray(type, ['mouseover', 'mouseenter', 'mouseout', 'mouseleave']) == -1) {
			return this;
		}
	
		/*
		  * build animation options object from arguments
		  * based on internal speed function from jQuery core
		*/
		
		var opt = typeof speed === 'object' ? speed : {
			complete: callback || !callback && easing || $.isFunction(speed) && speed,
			duration: speed,
			easing: callback && easing || easing && !$.isFunction(easing) && easing
		};
		
		/*
		  * run immediately
		*/
		
		opt.queue = false;
			
		/*
		  * wrap original callback and add dequeue
		*/ 
		
		var origCallback = opt.complete;
		opt.complete = function() {
		
			/* execute next function in queue */
			$(this).dequeue();
			
			/* execute original callback */
			if ($.isFunction(origCallback)) {
				origCallback.call(this);
			}
		};
		
		/*
		  * keep the chain intact
		*/
		
		return this.each(function() {
			var $this = $(this);
		
			/* set flag when mouse is over element */
			if (type == 'mouseover' || type == 'mouseenter') {
				$this.data('jQuery.hoverFlow', true);
			} else {
				$this.removeData('jQuery.hoverFlow');
			}
			
			/* enqueue function */
			
			$this.queue(function() {				
				/* check mouse position at runtime */
				var condition = (type == 'mouseover' || type == 'mouseenter') ?
				
				/* read: true if mouse is over element */
				$this.data('jQuery.hoverFlow') !== undefined :
					
				/* read: true if mouse is _not_ over element */
				$this.data('jQuery.hoverFlow') === undefined;
					
				/* 
				  * only execute animation if condition is met, which is:
				  * - only run mouseover animation if mouse _is_ currently over the element
				  * - only run mouseout animation if the mouse is currently _not_ over the element
				*/
				
				if(condition) {
					$this.animate(prop, opt);
				/* else, clear queue, since there's nothing more to do */
				} else {
					$this.queue([]);
				}
			});

		});
	};
})(jQuery);