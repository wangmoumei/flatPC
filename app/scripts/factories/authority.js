angular.module('flatpcApp')
.factory('authority', ['AppConfig',function (AppConfig) {
    console.log('authority');
    var check = function(name){
        name = name || "";
        switch(name){
            case "index":
                return ['flat','flat',''];
                break;
            case 'flat':
                return ['flat','flat','flat'];
                break;
            case 'college':
                return ['flat','flat','college'];
                break;
            case 'live':
                return ['flat','flat','live'];
                break;
            case 'change':
                return ['flat','flat','change'];
                break;
            case 'quit':
                return ['flat','flat','quit'];
                break;
            case 'check':
                return ['flat','flat','check'];
                break;
            case 'grade':
                return ['flat','grade','grade'];
                break;
            case 'visit':
                return ['flat','check','visit'];
                break;
            case 'key':
                return ['flat','check','key'];
                break;
            case 'late':
                return ['flat','check','late'];
                break;
        }
    };
    var transform = function(){
        console.log('transform');
    };
    return {
        check:check,
        transform:transform
    }
}]);
