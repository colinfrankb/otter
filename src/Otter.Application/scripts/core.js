otter.framework.Core = function ($, window, document, Backbone, _, undefined) {
    var name = 'Core';
    var base = window.location.href;
    var self = this;
    var ready = false;
    _.extend(this, Backbone.Events);
    var moduleData = {};
    var configuratorData;
    var proxyData = {};
    var gateway;
    var cache = {};
    return {
        id: function () {
            return name;
        },
        init: function () {
        },
        log: function (data, type) {
            switch (type) {
                case 'void':
                    {
                        break;
                    }
                case 'debug':
                    {
                        window.console && console.debug && console.debug(data);
                        break;
                    }
                case 'error':
                    {
                        window.console && console.error(data);
                        break;
                    }
                case 'warn':
                    {
                        window.console && console.warn(data);
                        break;
                    }
                default:
                    {
                        window.console && console.info(data);
                        break;
                    }
            }
        },
        register: function (moduleId, creator) {
            moduleData[moduleId] = {
                creator: creator,
                instance: null
            };
        },
        registerDefaultModule: function (moduleId, creator) {
            this.register(moduleId, creator);
            moduleData[moduleId].isdefault = true;
        },
        modules: function () {
            return moduleData;
        },
        module: function (moduleId) {
            return moduleData[moduleId];
        },
        start: function (moduleId, sandbox) {
            moduleData[moduleId].instance = moduleData[moduleId].creator(sandbox, this.getProxy("employeeproxy"));
            moduleData[moduleId].instance.preload();
        },
        stop: function (moduleId) {
            var data = moduleData[moduleId];
            if (data.instance) {
                data.instance.destroy();
                data.instance = null;
            }
        },
        startAll: function () {
            var sandbox = new otter.framework.Sandbox(this);
            gateway = new otter.module.gateway(sandbox);
            gateway.beginTimerTick();
            var cData = { next: configuratorData };
            while (cData = cData.next) {
                cData.configurator($, _);
            }
            for (var proxyId in proxyData) {
                if (proxyData.hasOwnProperty(proxyId)) {
                    proxyData[proxyId].instance = new proxyData[proxyId].creator(sandbox, cache);

                }
            }
            for (var moduleId in moduleData) {
                if (moduleData.hasOwnProperty(moduleId)) {
                    this.start(moduleId, sandbox);
                }
            }
        },
        stopAll: function () {
            for (var moduleId in moduleData) {
                if (moduleData.hasOwnProperty(moduleId)) {
                    this.stop(moduleId);
                }
            }
        },
        loadDefaultModule: function () {
            for (var moduleId in moduleData) {
                if (moduleData.hasOwnProperty(moduleId)) {
                    moduleData[moduleId].isdefault && moduleData[moduleId].instance.load();
                }
            }
        },
        notify: function (cmd, src) {
            this.log('fire event ' + cmd.type + ' from ' + src, 'void');
            self.trigger(cmd.type, cmd);
        },
        markReady: function () {
            ready = true;
        },
        listen: function (et, c, t, src) {
            _.each(et, function (e, i, list) {
                this.log('listen for event ' + e + ' from ' + src, 'void');
                self.bind(e, c, t);
            }, this);
        },
        unbind: function (eventname, callback) {
            if (callback != undefined)
                self.unbind(eventname, callback);
            else
                self.unbind(eventname);
        },
        registerTemplate: function (template) {
            try {
                $.get(base + template, function (templates) {
                    $('head').append(templates);
                });
            }
            catch (e) {
                console.warn('exception in register template in core');
            }
        },
        registerConfigurator: function (configurator) {
            var next = configuratorData;
            configuratorData = { configurator: configurator, next: next };
        },
        registerProxy: function (proxyId, proxy) {
            proxyData[proxyId] = {
                proxyId: proxyId,
                creator: proxy
            };
        },
        getProxy: function (proxyId) {
            var proxy, proxyInstance;
            if (proxyInstance = ((proxy = proxyData[proxyId]) && proxy.instance))
                return proxyInstance;
        }
    };
};
