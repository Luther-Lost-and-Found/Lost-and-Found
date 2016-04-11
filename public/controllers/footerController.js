angular.module('footerApp',['ui.bootstrap','ngMaterial']).controller('footerController',
  ['$timeout', '$scope', '$http', '$animate', '$mdBottomSheet', '$mdToast',
    function($timeout, $scope, $http, $animate, $mdBottomSheet, $mdToast) {

        $scope.showAbout = function($event) {
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: '/partials/general/about.html',
                targetEvent: $event
            }).then(function(clickedItem) {
                $scope.alert = clickedItem['name'] + ' clicked!';
            });
        };

        $scope.showHelp = function($event) {
            $scope.alert = '';
            $mdBottomSheet.show({
              templateUrl: '/partials/general/help.html',
              clickOutsideToClose: false,
              targetEvent: $event
            }).then(function(clickedItem) {
              $mdToast.show(
                    $mdToast.simple()
                      .textContent(clickedItem['name'] + ' clicked!')
                      .position('top right')
                      .hideDelay(1500)
                  );
            });
        };
}]);