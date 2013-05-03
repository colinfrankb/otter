otter.configuration.JqueryConfigurator = function ($) {
    $.ajaxSetup({
        statusCode: {
            401: function () {
                $.ajaxSetup({
                    beforeSend: function (xhr, settings) {
                    },
                    timeout: window.gTimeout
                });
                //sb.notify({ type: "session-invalid" });
            }
        },
        beforeSend: function (xhr, settings) {
            if (settings.type != 'OPTIONS') {
//                    var user = thisView.model.get('User');
//                    settings.url = appendQueryToUrl(settings.url, 'uid', user.get('Id'));
//                    settings.url = appendQueryToUrl(settings.url, 'sid', user.get('Sid'));
            }
        },
        timeout: window.gTimeout
    });
    
}