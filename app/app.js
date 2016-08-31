"use strict";
//this creates the angular module variable.
var app = angular.module("TodoApp", []);

//this is the controller for the nav bar - we always inject scope as the argument for the function. we'll define the navItems with an object of names.
app.controller("NavCtrl", function($scope) {
  $scope.navItems = [
    {name: "Logout"},
    {name: "All Items"},
    {name: "New Items"}
  ];
});

//now we'll create the controller for the body of the to do list
app.controller("TodoCtrl", function($scope) {
    $scope.items = [
      {
        id: 0,
        task: "mow the lawn",
        isCompleted: false,
        dueDate: "12/5/17",
        assignedTo: "Greg",
        location: "Joe's house",
        urgency: "low",
        dependencies: "sunshine, clippers, hat, water, headphones"
      },
      {
        id: 1,
        task: "grade quizzes",
        isCompleted: false,
        dueDate: "12/5/15",
        assignedTo: "Christina",
        location: "NSS",
        urgency: "high",
        dependencies: "wifi, tissues, vodka"
      },
      {
        id: 2,
        task: "take a nap",
        isCompleted: false,
        dueDate: "5/21/16",
        assignedTo: "Joe",
        location: "Porch of lakefront cabin",
        urgency: "medium",
        dependencies: "hammock, silence"
      }
    ]; //now we'll do a new task to change the view so that some things are hidden while others show. we have to make it available to the view so we start with $scope. so showListView will show at first but when the button is clicked it calls the newItem function which changes showListView to false. we'll make a function to make that hide.
    $scope.newTask = {};
    $scope.showListView = true;
    $scope.newItem = function() {
      $scope.showListView = false;
    };
    $scope.allItem = function() {
      $scope.showListView = true;
    };
    $scope.addNewItem = function() {
      //we don't have to pass an object here, just grab new task and add it to our list. earlier we declared an empty object but as we did added the ng-model and the user filled out the form, these properties were created, so this object is built up for us at this point. the properties will auto update in the scope. we don't have to tell it anything, it just does it through the two way binding. but we have a cuple of properties to add that the user did not add:
      $scope.newTask.isCompleted = false;
      $scope.newTask.id = $scope.items.length;
      //the above adds an ID based on the lenght of the array of objects.
      $scope.items.push($scope.newTask);
      //the above pushes the new object into the array of items.
      $scope.newTask = {};
      //the above clears out the object so it doesn't inherit a previous object property if someone doesn't completely fill out the next form
    };
});

