(function ($) {
    $.event.special.clickonce = {
        add: function (event_) {
            $(this).delegate(event_.selector, "click", function (e) {
                var $this = $(this);
                if (!$("body").hasClass("bodywaiting")) {
                    $("body").addClass("bodywaiting");
                    event_.handler(e);
                }
            });
        }
    };
})(jQuery);