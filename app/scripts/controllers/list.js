angular.module('flatpcApp')
.controller('ListCtrl', function($scope, $state,AppConfig) {
    $scope.name = $state.current.name;
    console.log($scope.name);
//    $scope.items = ['item1', 'item2', 'item3']; 
//    $scope.open = function () {  
//        var modalInstance = $modal.open({  
//            templateUrl: 'myModalContent.html',  
//            controller: ModalInstanceCtrl, 
//            resolve: {  
//                items: function () {  
//                    return $scope.items; 
//                }
//            }
//        });
//        modalInstance.opened.then(function(){
//            console.log('modal is opened');  
//        });
//        modalInstance.result.then(function (result) {
//            console.log(result);  
//        },function(reason){
//            console.log(reason);
//            $log.info('Modal dismissed at: ' + new Date()); 
//        });
//    };
});
//.controller('ModalInstanceCtrl', function($scope, $modalInstance, items) {
//    $scope.items = items;  
//    $scope.selected = {  
//        item: $scope.items[0]  
//    };
//    $scope.ok = function () { 
//        $modalInstance.close($scope.selected);  
//    };
//    $scope.cancel = function () {  
//        $modalInstance.dismiss('cancel');  
//    }
//});