"use strict";

//now we'll create the controller for the body of the to do list. we will also give it location because that is a built in helper for location

//we've created a second controller that also needs to use this array of items. controller don't share with each other. but we have providers like factories, services, values whose job it is to provide outside data to the controllers. they get and share data. the controller can demand that providers share their data with them. (read up on javascript assigned patterns). so we want to break up the controllers to do specific jobs but each controller needs access to this data so we'll create a factory for it so it can  communicate the data to multiple controllers. so look at the ItemFactory.js file in factories folder. so we've commented out these items because we moved these into a json file for now.
app.controller("TodoCtrl", function($scope, $location) {
    $scope.items = null;
    // $scope.items = [
    //   {
    //     id: 0,
    //     task: "mow the lawn",
    //     isCompleted: false,
    //     dueDate: "12/5/17",
    //     assignedTo: "Greg",
    //     location: "Joe's house",
    //     urgency: "low",
    //     dependencies: "sunshine, clippers, hat, water, headphones"
    //   },
    //   {
    //     id: 1,
    //     task: "grade quizzes",
    //     isCompleted: false,
    //     dueDate: "12/5/15",
    //     assignedTo: "Christina",
    //     location: "NSS",
    //     urgency: "high",
    //     dependencies: "wifi, tissues, vodka"
    //   },
    //   {
    //     id: 2,
    //     task: "take a nap",
    //     isCompleted: false,
    //     dueDate: "5/21/16",
    //     assignedTo: "Joe",
    //     location: "Porch of lakefront cabin",
    //     urgency: "medium",
    //     dependencies: "hammock, silence"
    //   }
    // ]; //this is before moving to json. now we'll do a new task to change the view so that some things are hidden while others show. we have to make it available to the view so we start with $scope. so showListView will show at first but when the button is clicked it calls the newItem function which changes showListView to false. we'll make a function to make that hide.
    $scope.newTask = {};
    // $scope.showListView = true;
    //we don't need the above anymore since we are not hiding/showing the view, instead we are injecting partials.
    $scope.newItem = function() {
      // $scope.showListView = false;//dont need now
      $location.url('/items/new');
    };
    $scope.allItems = function() {
      // $scope.showListView = true;
      $location.url('/items/list');
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

