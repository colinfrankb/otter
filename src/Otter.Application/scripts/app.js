var app = (function ($, window, document, Backbone, _, undefined) {
    var fw = otter.framework;
    var md = otter.module;
    var py = otter.proxy;
    var config = otter.configuration;
    var appCore = new fw.Core($, window, document, Backbone, _, undefined);
    appCore.init();
    return {
        start: function () {
            appCore.register("module_stage", md.stage);
            appCore.registerDefaultModule("module_employee", md.employee);
            appCore.registerConfigurator(config.JqueryConfigurator);
            appCore.registerConfigurator(config.UnderscoreConfigurator);
            appCore.registerProxy("employeeproxy", py.employee);
            appCore.startAll();
            appCore.markReady();
            appCore.loadDefaultModule();
        },
        trigger: function (cmd) {
            appCore.notify(cmd, 'window');
        },
        inside: function () {
            return appCore;
        },
        getVersion: function () {
            return window.appVersionNo;
        }
    };
})(jQuery, this, this.document, Backbone, _);