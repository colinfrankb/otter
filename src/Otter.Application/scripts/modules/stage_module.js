otter.module.stage = (function Stage(sandbox) {
    var name = "Stage";
    var sb = sandbox;
    var contentView;
    
    var setContent = function (setView) {
        if (contentView) {
            contentView.close();
            contentView = undefined;
        }
        if (setView) {
            contentView = setView;
            contentView.renderComplete = function (el) {
                $("body").empty().append(el);
            };
            contentView.render();
            //this.contentView.activate && this.contentView.activate();
        } else {
            $("body").empty();
        }
    }
    
    return {
        id: function () {
            return name;
        },
        preload: function () {
            sb.listen(["set-stage", "app-load", "set-pre-content", "set-content"], this.notify, this, name);
        },
        destroy: function () {
        },
        notify: function (cmd) {
            try {
                switch (cmd.type) {
                    case "set-stage":
                        sb.notify({ type: "app-load" });
                        return;
                    case "app-load":
                        var fetchChain = new FetchChain({
                            onFinish: function () {
                                sb.notify({ type: "app-start" });
                                postClick();
                            },
                            onError: function () {
                                postClick();
                            }
                        });
                        //fetchChain.execute();
                        sb.notify({ type: "app-start" });
                        return;
                    case "set-content":
                        setContent(cmd.data);
                        return;
                    case "set-pre-content":
                        return;
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
