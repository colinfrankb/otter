function reload() {
    window.location.href = window.location.href.replace(/#.*/, "");
};

var screenResolutionInRange = function (tv) {
    var wi = window.innerWidth;
    var hi = window.innerHeight;
    return wi <= tv;
};

var doDetect = function () {
    var minimumSupportedResolution = 239;
    var defaultUrl = 'http://www.moonbase.mobi';
    var ua = navigator.userAgent.toLowerCase();
    var isiPhone = ua.indexOf("iphone") != -1;
    var isiPod = ua.indexOf("ipod") != -1;
    var isiPad = ua.indexOf("ipad") != -1;
    var isIos = isiPhone || isiPad || isiPod;
    var isAndroid = ua.indexOf("android") != -1;
    var isAndroidTablet = isAndroid && (ua.indexOf("mobile") == -1);
    var isAndroidMobile = isAndroid && !isAndroidTablet;
    return {
        isiPhone: isiPhone,
        isiPod: isiPod,
        isiPad: isiPad,
        isIos: isIos,
        isAndroid: isAndroid,
        isAndroidTablet: isAndroidTablet,
        isAndroidMobile: isAndroidMobile,
        isUnsupported: screenResolutionInRange(minimumSupportedResolution),
        hasToolbar: isAndroid || isIos,
        noSupportUrl: defaultUrl
    };
};

$.urlParam = function (name) {
    var results = new RegExp('[\\?&#]' + name + '=([^&#]*)').exec(window.location.href);
    if (!results) { return 0; }
    return decodeURIComponent(results[1].replace(/\+/g, " ")) || 0;
};

function stringFormat() {
    var definedArguments = [];
    for (var i = 0, n = arguments.length; i < n; i++) {
        if (arguments[i] == undefined)
            definedArguments.push("");
        else
            definedArguments.push(arguments[i]);
    }
    return $.validator.format.apply({}, definedArguments);
}

function postClick() {
    $("body").removeClass("bodywaiting");
}
