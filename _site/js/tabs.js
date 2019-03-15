/***************************/
//@Author: Adrian "yEnS" Mato Gondelle & Ivan Guardado Castro
//@website: www.yensdesign.com
//@email: yensamg@gmail.com
//@license: Feel free to use it, but keep this credits please!					
/***************************/

$(document).ready(function(){
	$(".menu > li").click(function(e){
		switch(e.target.id){
			case "one":
				//change status & style menu
				$("#one").addClass("active");
				$("#two").removeClass("active");
				$("#three").removeClass("active");
				$("#four").removeClass("active");
				//display selected division, hide others
				$("div.one").fadeIn();
				$("div.two").css("display", "none");
				$("div.three").css("display", "none");
				$("div.four").css("display", "none");
			break;
			case "two":
				//change status & style menu
				$("#one").removeClass("active");
				$("#two").addClass("active");
				$("#three").removeClass("active");
				$("#four").removeClass("active");
				//display selected division, hide others
				$("div.two").fadeIn();
				$("div.one").css("display", "none");
				$("div.three").css("display", "none");
				$("div.four").css("display", "none");
			break;
			case "three":
				//change status & style menu
				$("#one").removeClass("active");
				$("#two").removeClass("active");
				$("#three").addClass("active");
				$("#four").removeClass("active");
				//display selected division, hide others
				$("div.three").fadeIn();
				$("div.one").css("display", "none");
				$("div.two").css("display", "none");
				$("div.four").css("display", "none");
			break;
			case "four":
				//change status & style menu
				$("#one").removeClass("active");
				$("#two").removeClass("active");
				$("#three").removeClass("active");
				$("#four").addClass("active");
				//display selected division, hide others
				$("div.four").fadeIn();
				$("div.one").css("display", "none");
				$("div.two").css("display", "none");
				$("div.three").css("display", "none");
			break;
		}
		//alert(e.target.id);
		return false;
	});
});