angular.module('flatpcApp')
.filter('ObjToArray',function(){
    return function (items, name) {
        var groups = [];
        for (var i = 0; i < items.length; i++) {
           groups.push(items[i][name]);
        }
        return groups;
    };
});