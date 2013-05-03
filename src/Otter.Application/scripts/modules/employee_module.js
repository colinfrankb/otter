otter.module.employee = (function Employee(sandbox, employeeproxy) {
    var name = "Employee";
    var sb = sandbox;

    otter.view.EmployeesView = Backbone.View.extend({
        tagName: "div",
        className: "employees",
        template: '#employeesTemplate',
        events: {},
        initialize: function () {
            sb.listen(["employees-lastupdated"], this.render, this);
        },
        updateView: function (cmd) {
            //update only the employees that changed
        },
        renderComplete: function () {
            throw "not implemented";
        },
        render: function () {
            employeeproxy.getEmployees({
                success: function (data) {
                    this.employees = data;
                    this.$el.empty().append($(this.template).tmpl(this.employees, {
                        getStartDate: function (employee) {
                            if (employee.StartDate)
                                return stringFormat("{0} to", employee.StartDate);
                            return "";
                        }
                    }));
                    this.renderComplete(this.el);
                }
            }, this);
        },
        onClose: function () {
            this.employees = undefined;
            sb.unbind("employees-lastupdated");
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
            var employeesView = new otter.view.EmployeesView();
            sb.notify({ type: "set-content", data: employeesView });
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
                console.warn('exception in employee notify');
                console.warn(e);
            }
        }
    };
});
