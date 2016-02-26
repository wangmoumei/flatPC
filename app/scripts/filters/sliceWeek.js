angular.module('flatpcApp')
.filter('sliceWeek',function(){
    return function (term) {
        var groups = [] , weeks = [],n = Math.ceil(term.countweek / 2);
        groups.push(weeks);
        for(var i = 1 ; i <= term.countweek || 0 ; i++){
            weeks.push(i);
            if(i == n){
                weeks = [];
                groups.push(weeks);
            }
            
        }
        return groups;
    };
});