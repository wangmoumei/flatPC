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
}).filter('sliceMonth',function(){
    return function (term) {
        var groups = [],
        startY = new Date(term.startTime).getFullYear() || 2016,
        endY = new Date(term.endTime).getFullYear() || 2016,
        startM = new Date(term.startTime).getMonth()+1 || 1,
        endM = new Date(term.endTime).getMonth()+1 || 1;
        //console.log(startY + "-" + startM + '||' +endY + "-" + endM  )
        for(;;startM++){
            
            if(startY > endY || (startY==endY && startM>endM)){
                break;
            }else{
                if(startM>12){
                    startM = 0;
                    startY++;
                    continue;
                }
            }
            
            groups.push({
                month:startM,
                year:startY
            });
            
        }
        if(groups.length>0){
            
            return [groups.slice(0,groups.length/2|0),groups.splice(groups.length/2|0)];
        }
        return [[],[]];
    };
}).filter('sliceDay',function(){
    return function (item) {
        var groups = [],days = new Date(2016,item.month,0).getDate();
        for(var i=1;i <= days;i++){
            groups.push({
                day:i,
                month:item.month,
                year:item.year
            });
        }
        console.log(groups);
        return [groups.slice(0,groups.length/2|0),groups.splice(groups.length/2|0)];
    };
});