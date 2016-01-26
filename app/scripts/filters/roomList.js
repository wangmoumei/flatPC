angular.module('flatpcApp')
.filter('sliceArray',function(){
    return function (items, groupSize) {
        var groups = [],
           inner;
           groupSize = groupSize || 10;
        for (var i = 0; i < items.length; i++) {
            if (i % groupSize === 0) {
                inner = [];
                groups.push(inner);
            }
            inner.push(items[i]);
        }
        return groups;
    };
});