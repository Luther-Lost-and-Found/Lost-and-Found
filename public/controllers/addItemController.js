var app = angular.module('addItemApp', ['ngFileUpload']);

app.controller('addItemCtrl', ['$timeout', '$scope', '$http', '$window',
	'$animate','$uibModal','$rootScope','sharedServiceUploadModal',
	function($timeout, $scope, $http, $window, $animate, $uibModal,$rootScope, sharedServiceUploadModal) {

	$scope.addItem = function () {

		sharedServiceUploadModal.setProperty($scope.item);

	    var modalInstance = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'partials/addItem/upload.html',
	      controller: 'uploadController',
	      size: 'lg',
	      resolve: {
	        items: function () {
	          	return $scope.item;
	        }
	      }
	    });

	    modalInstance.result.then(function ($rootScope) {
	      $rootScope.selected = selectedItem;
	    });

	    $scope.$on('handleBroadcast', function() {
        	refresh();
    	});
	};
}]).$inject = ['$scope', 'sharedServiceUploadModal'];

app.controller('uploadController',
	function ($http,$rootScope,$scope, $uibModalInstance, items, Upload,sharedServiceUploadModal) {
 	$scope.uploadImage = function (file) {
 		if (file != null) {
	    	$scope.upload(file)
	    }
    	$uibModalInstance.dismiss('cancel');
  	};

  	$scope.upload = function(image) {
	    $scope.errorMsg = null;
	    var transferredItem = sharedServiceUploadModal.getProperty();

	    $http.post("/additem",transferredItem).success(function(response){

			var fileExtension = '.' + image.name.split('.').pop();

		    Upload.rename(image, response.toString()+fileExtension);

		    image.upload = Upload.upload({
		      	url: 'additem/uploadImage',
		      	method: 'POST',
		      	data: {
			    	type: 'profile'
			    },
			    file: image
		    });
		});
	};

	$scope.getReqParams = function () {
	    return $scope.generateErrorOnServer ? '?errorCode=' + $scope.serverErrorCode +
	    '&errorMessage=' + $scope.serverErrorMsg : '';
	};

  	$scope.cancel = function () {
    	$uibModalInstance.dismiss('cancel');
  	};
  	
}).$inject = ['$scope', 'sharedServiceUploadModal'];