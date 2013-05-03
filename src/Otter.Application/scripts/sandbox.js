otter.framework.Sandbox = (function (core) {
    var name = 'Sandbox';
    var host = core;
    return {
        id: function () {
            return name;
        },
        log: function (data, type) {
            host.log(data, type);
        },
        notify: function (cmd, src) {
            host.notify(cmd, src);
        },
        listen: function (e, c, t, src) {
            host.listen(e, c, t, src);
        },
        unbind: function (eventname, callback) {
            host.unbind(eventname, callback);
        }
    };
});