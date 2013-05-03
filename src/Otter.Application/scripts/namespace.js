// written by andrew dupont, optimized by addy osmani
function extend(destination, source) {
    var toString = Object.prototype.toString, objTest = toString.call({});
    for (var property in source) {
        if (source[property] && objTest == toString.call(source[property])) {
            destination[property] = destination[property] || {};
            extend(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
    return destination;
};

var otter = (otter || {});
extend(otter, { runtime: {} });
extend(otter, { router: {} });
extend(otter, { model: {} });
extend(otter, { view: {} });
extend(otter, { collection: {} });
extend(otter, { framework: {} });
extend(otter, { module: {} });
extend(otter, { configuration: {} });
extend(otter, { proxy: {} });

otter.online = true;
otter.dev = true;
otter.mapi = '';
otter.msapi = '';
otter.offlineEnabled = true;
otter.api = 'http://api.otter.com:52368/api/';
otter.gError = 0;
otter.tError = 0;

otter.logRequestError = function (options, e) {
    console.warn('An exception occurred processing request to server with url - ' + options.url);
    console.warn(options);
    console.warn(e);
    otter.gError++;
    otter.tError++;
    console.warn('otter.gError - ' + otter.gError);
    console.warn('otter.tError - ' + otter.tError);
};

otter.clearRequestErrors = function () {
	otter.gError = 0;
	otter.tError = 0;
};

otter.clearTrackingRequestErrors = function () {
	otter.tError = 0;
};

otter.wrapError = function (options, context) {
    if (options.error) {
        var oError = options.error;
        if (context) {
            return function () {
                otter.logRequestError(options);
                oError.call(context);
            };
        }
        else {
            return function () {
                otter.logRequestError(options);
                oError();
            };
        }
    }
    else {
        return function () {
            otter.logRequestError(options);
        };
    };
}

otter.dateFormat = "dd/mm/yy";