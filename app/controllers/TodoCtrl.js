//everything has moved to more precise controllers so we are no longer using this controller at all

"use strict";

//now we'll create the controller for the body of the to do list. we will also give it location because that is a built in helper for location

//we've created a second controller that also needs to use this array of items. controller don't share with each other. but we have providers like factories, services, values whose job it is to provide outside data to the controllers. they get and share data. the controller can demand that providers share their data with them. (read up on javascript assigned patterns). so we want to break up the controllers to do specific jobs but each controller needs access to this data so we'll create a factory for it so it can  communicate the data to multiple controllers. so look at the ItemFactory.js file in factories folder. so we've commented out these items because we moved these into a json file for now.
app.controller("TodoCtrl", function($scope, $location) {
    $scope.items = null;

    $scope.newTask = {};

    $scope.newItem = function() {

    };
    $scope.allItems = function() {

      $location.url('/items/list');
    };
    $scope.addNewItem = function() {

      $scope.newTask.isCompleted = false;
      $scope.newTask.id = $scope.items.length;

      $scope.items.push($scope.newTask);

      $scope.newTask = {};
    };
});

