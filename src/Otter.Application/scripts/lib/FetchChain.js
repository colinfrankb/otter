var FetchChain = function (options) {
    this.delegatingHandler = new DelegatingHandler();
    var count = 0, instancesCompleted = 0, currentProgress = 0, progressIncrement = 0, remainder = 0, errorCount = 0;
    this.add = function (model, actionUrl) {
        count++;
        var dHandler = this.delegatingHandler;
        this.delegatingHandler = new DelegatingHandler(dHandler);
        this.delegatingHandler.sendAsync = function () {
            var executeFetch = function (model, offset) {
                model.fetchByUrlWrapped({
                    actionUrl: stringFormat("{0}?offset={1}", actionUrl, offset),
                    onSuccess: function (m) {
                        if ((m.get && m.get("HasMore")) || m.HasMore) {
                            window.setTimeout(function () {
                                console.debug(count, stringFormat("calling recursive {0}", m.get("NextOffset")));
                                executeFetch(m, m.get("NextOffset"));
                            }, 1000);
                        }
                        else {
                            instancesCompleted++;
                            currentProgress = currentProgress + progressIncrement;
                            $(".bar").css("width", stringFormat("{0}%", currentProgress));
                            if (instancesCompleted == count) {
                                if (errorCount > 0) {
                                    options.onError();
                                }
                                else {
                                    $(".bar").css("width", stringFormat("{0}%", currentProgress + remainder));
                                    window.setTimeout(options.onFinish, 1000);
                                }
                            }
                        }
                    },
                    onError: function fetchChainError() {
                        errorCount++;
                        instancesCompleted++;
                        if (instancesCompleted == count) {
                            options.onError();
                        }
                    },
                    onFailureMessage: 'An exception occurred loading the user. Click ok to retry.',
                    timeout: window.gTimeout
                }, this);
            };
            executeFetch(model, 0);
            if (this.innerDelegate)
                this.innerDelegate.sendAsync();
        };
    };
    this.execute = function () {
        remainder = 100 % count;
        progressIncrement = (100 - remainder) / count;
        this.delegatingHandler.sendAsync();
    };
};

var DelegatingHandler = function (innerDelegate) {
    this.innerDelegate = innerDelegate;
    this.sendAsync = function() {
        if (this.innerDelegate)
            this.innerDelegate.sendAsync();
    };
};