otter.module.home = (function Home(sandbox) {
    var name = "Home";
    var sb = sandbox;

    otter.view.HomeView = Backbone.View.extend({
        tagName: "div",
        className: "home",
        template: '#homeTemplate',
        events: {},
        initialize: function () {

        },
        render: function () {
            this.$el.empty().append($(this.template).tmpl());
        },
        show: function () {
            this.render();
            return this;
        },
        onClose: function () {

        }
    });

    return {
        id: function () {
            return name;
        },
        preload: function () {
            sb.listen([], this.notify, this, name);
        },
        load: function () {
            var homeView = new otter.view.HomeView();
            sb.notify({ type: "set-content", data: homeView });
        },
        destroy: function () {
        },
        notify: function (cmd) {
            try {
                switch (cmd.type) {
                    default:
                        return;
                }
            }
            catch (e) {
                console.warn('exception in stage notify');
                console.warn(e);
            }
        }
    };
});
