angular.module('flatpcApp')
.filter('stringLength',function(){
    return function (str, l) {
        l = l || 10;
        if(l>str.length)l = str.length;
        
        return str.substr(0,l) + (l < str.length?"...":"");
    };
});