var app = angular.module('SideNavApp',['ngMaterial']);

app.controller('SideNavCtrl', function ($http,$scope, $rootScope, $timeout, $mdSidenav, $log) {
  $scope.close = function () {
    $mdSidenav('right').close()
      .then(function () {
        $http.get("/loggedin").success(function(response){
          $scope.$applyAsync(function(){
            $scope.username = response.norsekeyID;
          });
        });
      });
  };

  $scope.logout = function(){
    $http.get("/signout").success(function(req,res){
      $location.url("/");
    });
  }

    $scope.goToAppSettings = function(){
    console.log("USER PRIV:::",$rootScope.userSettings.superPrivilege);
    if ($rootScope.userSettings.superPrivilege) {
      console.log("To Super Admin Page");
      $location.url("/superAdminPage");
    } else {
      console.log("To Change Password Page");
      $location.url("/changePassword");
    }
  }


  $scope.saveSettings = function () {
    var matches = $.grep($scope.sections.pages, function(element) {
      return element.state == true;
    });

    if (matches.length == 0){
      matches = 'none';
    }

    var currentSettings = {
      allItems:$scope.switchData.seeAll,
      sorting: matches[0].name,
      gridSize: $rootScope.userSettings.gridSize
    }

    $http.post("/saveSettings",currentSettings).success(function(response){
      $rootScope.settingsSaved = true;
    });
  };

  $scope.onSlide = function(cbState) {
    $rootScope.settingsSaved = false;
    $rootScope.userSettings.gridSize = cbState;
    
  };

  // This controller initates response in the itemlistcontroller to change the sorting and refresh the main page

  $rootScope.sort = function(sort){
    $rootScope.settingsSaved = false;
    var curSet = $rootScope.sections.pages;
    if (sort == "A-Z"){
      $rootScope.$emit('sortAlpha');
      for (var i = 0; i < curSet.length; i++) {
        if(curSet[i].name == sort){
          $rootScope.sections.pages[i].state = true;
        }
        else{
          $rootScope.sections.pages[i].state = false;
        }
      }
    }
    if (sort == "Location"){
      $scope.$emit('sortLoc');
      for (var i = 0; i < curSet.length; i++) {
        if(curSet[i].name == sort){
          $rootScope.sections.pages[i].state = true;
        }
        else{
          $rootScope.sections.pages[i].state = false;
        }
      }
    }
    if (sort == "Date"){
      $rootScope.$emit('sortDate');
      for (var i = 0; i < curSet.length; i++) {
        if(curSet[i].name == sort){
          $rootScope.sections.pages[i].state = true;
        }
        else{
          $rootScope.sections.pages[i].state = false;
        }
      }
    }
  };
  $scope.onSwitchChange = function(cbState) {
    $rootScope.settingsSaved = false;
    var args = {
        state: cbState,
        location: $rootScope.locationID        
    }
    $rootScope.$emit("TEST",args);
    if(cbState == true){
      $rootScope.message = "ON";
    }
    else{
      $rootScope.message = "OFF";
    }
  };
});