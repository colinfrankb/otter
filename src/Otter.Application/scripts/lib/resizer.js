jQuery(document).ready(function($) {
	if($('.header') && $('#header-shadow') && $('.main_container') && $('#footer')) {
		if(
			(
				$('.header').height() + 
				$('#header-shadow').height() + 
				$('.main_container').height() + 
				$('#footer').height()
			) < 
				$(window).height()
		)
		{
			$('.main_container').css('padding-bottom', $(window).height()-$('.main_container').height()-445);
			//console.warn('Set Height');
		} else {
			//console.warn('Set Nothing - Height');
		}
		
		$(window).resize(function() {
			$('.main_container').css('padding-bottom', $(window).height()-$('.main_container').height()-445);
			//console.warn('Resizing...');
		});
	}
});
