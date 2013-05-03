otter.proxy.employee = function (sandbox, cache) {
    var cachekey = "employees";
    var sb = sandbox;
    sb.notify({
        type: 'gateway-start-poll',
        data: {
            object: {},
            runonce: false,
            offlinePoll: false,
            timout: 5000,
            frequency: 10000,
            alwaysUpdate: false,
            command: function (item) {
                this.getLastUpdated({
                    success: function (data) {
                        item.processing = false;
                        sb.notify({ type: "employees-lastupdated", data: data });
                    }
                });
            },
            context: this
        }
    });
    this.getEmployees = function (options, context) {
        if (cache[cachekey]) {
            options.success.call(context, cache[cachekey]);
            return;
        }
        $.ajax({
            type: "GET",
            url: stringFormat("{0}employee/getemployees", otter.api),
            dataType: "json",
            success: function (data) {
                cache[cachekey] = data;
                options.success.call(this, cache[cachekey]);
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-HTTP-Method-Override', "GET");
            },
            context: context || this
        });
    };
    this.getLastUpdated = function (options, context) {
        $.ajax({
            type: "GET",
            url: stringFormat("{0}employee/getlastupdated?lastupdated={1}", otter.api, cache[cachekey].LastUpdated),
            dataType: "json",
            success: function (data) {
                cache[cachekey].LastUpdated = data.LastUpdated;
                data.Items.forEach(function (employee) {
                    cache[cachekey].Items.forEach(function (existing) {
                        if (existing.Id == employee.Id) {
                            $.extend(existing, employee);
                        }
                    });
                });
                if (context)
                    options.success.call(context, data);
                else
                    options.success(data);
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-HTTP-Method-Override', "GET");
            },
            context: context || this
        });
    };
}