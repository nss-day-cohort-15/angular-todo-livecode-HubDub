"use strict";

app.controller("ItemNewCtrl", function ($scope, ItemStorage, $location) {
  $scope.newTask = {
    assignedTo: "",
    dependencies: "",
    dueData: "",
    isCompleted: false,
    location: "",
    task: "",
    urgency: "normal"
  };
//now we write the function for interacting with the form and view and pass along to factory. we made up th efunction name postNewItem so we will need to write that next
  $scope.addNewItem = function() {
    console.log("addNewItem is here");
    ItemStorage.postNewItem($scope.newTask)
      .then(function() {
        $location.url("/items/list");
    });
  };
});