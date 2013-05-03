var personsClass= undefined;

$(document).ready(function(){
	//to show related employees on side menu hover
	$('div.team_menu ul li').hover(
		function () {
			console.warn($(this).attr("class"));
			personsClass = $(this).attr("class");
			$('img.'+personsClass).removeClass("black_white");
			$('img.'+personsClass).addClass("colorize");
			$('.show_'+personsClass).show();
		}, 
		function () {
			console.warn($(this).attr("class"));
			personsClass = $(this).attr("class");
			$('img.'+personsClass).removeClass("colorize");
			$('img.'+personsClass).addClass("black_white");
			$('.show_'+personsClass).hide();
		}
	);

	//to show related employee on side menu hover
  	$('div.team_landing_container div.team_images div.person_image').hover(
		function () {
			console.warn($(this).attr("id"));
			personsClass = $(this).attr("id");
			$('#'+personsClass+'_grey').removeClass("black_white");
			$('#'+personsClass+'_grey').addClass("colorize");
			$('#'+personsClass+'_title').fadeIn();
		}, 
		function () {
			console.warn($(this).attr("id"));
			personsClass = $(this).attr("id");
			$('#'+personsClass+'_grey').removeClass("colorize");
			$('#'+personsClass+'_grey').addClass("black_white");
			$('#'+personsClass+'_title').fadeOut();
		}
	);
});