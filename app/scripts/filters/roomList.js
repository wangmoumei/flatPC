angular.module('flatpcApp')
.filter('sliceArray',function(){
    return function (items, groupSize,parent) {
        var groups = [],
           inner;
           groupSize = groupSize || 10;
        for (var i = 0; i < items.length; i++) {
            if (i % groupSize === 0) {
                inner = [];
                groups.push(inner);
            }
            items[i].index = i % groupSize;
            items[i].indexParent = parseInt(i / groupSize);
            items[i].parent = parent || 0;
            inner.push(items[i]);
        }
        return groups;
    };
});