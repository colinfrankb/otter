otter.module.gateway = function Gateway(sandbox) {
    var name = "Gateway";
    var self = this;
    var sb = sandbox;
    var lastTick = 0;
    this.gameTimer;
    var timerInterval = 500;
    this.requests = [];
    this.processing = false;
    this.requestDelay = 2500;
    this.passedBy = 0;
    var timerTick = function () {
        var current = new Date().getTime();
        var timeDelta = current - lastTick;
        lastTick = current;
        sb.notify({ type: 'apptimer-tick', data: timeDelta });
        var call = timerTick;
        gameTimer = window.setTimeout(call, timerInterval);
    };

    this.beginTimerTick = function () {
        timerTick();
    };

    var reachedScheduledFrequency = function (item, currentTime) {
        return (currentTime - item.start) >= item.frequency;
    };

    var notify = function (cmd) {
        switch (cmd.type) {
            case "gateway-start-poll":
                cmd.data.start = new Date().getTime();
                _.extend({ runCount: 0 }, cmd.data);
                if (cmd.data.runonce) {
                    cmd.data.runCount++;
                    $.ajax({
                        type: "GET",
                        url: stringFormat("{0}{1}", otter.api, item.url),
                        dataType: "json",
                        success: function (data) {
                            cmd.data.command(data, cmd.data.object, cmd.data.runCount);
                            if (cmd.data.onRunOnce)
                                cmd.data.onRunOnce();
                        },
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('X-HTTP-Method-Override', "GET");
                        },
                        context: context || this
                    });
                }
                if (cmd.data.frequency > 0) {
                    cmd.data.lastUpdated = new Date().getTime();
                    this.requests.push(cmd.data);
                }
                return;
            case "gateway-stop-poll":
                this.requests = _.filter(this.push, function (d) { return d.path != cmd.data.path; });
                return;
            case "apptimer-tick":
                if (!this.processing) {
                    var current = new Date().getTime();
                    this.processing = true;
                    _.forEach(this.requests, function (item) {
                        if (!reachedScheduledFrequency(item, current))
                            return;
                        if (item.processing)
                            return;
                        item.start = current;
                        item.processing = true;
                        item.runCount++;
                        item.command.call(item.context || {}, item);
                    });
                    this.processing = false;
                }
                return;
            default:
                return;
        }
    }
    sb.listen(["gateway-start-poll", "apptimer-tick", "gateway-stop-poll"], notify, this, name);
};