otter.configuration.UnderscoreConfigurator = function () {
    _.mixin({
        sum: function (source, predicate, context) {
            var result = 0;
            for (i = 0, n = source.length; i < n; i++) {
                if (context)
                    predicate.call(context, source[i]) && result++;
                else
                    predicate(source[i]) && result++;
            }
            return result;
        },
        cross: function (sourceA, sourceB, action, context) {
            for (var i = 0, n = sourceA.length; i < n; i++) {
                for (var j = 0, k = sourceB.length; j < k; j++) {
                    action.call(context, sourceA[i], sourceB[j]);
                }
            }
        },
        filterJSON: function (source, predicate, context) {
            var result = [];
            for (i = 0, n = source.length; i < n; i++) {
                if (context)
                    predicate.call(context, source.at(i)) && result.push(source.at(i).toJSON());
                else
                    predicate(source.at(i)) && result.push(source.at(i).toJSON());
            }
            return result;
        }
    });
}
