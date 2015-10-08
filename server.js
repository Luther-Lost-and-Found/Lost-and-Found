var myApp = angular.module('LostApp', []);
myApp.controller('ItemCtrl', ['$timeout', '$scope', '$http', function($timeout, $scope, $http) {
  console.log("Hello World from controller");

  var refresh = function(){
    $http.get("/itemlist").success(function(response){
      console.log('i got the data requested');
      $scope.$applyAsync(function(){
        $scope.itemlist = response;
        $scope.item = "";
      });
    });
  };

  refresh();

  $scope.addItem = function(){
    console.log($scope.item);
    $http.post("/itemlist",$scope.item).success(function(response){
      refresh();
    });

  }

  $scope.removeItem = function($scope,$element){
    var current_id = ($scope.itemID); 
    console.log(current_id);
    $http.delete("/itemlist/?" + current_id).success(function(response){
      refresh();
    });

  }

  $scope.editItem = function($element){
    var current_id = ($element.itemID); 
    console.log(current_id);
    $http.get("/itemlist/" + current_id).success(function(response){
      console.log("got the data to edit");
      $scope.$applyAsync(function(){
        $scope.item = response[0];
      });
      
    });
    
  }

  $scope.updateItem = function($element){
    console.log($scope.item);
    var current_id = ($element.itemID);
    $http.put("/itemlist/" + current_id, $scope.item).success(function(response){
      console.log("UPDATE");
      refresh();
    });
    
  }

}]);

<<<<<<< HEAD
=======
var express = require('express'),
    app = express(),
    mysql = require('mysql'),
    bodyParser = require("body-parser"),
    path = require('path'),
    passport = require('passport'),
    server;

require('./config/passport')(passport); // pass passport for configuration


//============================================================================
//==========Check the If the Connection with the MySQL database is established
//============================================================================


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.locals.rootDir = __dirname;

require(path.join(__dirname + '/api/routes.js'))(app, passport)


var start = exports.start = function start(port, callback) {
    server = app.listen(port, callback);
};

var stop = exports.stop = function stop(callback) {
    server.close(callback);
};

start(3000);

console.log('Server running');
>>>>>>> ca1f5a747cea9f748e60472a0ef8f4f6d89af125
