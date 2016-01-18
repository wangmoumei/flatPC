angular.module('flatpcApp')
.factory('authority', ['$rootScope',function ($rootScope) {
    console.log('authority');
    var check = function(name){
        name = name || "";
        switch(name){
            case "index":
                return $rootScope.sysMenu;
                break;
            case 'list':
                return $rootScope.sysMenu;
                break;
            case 'list1':
                return $rootScope.sysMenu;
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
            case 'scoreStatistics':
                return ['flat','grade','scoreStatistics'];
                break;
            case 'gradeSetting':
                return ['flat','grade','gradeSetting'];
                break;
            case 'floor':
                return ['data','floor','floor'];
                break;
            case 'room':
                return ['data','floor','room'];
                break;
            case 'type':
                return ['data','floor','type'];
                break;
            case 'student':
                return ['data','collect','student'];
                break;
            case 'stay':
                return ['data','collect','stay'];
                break;
            case 'class':
                return ['data','collect','class'];
                break;
            case 'term':
                return ['data','data','term'];
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
