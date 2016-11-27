angular.module('rangeFilter', []).filter('rangeFilter', function() {
    return function( items, minValue, maxValue, field ) {
        var filtered = [];
        var min = parseInt(minValue);
        var max = parseInt(maxValue);
        // If [field] is with the range
        angular.forEach(items, function(item) {
            if( item[field] >= min && item[field] <= max ) {
                filtered.push(item);
            }
        });
        return filtered;
    };
});

